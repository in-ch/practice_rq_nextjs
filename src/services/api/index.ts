import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
});

axiosInstance.interceptors.response.use(async (config) => {
  const status = config.status;
  switch (status) {
    case 200:
      break;

    default:
      break;
  }
  return config;
});

export default axiosInstance;
