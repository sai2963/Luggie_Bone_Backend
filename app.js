const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const prismaClient = require("./lib/db");
const prisma = prismaClient.prisma;


const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storageConfig=multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'images');
  },
  filename:(req,file,cb)=>{
      cb(null,Date.now()+'-'+file.originalname)
  }
})

const upload=multer({storage:storageConfig});
app.get("/", async (req, res) => {
    res.json({ message: "Hello, world!" });
})

app.post("/api/post", upload.single('imageupload'), async (req, res) => {
  const value = req.body;
  const uploadImagefile=req.file;
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
        image: uploadImagefile.path,
      },
    });
    res.json(post);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
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
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
