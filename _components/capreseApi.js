const axios = require("axios");
require("dotenv").config();

async function CAPRESEAPI() {
  try {
    const fetchAPI = [
      axios.get(process.env.CAPRESE_ALL),
      axios.get(process.env.CAPRESE_HANDBAGS_FOR_WOMEN),
      axios.get(process.env.CAPRESE_SLINGS_FOR_WOMEN),
      axios.get(process.env.CAPRESE_ACCESSORIES_FOR_WOMEN),
      axios.get(process.env.CAPRESE_BACKPACKS_FOR_WOMEN),
    ];

    const responses = await Promise.all(fetchAPI);

    const combinedData = responses.map((response) => response.data).flat();
    return combinedData;
  } catch (error) {
    console.error("Error Fetching Data", error);
    return [];
  }
}
module.exports = CAPRESEAPI;
