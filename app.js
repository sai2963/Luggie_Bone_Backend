const express = require("express");
const axios = require("axios");
const app = express();
const prismaClient = require("./lib/db");
const prisma = prismaClient.prisma;
require("dotenv").config();

const ApiCall = require("./api");
const cors = require("cors");
const BrandDetails = require("./_components/brands");
const VIPAPI = require("./_components/vipApi");
const SKYBAGSAPI = require("./_components/skybagsApi");
const SAFARIAPI = require("./_components/safariApi");
const CAPRESEAPI = require("./_components/capreseApi");
const Categories = require("./_components/categories");
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
    const responses = await ApiCall();
    const data = responses.flatMap((response) => response.products || []);
    res.json(data);
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
    const productId = Number(req.params.id); // Convert to a number
    let responses;

    responses = await ApiCall();

    const products = responses.flatMap((response) => response.products || []);

    const product = products.find((product) => product.id === productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ product });
  } catch (error) {
    console.error("Error Fetching Data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/brands", async (req, res) => {
  let brandsResponse;
  try {
    brandsResponse = await BrandDetails();
    res.json(brandsResponse);
  } catch (error) {
    error("Error Fetching the Brands", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/api/brands/:brand", async (req, res) => {
  const brand = req.params.brand;

  try {
    if (brand == "VIP") {
      const responses = await VIPAPI(brand); // Assuming VIPAPI needs the brand parameter
      const brandproducts = responses.flatMap((response) => response.products || []);

      console.log(`Fetching data for brand: ${brand}`);
      res.json(brandproducts)
    } else if (brand == "Skybags") {
      const responses = await SKYBAGSAPI(brand); // Assuming VIPAPI needs the brand parameter
      const brandproducts = responses.flatMap((response) => response.products || []);
      console.log(`Fetching data for brand: ${brand}`);
      res.json(brandproducts)
    } else if (brand == "Safari") {
      const responses = await SAFARIAPI(brand); // Assuming VIPAPI needs the brand parameter
      const brandproducts = responses.flatMap((response) => response.products || []);
      console.log(`Fetching data for brand: ${brand}`);
      res.json(brandproducts)
    } else if (brand == "Caprese") {
      const responses = await CAPRESEAPI(brand); // Assuming VIPAPI needs the brand parameter
      const brandproducts = responses.flatMap((response) => response.products || []);
      console.log(`Fetching data for brand: ${brand}`);
      res.json(brandproducts)
    } else {
      const responses = await ApiCall(brand); // Assuming VIPAPI needs the brand parameter
      const brandproducts = responses.flatMap((response) => response.products || []);
      console.log(`Fetching data for brand: ${brand}`);
      res.json(brandproducts)
    }
  } catch (error) {
    
    console.error("Error fetching the data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/categories", async (req,res)=>{
  let CategoryResponse;
  try{
    CategoryResponse = await Categories();
    res.json(CategoryResponse);
  }
  catch(error){
    console.error("Error Fetching Data",error);
    res.status(500).send("Internal Server Error");
  }

})
app.get("/api/categories/:category", async (req, res) => {
  const category = req.params.category; // Use lowercase variable name for better readability
  try {
    const categoryData = await Categories(category); // Ensure this function fetches the category data properly

    if (!categoryData) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ category: categoryData }); // Send only the requested category's data
  } catch (error) {
    console.error("Error fetching category data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
