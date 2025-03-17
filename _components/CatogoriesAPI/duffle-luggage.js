const axios = require("axios");
require("dotenv").config();

async function DuffleLuggageAPI() {
  try {
    const HLAPI = [
      axios.get(process.env.VIP_DUFFLES),
      axios.get(process.env.SKYBAGS_DUFFLE),
      axios.get(process.env.SAFARI_DUFFLES),
    ];
    const responses = await Promise.all(HLAPI);
    const combineddata = responses.all((response) => response.data).flat();
    return combineddata;
  } catch (error) {
    console.error("Error Fetching Data");
  }
}
module.exports = DuffleLuggageAPI;
