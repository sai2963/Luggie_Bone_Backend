const axios = require("axios");
require("dotenv").config();
async function  ApiCall() {
    const apiCalls = [
          axios.get(process.env.VIP_NEW_ARRAIVALS),
          axios.get(process.env.VIP_BESTSELLERS),
          axios.get(process.env.VIP_HARD_LUGGAGE),
          axios.get(process.env.VIP_SOFT_LUGGAGE),
          axios.get(process.env.VIP_CABIN_LUGGUAGE),
          axios.get(process.env.VIP_CHECH_IN_LUGGAGE),
          axios.get(process.env.VIP_LIGHT_WEIGHT),
          axios.get(process.env.VIP_LUGGAGE_SET),
          axios.get(process.env.VIP_DUFFLES),
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
          axios.get(process.env.SAFARI_TROLLEY_BAGS),
          axios.get(process.env.SAFARI_BACKPACKS),
          axios.get(process.env.SAFARI_DUFFLES),
          axios.get(process.env.SAFARI_ACCESSORIES),
          axios.get(process.env.CAPRESE_ALL),
          axios.get(process.env.CAPRESE_HANDBAGS_FOR_WOMEN),
          axios.get(process.env.CAPRESE_SLINGS_FOR_WOMEN),
          axios.get(process.env.CAPRESE_ACCESSORIES_FOR_WOMEN),
          axios.get(process.env.CAPRESE_BACKPACKS_FOR_WOMEN),
        ];
    
        const responses = await Promise.all(apiCalls);
        return responses;
}
export default ApiCall;