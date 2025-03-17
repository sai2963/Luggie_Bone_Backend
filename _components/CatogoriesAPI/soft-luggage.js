const axios = require("axios");
require("dotenv").config();

async function SoftLuggageAPI() {
  try {
    const HLAPI = [
      axios.get(process.env.VIP_SOFT_LUGGAGE),
      axios.get(process.env.SKYBAGS_SOFT_LUGGAGE),
    ];
    const responses = await Promise.all(HLAPI);
    const combineddata = responses.all((response) => response.data).flat();
    return combineddata;
  } catch (error) {
    console.error("Error Fetching Data");
  }
}
module.exports = SoftLuggageAPI;
