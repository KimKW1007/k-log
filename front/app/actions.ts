'use server'
import { cookies } from 'next/headers'

const actions = async () => {
  const cookieList = cookies().getAll();
  let hasAccessToken = false;
  let refresh_token;
  for (let i = 0; i < cookieList.length; i++) {
    const cookie = cookieList[i];

    if (cookie['name'] === 'access_token=') {
      hasAccessToken = true;
    }
    if (cookie['name'] === 'refresh_token') {
      refresh_token = cookie['value'];
    }
  }

  return {hasAccessToken, refresh_token}
}

export default actions