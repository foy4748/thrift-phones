import axios from "axios";

const axiosClient = axios.create({
  baseURL:
    import.meta.env.VITE_SERVER_ADDRESS || import.meta.env.VITE_DEV_SERVER,
  "Content-Type": "application/json",
});

axiosClient.interceptors.request.use(
  (config) => {
    const authtoken = window.localStorage.getItem("authtoken");
    if (authtoken) {
      config.headers["authtoken"] = authtoken;
    }

    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

export default axiosClient;
