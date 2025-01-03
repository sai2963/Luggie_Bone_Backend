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

// const storageConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(__dirname, "uploads");
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({ storage: storageConfig });

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/get", async (req, res) => {

  const posts = await prisma.bags.findMany();
  res.json(posts);
});

app.post("/api/post", upload.single("imageupload"), async (req, res) => {
  const { username, title, price, brand, size, color, quantity, features, manufacturedBy, materialCare, terms } = req.body;
  // const image = req.file?.path;

  // if (!image) {
  //   return res.status(400).json({ error: "Image file is required" });
  // }

  try {
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
       // image,
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


