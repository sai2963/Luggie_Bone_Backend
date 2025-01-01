const express = require("express");

const app = express();
const prismaClient = require("./lib/db");
const prisma = prismaClient.prisma;

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post("/api/post", async (req, res) => {
  const value = req.body;

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
