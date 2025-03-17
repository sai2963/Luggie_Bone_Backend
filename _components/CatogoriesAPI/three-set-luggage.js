const axios = require("axios");
require("dotenv").config();

async function ThreeSetLuggageAPI() {
  try {
    const HLAPI = [
      axios.get(process.env.VIP_LUGGAGE_SET),
      axios.get(process.env.SAFARI_TROLLEY_BAGS),
    ];
    const responses = await Promise.all(HLAPI);
    const combineddata = responses.all((response) => response.data).flat();
    return combineddata;
  } catch (error) {
    console.error("Error Fetching Data");
  }
}
module.exports = ThreeSetLuggageAPI;
