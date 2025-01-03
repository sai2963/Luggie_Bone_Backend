const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require('fs');
const prismaClient = require("./lib/db");
const prisma = prismaClient.prisma;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
  }
});

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Get all posts
app.get("/api/get", async (req, res) => {
  try {
    const posts = await prisma.bags.findMany();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Create new post
app.post("/api/post", upload.single("imageupload"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

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
      terms
    } = req.body;

    // Validate required fields
    const requiredFields = [
      'username',
      'title',
      'price',
      'brand',
      'size',
      'color',
      'quantity',
      'features',
      'manufacturedBy',
      'materialCare',
      'terms'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const post = await prisma.bags.create({
      data: {
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
        image: req.file.path
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      error: "Failed to create post",
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File is too large. Maximum size is 5MB'
      });
    }
    return res.status(400).json({
      error: err.message
    });
  }
  
  console.error(err);
  res.status(500).json({
    error: 'Internal server error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});