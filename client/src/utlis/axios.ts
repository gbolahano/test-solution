import Axios, { AxiosRequestConfig } from "axios";

import { API_URL } from "../config";

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = {
      profile_id: "2",
    };

    return config;
  },
  (error) => Promise.reject(error)
);
