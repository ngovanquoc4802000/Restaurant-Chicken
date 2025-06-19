import axios from "axios";

export const Request = axios.create({
  baseURL: "http://localhost:7777/",
})