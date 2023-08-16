import UserInfoInput from '@/src/components/common/UserInfoInput';
import { NAME_REGEX } from '@/src/constant/regex';
import React, { useEffect } from 'react';
import { InputListBox } from '@/src/components/login/LoginForm';
import CertificateEmail from '@/src/components/common/CertificateEmail';
import { useFormContext } from 'react-hook-form';
import { RegisterPageProps } from '@/src/types/register';

const SecondPage = ({ setIsAllChecked, setIsPassCertificate, isPassCertificate }: RegisterPageProps) => {
  const {
    watch,
    register,
    formState: { errors }
  } = useFormContext();

  useEffect(() => {
    if (watch('userName') && watch('userEmail') && watch('token') && isPassCertificate) {
      setIsAllChecked!(true);
    } else {
      setIsAllChecked!(false);
    }
  }, [watch('userName'), watch('userEmail'), watch('token'), isPassCertificate]);
  return (
    <>
      <InputListBox>
        <UserInfoInput
          small
          bold
          type="text"
          inputName="이름"
          register={register('userName', {
            required: '값을 입력해주세요',
            validate: {
              checkNameValidate: (value) => NAME_REGEX.test(value!) || '2~4자의 한글,영문만 입력해주세요.'
            }
          })}
          watch={watch('userName')}
          errors={errors?.userName?.message}
          errColor={Boolean(errors?.userName?.message)}
        />
        <CertificateEmail small setIsPassCertificate={setIsPassCertificate} isPassCertificate={isPassCertificate} />
      </InputListBox>
    </>
  );
};

export default SecondPage;
