import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { jwtDecode } from "jwt-decode";

const apiLocal = "https://localhost:7063/api/";

const apiRemota = "";

export const api = axios.create({
  baseURL: apiLocal,
});

api.interceptors.request.use((config) => {
  const token = secureLocalStorage.getItem("Token");

  if (typeof token === "string") {
    const decodedHeader = jwtDecode(token, { header: true });

    console.log(decodedHeader);

    config.headers.Authorization = "Bearer " + token;
}

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});
