const axios = require("axios");
require("dotenv").config();

async function  SlingsAPI() {
  try {
    const HLAPI = [
      axios.get(process.env.CAPRESE_SLINGS_FOR_WOMEN),
      axios.get(process.env.VIP_BESTSELLERS),
    ];
    const responses = await Promise.all(HLAPI);
    const combineddata = responses.all((response) => response.data).flat();
    return combineddata;
  } catch (error) {
    console.error("Error Fetching Data");
  }
}
module.exports = SlingsAPI;
