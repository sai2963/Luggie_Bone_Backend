const express = require("express");

const app = express();
const prismaClient = require("./lib/db");
const prisma = prismaClient.prisma;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "/uploads")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})


const upload = multer({ storage });
const cors = require("cors");
//const multer = require("multer");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post("/api/post", upload.single('file'),async (req, res) => {
  const value = req.body;
  const imagefile = req.file;
  console.log(imagefile);
  

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
        image:imagefile.path
      },
    });
    res.json(post);
    // console.log("Created post:", post);
  } catch (err) {
    console.error("Database error:", err); // Log the full error
    res.status(500).json({
      error: err.message,
      code: err.code,
      meta: err.meta,
    });
  }
});
app.get("/api/get", async (req, res) => {
  const posts = await prisma.bags.findMany();
  res.json(posts);
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});