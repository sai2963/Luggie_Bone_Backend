const express = require("express");
const axios = require("axios");
const app = express();
const prismaClient = require("./lib/db");
const prisma = prismaClient.prisma;
require("dotenv").config();
import ApiCall from "./api";
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

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
        image: value.image,
        category: null,
      },
    });
    res.json(post);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      error: err.message,
      code: err.code,
      meta: err.meta,
    });
  }
});

app.get("/api/get", async (req, res) => {
  try {
    const posts = await prisma.bags.findMany();
    res.json(posts);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/api/products/get", async (req, res) => {
  try {
    // Create an array of promises for all API calls using environment variables
    
    const respnses= await ApiCall();
    
    const combinedData = responses.reduce((acc, response) => {
      return acc.concat(response.data.products);
    }, []);

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      error: "Failed to fetch products",
      details: error.message,
    });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch all products from APIs (same as /api/products/get)
   

    // Combine all products into a single array
    const allProducts = responses.reduce((acc, response) => {
      return acc.concat(response.data.products);
    }, []);

    // Find the product with the matching ID
    const product = allProducts.find((p) => p.id === productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      error: "Failed to fetch product",
      details: error.message,
    });
  }
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
