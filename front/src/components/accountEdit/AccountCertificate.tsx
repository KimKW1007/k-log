import React, { useEffect } from 'react'
import styled from 'styled-components';
import { EditTitleBox } from './AccountEdit';
import { AbsoluteBox,  EditInputArea, EditInputInnerArea } from './AccountEditBox';
import EditInput from './EditInput';
import ErrorMsgBox from '@components/common/error/ErrorMsgBox';
import { useForm } from 'react-hook-form';
import { errMsg } from '@utils/singupThirdErrMsg';
import { PASSWORD_REGEX } from '@constant/regex';
import { FlexEmptyBox, SubmitBox, SubmitBtn } from '@components/signup/signupForm';
import { useMutation } from '@tanstack/react-query';
import customApi from '@utils/customApi';

const AccountCertificate = ({setIsCertificated} : {setIsCertificated: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    setError,
    clearErrors,
  } = useForm({ mode: 'all' });
  const name = 'password'
  const {postApi} = customApi("/auth/checkCertificate");
  const {mutate} = useMutation(postApi,{
    onError(error : any) {
      setError("password", {type:'custom',message:`비밀번호가 일치하지 않습니다.`})
    },
    onSuccess(data) {
      setIsCertificated(true);
    },
  })
  useEffect(()=>{
    clearErrors('password')
  },[isDirty, watch('password')])

  const onSubmit = (data: any) => {
    mutate(data)
  };
  return (
    <AccountCertificateArea>
      <EditTitleBox>
        <h2>내정보관리</h2>
      </EditTitleBox>
      <AccountCertificateDescBox>
        <p>회원님의 개인정보 보호를 위해 본인확인을 진행합니다.</p>
        <p>K-log 비밀번호를 입력해주세요.</p>
      </AccountCertificateDescBox>
      <AccountCertificateForm onSubmit={handleSubmit(onSubmit)}>
      <EditInputArea>
        <EditInputInnerArea>
          <EditInput
            title={'비밀번호 확인'}
            type='password'
            register={register(name, {
              required: '값을 입력해주세요',
              minLength: {
                value: 8,
                message: errMsg['passwordMinLength']
              },
              validate: {
                checkPasswordValidate: (value) => PASSWORD_REGEX.test(value!) || errMsg['passwordRegexMsg']
              }
            })}
            isError={Boolean(errors[name])}
            isPassword
          />
          <AbsoluteBox>{errors[name] && <ErrorMsgBox errColor errors={`${errors[name]?.message}`} isEditPage />}</AbsoluteBox>
        </EditInputInnerArea>
      </EditInputArea>
      <FlexEmptyBox/>
      <AccountCertificateSubmitBox>
        <SubmitBtn>확인</SubmitBtn>
      </AccountCertificateSubmitBox>
    </AccountCertificateForm>
    </AccountCertificateArea>
  )
}

export default AccountCertificate

const AccountCertificateForm = styled.form`
  display:flex;
  flex-direction: column;
  height:100%;
`

const AccountCertificateArea = styled.div`
  background: #fff;
  height: 650px;
  border : 1px solid #DDE6ED;
  border-radius: 30px;
  overflow:hidden;
  padding: 60px 20px;
  display:flex;
  flex-direction: column;
  @media(max-width: 980px){
    border-radius: 0;
    border : 0;
    background: transparent;
  }
`

const AccountCertificateDescBox = styled.div`
  text-align:center;
  padding-top: 30px;
  margin-bottom: 50px;
`

const AccountCertificateSubmitBox = styled(SubmitBox)`
  width: 200px;
`