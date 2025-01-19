const express = require("express");
const axios = require("axios");
const app = express();
const prismaClient = require("./lib/db");
const prisma = prismaClient.prisma;
require("dotenv").config();

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
    const apiCalls = [
      axios.get(process.env.VIP_NEW_ARRAIVALS),
      axios.get(process.env.VIP_BESTSELLERS),
      axios.get(process.env.VIP_HARD_LUGGAGE),
      axios.get(process.env.VIP_SOFT_LUGGAGE),
      axios.get(process.env.VIP_CABIN_LUGGUAGE),
      axios.get(process.env.VIP_CHECH_IN_LUGGAGE),
      axios.get(process.env.VIP_LIGHT_WEIGHT),
      axios.get(process.env.VIP_LUGGAGE_SET),
      axios.get(process.env.VIP_DUFFLES),
      axios.get(process.env.SKYBAGS_HARD_LUGGAGE),
      axios.get(process.env.SKYBAGS_SOFT_LUGGAGE),
      axios.get(process.env.SKYBAGS_CABIN_LUGGAGE),
      axios.get(process.env.SKYBAGS_MEDIUM_LUGGAGE),
      axios.get(process.env.SKYBAGS_LARGE_LUGGAGE),
      axios.get(process.env.SKYBAGS_TSA_LOCK_LUGGAGE),
      axios.get(process.env.SKYBAGS_ANTI_THEFT_LUGGAGE),
      axios.get(process.env.SKYBAGS_DUAL_WHEELS_LUGGAGE),
      axios.get(process.env.SKYBAGS_BACKPACKS),
      axios.get(process.env.SKYBAGS_DUFFLE),
      axios.get(process.env.SKYBAGS_TRAVELLING_BAG_FOR_STUDENT_LUGGAGE),
      axios.get(process.env.SAFARI_TROLLEY_BAGS),
      axios.get(process.env.SAFARI_BACKPACKS),
      axios.get(process.env.SAFARI_DUFFLES),
      axios.get(process.env.SAFARI_ACCESSORIES),
      axios.get(process.env.CAPRESE_ALL),
      axios.get(process.env.CAPRESE_HANDBAGS_FOR_WOMEN),
      axios.get(process.env.CAPRESE_SLINGS_FOR_WOMEN),
      axios.get(process.env.CAPRESE_ACCESSORIES_FOR_WOMEN),
      axios.get(process.env.CAPRESE_BACKPACKS_FOR_WOMEN),
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
      details: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
