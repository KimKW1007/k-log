import axios from "axios";

const axiosBase = axios.create({
  headers:{
    "Content-Type": "application/json",
  }
})
axiosBase.defaults.baseURL = 'https://localhost:5000'
const baseApi = () => {
  axiosBase.interceptors.response.use(
    response => response,
    error => {
      throw error;
    },
  );

  return axiosBase;
};

export default function customApi<T = any>(url: string) {
  const postApi = async (data: T) => {
    const result = await baseApi().post(url, data);
    return result.data;
  };
  const getApi = async () => {
    const result = await baseApi().get(url);
    return result.data;
  };

  const deleteApi = async (data: T) => {
    const result = await baseApi().delete(url, { data });
    return result.data;
  };
  const putApi = async (data: T) => {
    const result = await baseApi().put(url, data);
    return result.data;
  };
  return { postApi, getApi, deleteApi, putApi };
}