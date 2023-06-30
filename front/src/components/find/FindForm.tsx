import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Form, InputListBox } from '@components/login/LoginForm';
import { useForm } from 'react-hook-form';
import { RegisterInputs, User } from '@src/types/user';
import { FlexEmptyBox, SubmitBox, SubmitBtn } from '@components/signup/signupForm';
import customApi from 'utils/customApi';
import { useMutation } from '@tanstack/react-query';
import FindId from './FindId';
import FindPassword from './FindPassword';
import { ListTypes } from 'utils/mapList';
import {useRouter} from "next/router";

const FindForm = ({ isOnPasswordTab, textById }: { isOnPasswordTab: boolean; textById?: ListTypes }) => {

  const router = useRouter();

  const [isPassCertificate, setIsPassCertificate] = useState(false);

  const [submitText, setSubmitText] = useState<string | undefined>('');

  // 해당 이메일로 가입되어있는 아이디들 관련
  const [isClickFindBtn, setIsClickFindBtn] = useState(false);
  const [userIds, setUserIds] = useState<User[]>([]);
  const { postApi: checkEmailPostApi } = customApi('/auth/checkemail');
  const { mutate: checkEmailMutate } = useMutation(checkEmailPostApi, {
    onError(error: any) {
      console.log({ error });
    },
    async onSuccess(data) {
      console.log(data);
      setIsClickFindBtn(true);
      setUserIds(data.user || data);
    }
  });
  // ================================================

  const submitRegex = () => {
    //아이디 찾기 일때
    if (!isOnPasswordTab) {
      // 검색 결과로 넘어가기 전
      if (!isClickFindBtn) {
        return !watch('token') || !isPassCertificate;
      } else {
        return false;
      }
      // 비밀번호 찾기 일때
    } else {
      // 검색 결과로 넘어가기 전
      if (!isClickFindBtn) {
        return !watch('userId') || !watch('token') || !isPassCertificate;
      } else {
        return !watch('password') || !watch('confirmPassword');
      }
    }
  };

  const currentSubmitText = () => {
    if (textById) {
      if (!isClickFindBtn) {
        return textById.findText;
      }
      if (textById.id === 'tabId' && userIds.length <= 0) return textById.singupText;
      if (textById.id === 'tabPassword' && isClickFindBtn) return textById.changePassword;
      return textById.loginText;
    }
  };
  useEffect(() => {
    console.log({ submitText });
    setSubmitText(currentSubmitText());
  }, [currentSubmitText]);
  // ================================================
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setValue,
    clearErrors,
    reset
  } = useForm<RegisterInputs>({
    mode: 'all'
  });

  const onSubmit = (data: RegisterInputs) => {
    if (submitText?.includes("아이디")) {
      checkEmailMutate({ userEmail: data.userEmail });
    }
    if(submitText?.includes("로그인")){
      router.push("/login")
    }
    if(submitText?.includes("회원가입")){
      router.push("/signup")
    }
    if (submitText?.includes("비밀번호 찾기")) {
      
    }
    if (submitText?.includes("비밀번호 변경")) {
      
    }
  };

  // 탭 이동 시 all clear
  useEffect(() => {
    setIsClickFindBtn(false);
    reset();
    setIsPassCertificate(false);
  }, [isOnPasswordTab]);

  return (
    <FindBoxForm onSubmit={handleSubmit(onSubmit)}>
      {!isOnPasswordTab ? (
        <FindId
          isClickFindBtn={isClickFindBtn}
          userIds={userIds}
          register={register}
          watch={watch}
          errors={errors}
          setError={setError}
          setValue={setValue}
          clearErrors={clearErrors}
          setIsPassCertificate={setIsPassCertificate}
          isPassCertificate={isPassCertificate}
        />
      ) : (
        <FindPassword
          isClickFindBtn={isClickFindBtn}
          userIds={userIds}
          register={register}
          watch={watch}
          errors={errors}
          setError={setError}
          setValue={setValue}
          clearErrors={clearErrors}
          setIsPassCertificate={setIsPassCertificate}
          isPassCertificate={isPassCertificate}
        />
      )}
      <FlexEmptyBox />
      <SubmitBox>
        <SubmitBtn type="submit" disabled={submitRegex()}>
          {currentSubmitText()}
        </SubmitBtn>
      </SubmitBox>
    </FindBoxForm>
  );
};

export default FindForm;

const FindBoxForm = styled(Form)`
  height: 100%;
`;
