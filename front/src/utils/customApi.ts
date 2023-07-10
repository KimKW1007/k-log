import axios from 'axios';


const accessToken = typeof window !== 'undefined' ? sessionStorage.getItem('jwtToken') : null;

const axiosBase = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: "Bearer " + accessToken,
  }
});
const baseApi = () => {
  axiosBase.interceptors.response.use(
    (response) => response,
    (error) => {
      throw error;
    }
  );

  return axiosBase;
};
axiosBase.defaults.baseURL = 'http://localhost:5000';
axiosBase.defaults.withCredentials = true;



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
  const patchApi = async (data: T) => {
    const result = await baseApi().patch(url, data);
    return result.data;
  };
  return { postApi, getApi, deleteApi, putApi, patchApi };
}
