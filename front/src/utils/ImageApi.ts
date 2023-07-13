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

axiosBase.defaults.baseURL = 'http://localhost:5000/file';
axiosBase.defaults.withCredentials = true;


export default function imageApi<T = any>(url: string) {
  const postApi = async (data: T) => {
    const result = await baseApi().post(url, data, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwtToken')
      }
    });
    return result.data;
  };
  const getApi = async () => {
    const result = await baseApi().get(url, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwtToken')
      }
    });
    return result.data;
  };

  const deleteApi = async (data: T) => {
    const result = await baseApi().delete(url, {
      data,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('jwtToken')
      }
    });
    return result.data;
  };
  return { postApi, getApi, deleteApi };
}
