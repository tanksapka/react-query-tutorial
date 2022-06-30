import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:4000/superheroes",
  headers: {
    "Content-type": "application/json",
  },
});

export { apiClient };
