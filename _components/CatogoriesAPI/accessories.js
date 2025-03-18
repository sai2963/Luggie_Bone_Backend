const axios = require("axios");
require("dotenv").config();

async function Accessories() {
  try {
    const HLAPI = [
      axios.get(process.env.SAFARI_ACCESSORIES),
      axios.get(process.env.CAPRESE_ACCESSORIES_FOR_WOMEN),
    ];
    const responses = await Promise.all(HLAPI);
    const combineddata = responses.map((response) => response.data).flat();
    return combineddata;
  } catch (error) {
    console.error("Error Fetching Data");
  }
}
module.exports = Accessories;
