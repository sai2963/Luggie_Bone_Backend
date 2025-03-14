const axios = require("axios");
require("dotenv").config();

async function VIPAPI() {
  try {
    const fetchAPI = [
      axios.get(process.env.VIP_NEW_ARRAIVALS),
      axios.get(process.env.VIP_BESTSELLERS),
      axios.get(process.env.VIP_HARD_LUGGAGE),
      axios.get(process.env.VIP_SOFT_LUGGAGE),
      axios.get(process.env.VIP_CABIN_LUGGUAGE),
      axios.get(process.env.VIP_CHECH_IN_LUGGAGE),
      axios.get(process.env.VIP_LIGHT_WEIGHT),
      axios.get(process.env.VIP_LUGGAGE_SET),
      axios.get(process.env.VIP_DUFFLES),
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
