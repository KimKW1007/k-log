import React, { useEffect } from 'react';
import UserInfoInput from '@/src/components/common/UserInfoInput';
import { ACCOUNT_ID_REGEX } from '@/src/constant/regex';
import { InputListBox } from '@/src/components/login/LoginForm';
import { errMsg } from '@/src/utils/singupThirdErrMsg';
import { errorFn } from '@/src/utils/singupErrorFn';
import BundleOfPasswords from '@/src/components/common/BundleOfPasswords';
import { useFormContext } from 'react-hook-form';

const ThirdPage = ({ setIsAllChecked }: { setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const {
    watch,
    register,
    formState: { errors }
  } = useFormContext();

  useEffect(() => {
    if (watch('userId') && watch('password') && watch('confirmPassword')) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [watch('userId'), watch('password'), watch('confirmPassword')]);
  return (
    <InputListBox>
      <UserInfoInput
        small
        bold
        type="text"
        inputName="아이디"
        register={register('userId', {
          required: '값을 입력해주세요',
          minLength: {
            value: 4,
            message: errMsg['userIdMinLength']
          },
          validate: {
            checkAccountId: (value) => ACCOUNT_ID_REGEX.test(value!) || errMsg['userIdRegexMsg']
          }
        })}
        watch={watch('userId')}
        errors={errorFn(errMsg['userIdRegexMsg'], errors?.userId)}
        errColor={Boolean(errors?.userId?.message)}
      />
      <BundleOfPasswords />
    </InputListBox>
  );
};

export default ThirdPage;
