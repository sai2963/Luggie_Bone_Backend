const axios = require("axios");
require("dotenv").config();

async function MediumLuggageAPI() {
  try {
    const HLAPI = [
      axios.get(process.env.VIP_NEW_ARRAIVALS),
      axios.get(process.env.SKYBAGS_MEDIUM_LUGGAGE),
    ];
    const responses = await Promise.all(HLAPI);
    const combineddata = responses.all((response) => response.data).flat();
    return combineddata;
  } catch (error) {
    console.error("Error Fetching Data");
  }
}
module.exports = MediumLuggageAPI;
