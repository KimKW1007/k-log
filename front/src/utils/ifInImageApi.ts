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

axiosBase.defaults.withCredentials = true;

export default function ifInImageApi<T = any>(url: string, isOriginServer?: boolean) {
  const postApi = async (data: T) => {
    const result = await baseApi().post(`${isOriginServer ? `http://localhost:5000` : 'http://localhost:8000/api/'}${url}`, data, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      }
    });
    return result.data;
  };
  const deleteApi = async (data: T) => {
    const result = await baseApi().delete(`${isOriginServer ? `http://localhost:5000` : 'http://localhost:8000/api/'}${url}`, {
      data,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      }
    });
    return result.data;
  };
  return { postApi, deleteApi };
}
