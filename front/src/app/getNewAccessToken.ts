'use client';
import { baseApi } from '../utils/customApi';
import actions from '@/app/actions';


const GetNewAccessToken = () => {
  const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000;
  
  const getNewAccessTokenByrefreshToken = async () => {
    try {
      const {refresh_token} = await actions();
      if(refresh_token){
        // 현재 시간과 토큰의 만료 시간을 비교하여 갱신 여부 결정
        const tokenExpiration = sessionStorage.getItem('access_token_expiration'); // 세션 스토리지에 저장된 토큰 만료 시간
        const currentTime = new Date().getTime();
        const expirationTime = parseInt(tokenExpiration!, 10);
        if (expirationTime && (expirationTime - currentTime < TOKEN_REFRESH_INTERVAL)) {
          // 만료 시간이 일정 시간(5분) 미만으로 남았을 때 토큰 갱신
          const response = await baseApi().post('/auth/refresh', { refresh_token });
          const newAccessToken = response.data.newAccessToken;
          // 새로운 엑세스 토큰과 유효기간 세션 스토리지에 저장
          sessionStorage.setItem('access_token', newAccessToken);
          sessionStorage.setItem('access_token_expiration', `${new Date().getTime() + process.env.NEXT_PUBLIC_ACCESS_TOKEN_EXPIRATION!}`);
        }
      }
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
    }
  };
  const checkAccessToken = async () => {
    const {refresh_token, hasAccessToken} = await actions();
    if (Boolean(refresh_token) && !hasAccessToken) {
      try {
        // 리프레시 토큰을 사용하여 새로운 엑세스 토큰을 발급받는 API 호출
        const response = await baseApi().post('/auth/refresh', { refresh_token });
        const newAccessToken = response.data.newAccessToken;
        sessionStorage.setItem('access_token', newAccessToken);
        // 새로운 엑세스 토큰을 반환
      } catch (error) {
        console.error('새로운 엑세스 토큰 발급 실패:', error);
      }
    }
  };
  return {getNewAccessTokenByrefreshToken, checkAccessToken}
}

export default GetNewAccessToken