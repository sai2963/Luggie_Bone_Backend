const axios = require("axios");
require("dotenv").config();

async function TsaLockLuggageAPI() {
  try {
    const HLAPI = [
      axios.get(process.env.SKYBAGS_TSA_LOCK_LUGGAGE),
      axios.get(process.env.VIP_LIGHT_WEIGHT),
    ];
    const responses = await Promise.all(HLAPI);
    const combineddata = responses.map((response) => response.data).flat();
    return combineddata;
  } catch (error) {
    console.error("Error Fetching Data");
  }
}
module.exports = TsaLockLuggageAPI;
