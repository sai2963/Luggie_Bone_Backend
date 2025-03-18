const axios = require("axios");
require("dotenv").config();

async function CheckinLuggageAPI() {
  try {
    const HLAPI = [
      axios.get(process.env.VIP_CHECH_IN_LUGGAGE),
      axios.get(process.env.SKYBAGS_SOFT_LUGGAGE),
    ];
    const responses = await Promise.all(HLAPI);
    const combineddata = responses.map((response) => response.data).flat();
    return combineddata;
  } catch (error) {
    console.error("Error Fetching Data");
  }
}
module.exports = CheckinLuggageAPI;
