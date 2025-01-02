const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const prismaClient = require("./lib/db");
const prisma = prismaClient.prisma;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/api/post", upload.single('image'), async (req, res) => {
  const value = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
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
    res.json(post);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
