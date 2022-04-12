import axios from "axios";

export const localAPI = axios.create({
  baseURL: "http://localhost:3005",
});

export const coingeckoAPI = axios.create({
    baseURL: "https://api.coingecko.com/api/v3",
  });
