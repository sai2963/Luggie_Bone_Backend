const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
//require("dotenv").config();

const { initEdgeStore } = require("@edgestore/server");
const {
  createEdgeStoreExpressHandler,
} = require("@edgestore/server/adapters/express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const prismaClient = require("./lib/db");
const prisma = prismaClient.prisma;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

// Initialize Edge Store
const es = initEdgeStore.create({
  accessKey: process.env.EDGE_STORE_ACCESS_KEY,
  secretKey: process.env.EDGE_STORE_SECRET_KEY,
});


const publicFilesBucket = es.fileBucket();
// Edge Store Router Setup
const edgeStoreRouter = es.router({
  publicFiles: publicFilesBucket, // Assign the bucket to the router
});
const handler = createEdgeStoreExpressHandler({
  router: edgeStoreRouter,
});

app.post("/edgestore/*", handler);
app.get("/edgestore/*", handler);

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Temporary directory for local uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

// API to upload image and save URL to database
app.post("/api/post", upload.single("image"), async (req, res) => {
  const { body, file } = req;

  try {
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Use Edge Store's API route for uploading
    const uploadUrl = `${req.protocol}://${req.get("host")}/edgestore/publicFiles`;

    const formData = new FormData();
    formData.append("file", fs.createReadStream(file.path));

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`);
    }

    const { url: imageUrl } = await response.json();

    // Save data, including the image URL, to the database
    const post = await prisma.bags.create({
      data: {
        username: body.username,
        title: body.title,
        price: body.price,
        brand: body.brand,
        size: body.size,
        color: body.color,
        quantity: body.quantity,
        features: body.features,
        manufacturedBy: body.manufacturedBy,
        materialCare: body.materialCare,
        terms: body.terms,
        image: body.image, // Use the Edge Store URL
        category: null,
      },
    });

    // Delete the temporary file after successful upload
    fs.unlinkSync(file.path);

    res.json({ message: "Data inserted successfully", post });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// API to fetch all posts
app.get("/api/get", async (req, res) => {
  try {
    const posts = await prisma.bags.findMany();
    res.json(posts);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
