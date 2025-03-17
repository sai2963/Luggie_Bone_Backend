const axios = require("axios");
require("dotenv").config();

async function BackPacksLuggageAPI() {
  try {
    const HLAPI = [
      axios.get(process.env.SKYBAGS_BACKPACKS),
      axios.get(process.env.SAFARI_BACKPACKS),
    ];
    const responses = await Promise.all(HLAPI);
    const combineddata = responses.all((response) => response.data).flat();
    return combineddata;
  } catch (error) {
    console.error("Error Fetching Data");
  }
}
module.exports = BackPacksLuggageAPI;
