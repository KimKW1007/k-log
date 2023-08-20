import { userInfomation } from '@/src/atoms/atoms';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

const useCheckLogin = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const checkLogin = (callback: () => void) => {
    if (!currentUser?.id) {
      if (confirm('로그인 후 이용가능합니다.\n로그인 페이지로 이동하시겠습니까?')) {
        router.push('/login');
      }
      return;
    } else {
      callback(); // Execute the callback if user is logged in
    }
  };
  return { checkLogin };
};

export default useCheckLogin;
