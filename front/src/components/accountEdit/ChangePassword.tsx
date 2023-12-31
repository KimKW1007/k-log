import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { AbsoluteBox, EditForm, EditInputArea, EditInputInnerArea } from './AccountEditBox';
import { changeNewPasswordInputList } from '@/src/utils/userInfoEdit';
import ErrorMsgBox from '@/src/components/common/error/ErrorMsgBox';
import EditInput from './EditInput';
import { errMsg } from '@/src/utils/singupThirdErrMsg';
import { PASSWORD_REGEX } from '@/src/constant/regex';
import { checkSamePassword, onChangePasswordValidate } from '@/src/utils/checkSamePassword';
import { errorFn } from '@/src/utils/singupErrorFn';
import customApi from '@/src/utils/customApi';
import { useMutation } from '@tanstack/react-query';
import { SubmitBox, SubmitBtn } from '@/src/components/signup/signupForm';

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
    setValue
  } = useForm({ mode: 'all' });
  const { patchApi } = customApi('/auth/changePassword');
  const { mutate: changePasswordMutate } = useMutation(patchApi, {
    onSuccess(data) {
      alert('비밀번호가 변경 되었습니다.');
      setValue('password', '');
      setValue('confirmPassword', '');
    }
  });
  const onSubmit = (data: any) => {
    delete data.confirmPassword;
    changePasswordMutate(data);
  };
  const Is_ErrColor = Boolean(errors['password']?.message) || Boolean(errors['confirmPassword']?.message);

  return (
    <EditForm onSubmit={handleSubmit(onSubmit)}>
      {changeNewPasswordInputList.map(({ name, title }) => (
        <EditInputArea key={name + 'changeNewPasswordInputList' + title}>
          <EditInputInnerArea>
            <EditInput
              title={title}
              type="password"
              register={register(name, {
                required: errMsg['passwordMinLength'],
                minLength: {
                  value: 8,
                  message: errMsg['passwordMinLength']
                },
                validate: {
                  checkPasswordValidate: (value) => (name === 'confirmPassword' ? watch('password') === value || errMsg['passwordRegexMsg'] : true),
                  checkPasswordValidate2: (value) => PASSWORD_REGEX.test(value!) || errMsg['passwordRegexMsg']
                },
                onChange: () => {
                  if (name === 'password') {
                    onChangePasswordValidate({ watch, setError, clearErrors })();
                  }
                }
              })}
              isError={Boolean(errors[name]?.message)}
              isPassword
            />
            {name === 'confirmPassword' && <AbsoluteBox>{errors && <ErrorMsgBox errColor={Is_ErrColor} errors={checkSamePassword(watch) || errorFn(errMsg['passwordRegexMsg'], errors?.password, errors?.confirmPassword)} isEditPage />}</AbsoluteBox>}
          </EditInputInnerArea>
        </EditInputArea>
      ))}
      <ChangePasswordSubmitBox>
        <ChangePasswordSubmitBtn currentLevel="third">비밀번호 변경하기</ChangePasswordSubmitBtn>
      </ChangePasswordSubmitBox>
    </EditForm>
  );
};

export default ChangePassword;

export const ChangePasswordSubmitBox = styled(SubmitBox)`
  width: 50%;
  margin: 62px auto 0;
`;

const ChangePasswordSubmitBtn = styled(SubmitBtn)`
  font-size: 18px;
`;
