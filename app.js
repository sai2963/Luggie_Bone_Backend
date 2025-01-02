const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require('fs');
const prismaClient = require("./lib/db");
const prisma = prismaClient.prisma;

const app = express();
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, JPG and PNG files are allowed.'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

app.get("/", async (req, res) => {
  res.json({ message: "Hello, world!" });
});

app.post("/api/post", upload.single('image'), async (req, res) => {
  try {
    const value = req.body;
    let imagePath = null;
    
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const post = await prisma.bags.create({
      data: {
        username: value.username,
        title: value.title,
        price: value.price,
        brand: value.brand,
        size: value.size,
        color: value.color,
        quantity: value.quantity,
        features: value.features,
        manufacturedBy: value.manufacturedBy,
        materialCare: value.materialCare,
        terms: value.terms,
        image: imagePath,
      },
    });

    res.json({
      ...post,
      message: "Product created successfully"
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ 
      error: err.message,
      details: "Error creating product"
    });
  }
});

app.get("/api/get", async (req, res) => {
  try {
    const posts = await prisma.bags.findMany();
    res.json(posts);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});