import axios from "axios";

const axiosBase = axios.create({
  headers:{
    "Content-Type": "application/json",
  }
})
const baseApi = () => {
  axiosBase.interceptors.response.use(
    response => response,
    error => {
      throw error;
    },
  );

  return axiosBase;
};
axiosBase.defaults.baseURL = 'http://localhost:5000'

export default function customApi<T = any>(url: string) {
  const postApi = async (data: T) => {
    const result = await baseApi().post(url, data,
      { withCredentials: true });
    return result.data;
  };
  const getApi = async () => {
    const result = await baseApi().get(url,{
      headers:{
        "Authorization" : `Bearer ${sessionStorage.getItem("jwtToken")}`
      }
    });
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
  const patchApi = async (data: T) => {
    const result = await baseApi().patch(url, data);
    return result.data;
  };
  return { postApi, getApi, deleteApi, putApi, patchApi };
}