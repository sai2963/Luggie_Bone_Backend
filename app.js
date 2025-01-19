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
        image: value.image,
        category: null,
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
app.get("/api/products/get",async (req,res)=>{
  try {
    const response3 = axios.get("https://vipbags.com/collections/new-arrivals/products.json");
    const response4 = axios.get("https://vipbags.com/collections/bestsellers/products.json");
    const response5 = axios.get("https://vipbags.com/collections/hard-luggage/products.json");
    const response6 = axios.get("https://vipbags.com/collections/soft-luggage/products.json");
    const response7 = axios.get("https://vipbags.com/collections/cabin-luggage/products.json");
    const response8 = axios.get("https://vipbags.com/collections/check-in-luggage/products.json");
    const response9 = axios.get("https://vipbags.com/collections/lightweight-luggage/products.json");
    const response10 = axios.get("https://vipbags.com/collections/luggage-set/products.json");
    const response11 = axios.get("https://vipbags.com/collections/duffles/products.json");
    const response12 = axios.get("https://skybags.co.in/collections/hard-luggage/products.json");
    const response13 = axios.get("https://skybags.co.in/collections/soft-luggage/products.json");
    const response14 = axios.get("https://skybags.co.in/collections/cabin-luggage/products.json");
    const response15 = axios.get("https://skybags.co.in/collections/medium-luggage/products.json");
    const response16 = axios.get("https://skybags.co.in/collections/large-luggage/products.json");
    const response17 = axios.get("https://skybags.co.in/collections/tsa-lock-luggage/products.json");
    const response18 = axios.get("https://skybags.co.in/collections/anti-theft-luggage/products.json");
    const response19 = axios.get("https://skybags.co.in/collections/dual-wheels-luggage/products.json");
    const response20 = axios.get("https://skybags.co.in/collections/backpacks/products.json");
    const response21 = axios.get("https://skybags.co.in/collections/duffle/products.json");
    const response22 = axios.get("https://skybags.co.in/collections/travelling-bags-for-students/products.json");
    const response23 = axios.get("https://safaribags.com/collections/trolley-bags/products.json");
    const response24 = axios.get("https://safaribags.com/collections/backpacks/products.json");
    const response25 = axios.get("https://safaribags.com/collections/duffles/products.json");
    const response26 = axios.get("https://safaribags.com/collections/accessories/products.json");
    const response27 = axios.get("https://www.capresebags.com/collections/all/products.json");
    const response28 = axios.get("https://www.capresebags.com/collections/handbags-for-women/products.json");
    const response29 = axios.get("https://www.capresebags.com/collections/slings-for-women/products.json");
    const response30 = axios.get("https://www.capresebags.com/collections/accessories-for-women/products.json");
    const response31 = axios.get("https://www.capresebags.com/collections/backpacks-for-women/products.json");

    

    const responses = await Promise.all([
      response3,
      response4,
      response5,
      response6,
      response7,
      response8,
      response9,
      response10,
      response11,
      response12,
      response13,
      response14,
      response15,
      response16,
      response17,
      response18,
      response19,
      response20,
      response21,
      response22,
      response23,
      response24,
      response25,
      response26,
      response27,
      response28,
      response28,
      response29,
      response30


    ]);

    const combinedData = responses.reduce((acc, response) => {
      return acc.concat(response.data.products);
    }, []);
    const response=combinedData;
    res.json(response);
  }
  catch (error) {
    console.error("Error:", error.message);
    setError(error.message);
    setLoading(false);
  }
})
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});