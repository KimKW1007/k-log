import { PASSWORD_REGEX } from '@/src/constant/regex';
import { RegisterInputs } from '@/src/types/user';
import { FieldValues, UseFormClearErrors, UseFormSetError, UseFormWatch } from 'react-hook-form';
import { errMsg } from './singupThirdErrMsg';

interface PasswordOnChangeValidateProps {
  watch: UseFormWatch<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}

export const checkSamePassword = (watch: UseFormWatch<RegisterInputs>) => {
  const watchConfirmPw = watch('confirmPassword');
  const watchPw = watch('password');
  // 1단계 : 두개의 password 입력란이 안 비워져있는지
  if (watchConfirmPw && watchPw!.length >= 8 && watchConfirmPw!.length >= 1) {
    // 2단계 : 두개의 password가 같은지
    if (watchPw === watchConfirmPw) {
      // 3단계 : regex test
      if (!PASSWORD_REGEX.test(watchPw!) || !PASSWORD_REGEX.test(watchConfirmPw!)) {
        return errMsg['passwordRegexMsg'];
      }
      return '비밀번호가 일치합니다.';
    }
    return '비밀번호가 일치하지 않습니다.';
  }
};

export const onChangePasswordValidate =
  ({ watch, setError, clearErrors }: PasswordOnChangeValidateProps) =>
  () => {
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
