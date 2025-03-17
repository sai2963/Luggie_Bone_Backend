const axios = require("axios");
require("dotenv").config();

async function HardLuggageAPI() {
  try {
    const HLAPI = [
      axios.get(process.env.VIP_HARD_LUGGAGE),
      axios.get(process.env.SKYBAGS_HARD_LUGGAGE),
    ];
    const responses = await Promise.all(HLAPI);
    const combineddata = responses.all((response) => response.data).flat();
    return combineddata;
  } catch (error) {
    console.error("Error Fetching Data");
  }
}
module.exports= HardLuggageAPI;
