import axios from "axios";

export const apiData = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
