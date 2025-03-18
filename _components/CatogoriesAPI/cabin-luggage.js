const axios = require("axios");
require("dotenv").config();

async function CabinLuggageAPI() {
  try {
    const HLAPI = [
      axios.get(process.env.VIP_CABIN_LUGGUAGE),
      axios.get(process.env.SKYBAGS_CABIN_LUGGAGE),
    ];
    const responses = await Promise.all(HLAPI);
    const combineddata = responses.map((response) => response.data).flat();
    return combineddata;
  } catch (error) {
    console.error("Error Fetching Data");
  }
}
module.exports = CabinLuggageAPI;
