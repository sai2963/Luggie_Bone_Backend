const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const prismaClient = require("./lib/db");
const prisma = prismaClient.prisma;

const app = express();

app.use(cors());
app.use(express.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory to save uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create uploads directory if not exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/post", upload.single("image"), async (req, res) => {
  const { body, file } = req;
  const value=req.body;
  
  // imagePath: file ? `/uploads/${file.filename}` : null;
  const imagePath = file ? `/uploads/${file.filename}` : null;

  try {
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
        image: imagePath,
        category:null,
        
      },
    });
    res.json(post);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/get", async (req, res) => {
  const posts = await prisma.bags.findMany();
  res.json(posts);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
