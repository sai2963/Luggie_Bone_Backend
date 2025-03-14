const axios = require("axios");
require("dotenv").config();

async function SKYBAGSAPI() {
  try {
    const fetchAPI = [
      axios.get(process.env.SKYBAGS_HARD_LUGGAGE),
      axios.get(process.env.SKYBAGS_SOFT_LUGGAGE),
      axios.get(process.env.SKYBAGS_CABIN_LUGGAGE),
      axios.get(process.env.SKYBAGS_MEDIUM_LUGGAGE),
      axios.get(process.env.SKYBAGS_LARGE_LUGGAGE),
      axios.get(process.env.SKYBAGS_TSA_LOCK_LUGGAGE),
      axios.get(process.env.SKYBAGS_ANTI_THEFT_LUGGAGE),
      axios.get(process.env.SKYBAGS_DUAL_WHEELS_LUGGAGE),
      axios.get(process.env.SKYBAGS_BACKPACKS),
      axios.get(process.env.SKYBAGS_DUFFLE),
      axios.get(process.env.SKYBAGS_TRAVELLING_BAG_FOR_STUDENT_LUGGAGE),
    ];

    const responses = await Promise.all(fetchAPI);

    const combinedData = responses.map((response) => response.data).flat();
    return combinedData;
  } catch (error) {
    console.error("Error Fetching Data", error);
    return [];
  }
}
module.exports = SKYBAGSAPI;
