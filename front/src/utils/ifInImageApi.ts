import axios from 'axios';

const axiosBase = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
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

export default function ifInImageApi<T = any>(url: string) {
  const mainServer =  (process.env.NEXT_PUBLIC_BACK_SERVER_URL || `http://localhost:5000`)
  const postApi = async (data: T) => {
    const result = await baseApi().post(`${mainServer}${url}`, data, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      }
    });
    return result.data;
  };
  const deleteApi = async (data: T) => {
    const result = await baseApi().delete(`${mainServer}${url}`, {
      data,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      }
    });
    return result.data;
  };
  return { postApi, deleteApi };
}
