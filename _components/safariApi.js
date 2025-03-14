const axios = require("axios");
require("dotenv").config();

async function VIPAPI() {
  try {
    const fetchAPI = [
      axios.get(process.env.SAFARI_TROLLEY_BAGS),
      axios.get(process.env.SAFARI_BACKPACKS),
      axios.get(process.env.SAFARI_DUFFLES),
      axios.get(process.env.SAFARI_ACCESSORIES),
    ];

    const responses = await Promise.all(fetchAPI);

    const combinedData = responses.map((response) => response.data).flat();
    return combinedData;
  } catch (error) {
    console.error("Error Fetching Data", error);
    return [];
  }
}
module.exports = VIPAPI;
