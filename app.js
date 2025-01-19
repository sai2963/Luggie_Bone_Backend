const express = require("express");
const axios = require("axios"); // Add axios import
const app = express();
const prismaClient = require("./lib/db");
const prisma = prismaClient.prisma;

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
      error: err.message
    });
  }
});

app.get("/api/products/get", async (req, res) => {
  try {
    // Create an array of promises for all API calls
    const apiCalls = [
      axios.get("https://vipbags.com/collections/new-arrivals/products.json"),
      axios.get("https://vipbags.com/collections/bestsellers/products.json"),
      axios.get("https://vipbags.com/collections/hard-luggage/products.json"),
      axios.get("https://vipbags.com/collections/soft-luggage/products.json"),
      axios.get("https://vipbags.com/collections/cabin-luggage/products.json"),
      axios.get("https://vipbags.com/collections/check-in-luggage/products.json"),
      axios.get("https://vipbags.com/collections/lightweight-luggage/products.json"),
      axios.get("https://vipbags.com/collections/luggage-set/products.json"),
      axios.get("https://vipbags.com/collections/duffles/products.json"),
      axios.get("https://skybags.co.in/collections/hard-luggage/products.json"),
      axios.get("https://skybags.co.in/collections/soft-luggage/products.json"),
      axios.get("https://skybags.co.in/collections/cabin-luggage/products.json"),
      axios.get("https://skybags.co.in/collections/medium-luggage/products.json"),
      axios.get("https://skybags.co.in/collections/large-luggage/products.json"),
      axios.get("https://skybags.co.in/collections/tsa-lock-luggage/products.json"),
      axios.get("https://skybags.co.in/collections/anti-theft-luggage/products.json"),
      axios.get("https://skybags.co.in/collections/dual-wheels-luggage/products.json"),
      axios.get("https://skybags.co.in/collections/backpacks/products.json"),
      axios.get("https://skybags.co.in/collections/duffle/products.json"),
      axios.get("https://skybags.co.in/collections/travelling-bags-for-students/products.json"),
      axios.get("https://safaribags.com/collections/trolley-bags/products.json"),
      axios.get("https://safaribags.com/collections/backpacks/products.json"),
      axios.get("https://safaribags.com/collections/duffles/products.json"),
      axios.get("https://safaribags.com/collections/accessories/products.json"),
      axios.get("https://www.capresebags.com/collections/all/products.json"),
      axios.get("https://www.capresebags.com/collections/handbags-for-women/products.json"),
      axios.get("https://www.capresebags.com/collections/slings-for-women/products.json"),
      axios.get("https://www.capresebags.com/collections/accessories-for-women/products.json"),
      axios.get("https://www.capresebags.com/collections/backpacks-for-women/products.json")
    ];

    const responses = await Promise.all(apiCalls);
    
    const combinedData = responses.reduce((acc, response) => {
      return acc.concat(response.data.products);
    }, []);

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      error: "Failed to fetch products",
      details: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});