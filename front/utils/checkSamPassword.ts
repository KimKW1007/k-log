import { RegisterInputs } from '@src/types/user';
import { UseFormClearErrors, UseFormSetError, UseFormWatch } from 'react-hook-form';

interface PasswordOnChangeValidateProps {
  watch: UseFormWatch<RegisterInputs>;
  setError: UseFormSetError<RegisterInputs>;
  clearErrors: UseFormClearErrors<RegisterInputs>;
}

export const checkSamePassword = (watch: UseFormWatch<RegisterInputs>) => {
  // 2단계 : 두개의 password 입력란이 안 비워져있는지
  if (watch('confirmPassword') && watch('password')!.length >= 8 && watch('confirmPassword')!.length >= 1) {
    // 3단계 : 두개의 password가 같은지
    if (watch('password') === watch('confirmPassword')) {
      return '비밀번호가 일치합니다.';
    }
    return '비밀번호가 일치하지 않습니다.';
  }
};

export const onChangePasswordValidate = ({ watch, setError, clearErrors }: PasswordOnChangeValidateProps) => () => {
  if (watch('confirmPassword')!.length >= 8) {
    if (watch('password') !== watch('confirmPassword')) {
      // 실질적으로 보이진 않고 에러관련 boolean으로 사용
      setError('confirmPassword', {
        type: 'custom',
        message: '비밀번호가 일치하지 않습니다.'
      });
    } else {
      clearErrors(['password', 'confirmPassword']);
    }
  }
};
