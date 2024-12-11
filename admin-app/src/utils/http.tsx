import axios from "axios";

export const RequestAxios = axios.create({
  baseURL: "http://localhost:7777/category/",
});
