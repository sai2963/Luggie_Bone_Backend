const axios = require("axios");
require("dotenv").config();

async function BackPacksLuggageAPI() {
  try {
    const HLAPI = [
      axios.get(process.env.CAPRESE_HANDBAGS_FOR_WOMEN),
      axios.get(process.env.CAPRESE_BACKPACKS_FOR_WOMEN),

    ];
    const responses = await Promise.all(HLAPI);
    const combineddata = responses.all((response) => response.data).flat();
    return combineddata;
  } catch (error) {
    console.error("Error Fetching Data");
  }
}
module.exports = BackPacksLuggageAPI;
