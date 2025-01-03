const express = require("express");
const multer = require("multer");
const path = require("path");
const prisma = require("./prisma"); // Replace with your Prisma client initialization
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// API Routes
app.post("/api/post", upload.single("imageupload"), async (req, res) => {
  try {
    const {
      username,
      title,
      price,
      brand,
      size,
      color,
      quantity,
      features,
      manufacturedBy,
      materialCare,
      terms,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const post = await prisma.bags.create({
      data: {
        username,
        title,
        price: parseFloat(price),
        brand,
        size,
        color,
        quantity: parseInt(quantity),
        features,
        manufacturedBy,
        materialCare,
        terms,
        image: `/uploads/${req.file.filename}`,
      },
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

// Serve Uploaded Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start the Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
