import axios from "axios";

let BASE_URL = "./";

// if (__DEV__) {
BASE_URL = "http://localhost:5000/api";
// }

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { api };
