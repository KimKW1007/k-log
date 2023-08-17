import axios from 'axios';

const axiosBase = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data'
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
axiosBase.defaults.baseURL = process.env.NEXT_PUBLIC_PROXY_URL
axiosBase.defaults.withCredentials = true;

export default function ifInImageApi<T = any>(url: string, isOriginServer?: boolean) {
  const postApi = async (data: T) => {
    const result = await baseApi().post(`${isOriginServer ? process.env.NEXT_PUBLIC_BACK_SERVER_URL || `http://localhost:5000` : process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || 'http://localhost:8000/api/'}${url}`, data, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      }
    });
    return result.data;
  };
  const deleteApi = async (data: T) => {
    const result = await baseApi().delete(`${isOriginServer ? process.env.NEXT_PUBLIC_BACK_SERVER_URL || `http://localhost:5000` : process.env.NEXT_PUBLIC_IMAGE_SERVER_URL || 'http://localhost:8000/api/'}${url}`, {
      data,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      }
    });
    return result.data;
  };
  return { postApi, deleteApi };
}
