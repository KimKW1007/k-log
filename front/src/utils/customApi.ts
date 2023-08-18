import axios from 'axios';

const axiosBase = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});
export const baseApi = () => {
  axiosBase.interceptors.response.use(
    (response) => response,
    (error) => {
      throw error;
    }
  );

  return axiosBase;
};

axiosBase.defaults.baseURL =  (process.env.NEXT_PUBLIC_BACK_SERVER_URL || 'http://localhost:5000');
axiosBase.defaults.withCredentials = true;


export default function customApi<T = any>(url: string) {
  const postApi = async (data: T) => {
    const result = await baseApi().post(url, data, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
        
      }
    });
    return result.data;
  };
  const getApi = async (isNecessaryToken ?: boolean) => {
    const result = await baseApi().get(url, {
      headers: {
        Authorization: isNecessaryToken ? 'Bearer ' + sessionStorage.getItem('access_token') : ""
      }
    });
    return result.data;
  };

  const deleteApi = async (data: T) => {
    const result = await baseApi().delete(url, {
      data,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      }
    });
    return result.data;
  };
  const putApi = async (data: T) => {
    const result = await baseApi().put(url, data, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      }
    });
    return result.data;
  };
  const patchApi = async (data: T) => {
    const result = await baseApi().patch(url, data, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token')
      }
    });
    return result.data;
  };
  return { postApi, getApi, deleteApi, putApi, patchApi };
}
