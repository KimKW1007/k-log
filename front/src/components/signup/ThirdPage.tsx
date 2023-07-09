import React, { useEffect } from 'react';
import UserInfoInput from '@components/common/UserInfoInput';
import { ACCOUNT_ID_REGEX } from '@constant/regex';
import { InputListBox } from '@components/login/LoginForm';
import { errMsg } from '@utils/singupThirdErrMsg';
import { errorFn } from '@utils/singupErrorFn';
import BundleOfPasswords from '@components/common/BundleOfPasswords';
import { RegisterPageProps } from '@src/types/register';
import { useFormContext } from 'react-hook-form';

const ThirdPage = ({  setIsAllChecked }: {setIsAllChecked : React.Dispatch<React.SetStateAction<boolean>>}) => {

  const {watch, register, formState: { errors },} = useFormContext();


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
