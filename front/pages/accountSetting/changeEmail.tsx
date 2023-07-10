import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import styled from 'styled-components';
import CertificateEmail from '@components/common/CertificateEmail';
import { FormProvider, useForm } from 'react-hook-form';
import { RegisterInputs, User } from '@src/types/user';
import { FlexEmptyBox, SubmitBox, SubmitBtn } from '@components/signup/signupForm';
import customApi from '@utils/customApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import IdListByEmail from '@components/common/IdListByEmail';
import { FinalBox, FinalText } from '@components/common/FinallPage';
import CommonModal from '@components/modal/CommonModal';
import { GET_USER } from '@utils/queryKeys';
import { useRecoilState } from 'recoil';
import { NotFoundByEmail, isPopup } from '@atoms/atoms';

const ChangeEmailPage: NextPage = () => {
  const [isFailed, setIsFailed] = useRecoilState(NotFoundByEmail);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState('');

  const [isFineChangeEmail, setIsFineChangeEmail] = useState<boolean>(false);
  const [isPassCertificate, setIsPassCertificate] = useState<boolean>(false);

  const [userIds, setUserIds] = useState<User[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  // 해당 이메일로 가입된 아이디 확인
  const { postApi: checkFineChangePostApi } = customApi('/auth/checkChangeEmail');
  // 해당 이메일로 변경
  const { patchApi: ChangeEmailPatchApi } = customApi('/auth/changeThings');

  const { mutate } = useMutation(isFineChangeEmail ? ChangeEmailPatchApi : checkFineChangePostApi, {
    onError(error : any) {
      console.log(error.response.data.message);
      setIsFailed(true);
      setErrMsg(error.response.data.message)
      setIsOpenModal(true);
    },
    onSuccess(data) {
      if (!isFineChangeEmail) {
        setUserIds(data.user || data);
        setIsFineChangeEmail(true);
      } else {
        console.log('joi')
        setIsSuccess(true);
      }
    }
  });



  const methods = useForm<RegisterInputs>({
    mode: 'all'
  });

  const { handleSubmit, watch } = methods;

  const onSubmit = (data: RegisterInputs) => {
    if (isError || isSuccess) {
      window.close();
      return;
    }
    delete data.token;
    mutate(data);
  };

  const submitText = () => {
    if(isError) return '창 닫기';
    if (!isSuccess) {
      if (!isFineChangeEmail) {
        return '해당 이메일로 연동된 아이디 보기';
      }
      if (isFineChangeEmail) {
        return '해당 이메일로 변경하기';
      }
    }
    return '창 닫기';
  };


  const changeSubmitBtnColor = ()=>{
    if(isError || isSuccess) return "";
    return 'third' ;
  }

  useEffect(()=>{
    if(userIds.length >= 5){
      setIsOpenModal(true)
      setErrMsg('해당 이메일은 연동할 수 있는 아이디의 갯수가 초과하였습니다.')
      setIsError(true)
    }
  },[userIds])
  return (
    <ChangeEmailArea>
      <ChangeEmailTitleBox>
        <h3>이메일 변경</h3>
      </ChangeEmailTitleBox>
      <FormProvider {...methods}>
        <ChangeEmailForm onSubmit={handleSubmit(onSubmit)}>
          {!isSuccess ? (
            <>
              {isFineChangeEmail || <CertificateEmail isPassCertificate={isPassCertificate} setIsPassCertificate={setIsPassCertificate}></CertificateEmail>}
              {isFineChangeEmail && <IdListByEmail userIds={userIds}></IdListByEmail>}
            </>
          ) : (
            <FinalBox>
              <FinalText>
                <p>이메일 변경이 완료되었습니다.</p>
              </FinalText>
            </FinalBox>
          )}
          <FlexEmptyBox />
          <SubmitBox>
            <ChangeEmailSubmitBtn type="submit" currentLevel={changeSubmitBtnColor()} disabled={!watch('token') || !isPassCertificate}>
              {submitText()}
            </ChangeEmailSubmitBtn>
          </SubmitBox>
        </ChangeEmailForm>
      </FormProvider>
      {isOpenModal && <CommonModal setIsOpenModal={setIsOpenModal}>{errMsg}</CommonModal>}
    </ChangeEmailArea>
  );
};

export default ChangeEmailPage;
const ChangeEmailArea = styled.div`
  width: 33rem;
  height: 100%;
  margin: 0 auto;
`;

const ChangeEmailForm = styled.form`
  padding: 50px 30px;
  height: 500px;
  display: flex;
  flex-direction: column;
  background: #fefefe;
  border: 1px solid #e5e5e5;
`;

const ChangeEmailTitleBox = styled.div`
  text-align: center;
  padding: 30px;
  font-size: 18px;
  background: #232323;
  color: #e5e5e5;
`;

const ChangeEmailSubmitBtn = styled(SubmitBtn)`
  font-size: 18px;
`
