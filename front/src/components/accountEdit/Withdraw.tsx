import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import EditInput, { EditInputInnerBox } from './EditInput';
import { CheckSecretInput, CheckSecretLabel } from '@components/comment/CommentForm';
import { SubmitBtn } from '@components/signup/signupForm';
import { ChangePasswordSubmitBox } from './ChangePassword';
import DeleteModal from '@components/modal/DeleteModal';
import customApi from '@utils/customApi';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@atoms/atoms';

const Withdraw = () => {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfomation);
  const router = useRouter();

  const { postApi } = customApi('/auth/withdraw');
  const { mutate } = useMutation(postApi, {
    onSuccess(data) {
      setUserInfo(null);
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('access_token_expiration');
      router.replace('/');
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ mode: 'all' });

  const onSubmit = (data: any) => {
    setIsOpenDeleteModal(true);
  };

  const withdrawMutate = () => {
    mutate({});
  };

  return (
    <WithdrawForm onSubmit={handleSubmit(onSubmit)}>
      <WithdrawDescription>
        <h3>탈퇴 안내</h3>
        <p>회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해주세요.</p>
        <br />
        <p>사용하고 계신 아이디는 탈퇴할 경우 재사용 및 복구가 불가능합니다.</p>
        <p>
          <span>탈퇴한 아이디는 재사용 및 복구가 불가하오니 신중하게 선택하시기 바랍니다.</span>
        </p>
        <br />
        <p>탈퇴 후 회원정보 및 이용기록은 모두 삭제됩니다.</p>
        <p>다만, 탈퇴 후에도 게시물에 등록된 댓글은 그대로 남아 있습니다.</p>
        <p>
          삭제를 원하는 댓글이 있다면 <span>반드시 탈퇴 전 삭제하시기 바랍니다.</span>
        </p>
      </WithdrawDescription>
      <WithdrawValidation>
        <p>
          회원 탈퇴를 하시려면 <i>&#34;회원탈퇴&#34;</i> 를 입력해주세요
        </p>
        <EditInput type="text" register={register('withdraw', { required: true, validate: { checkValue: (value) => value === '회원탈퇴' || 'Error' } })} isError={Boolean(errors.withdraw?.message)} />
      </WithdrawValidation>
      <CheckAgreeBox>
        <CheckAgreeWithdrawInput {...register('checkAgree', { required: true })} className="blind" type="checkbox" id={'withdrawAgreeInput'} />
        <CheckAgreeWithdrawLabel htmlFor={'withdrawAgreeInput'}>안내 사항을 모두 확인하였으며, 이에 동의합니다.</CheckAgreeWithdrawLabel>
      </CheckAgreeBox>
      <WithdrawSubmitBox>
        <WithdrawSubmitBtn disabled={watch('withdraw') !== '회원탈퇴' || !watch('checkAgree')}>탈퇴하기</WithdrawSubmitBtn>
      </WithdrawSubmitBox>
      {isOpenDeleteModal && <DeleteModal isWithdraw mutate={withdrawMutate} onClose={() => setIsOpenDeleteModal(false)} />}
    </WithdrawForm>
  );
};

export default Withdraw;

const WithdrawSubmitBtn = styled(SubmitBtn)``;
const WithdrawSubmitBox = styled(ChangePasswordSubmitBox)`
  margin: 0px auto;
`;

const WithdrawDescription = styled.div`
  h3 {
    margin-bottom: 30px;
    font-size: 24px;
  }
  span {
    color: #f00;
  }
`;

const CheckAgreeWithdrawLabel = styled(CheckSecretLabel)`
  &:before {
    border: 1px solid #232323;
  }
`;
const CheckAgreeWithdrawInput = styled(CheckSecretInput)``;

const CheckAgreeBox = styled.div``;

const WithdrawForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
`;

const WithdrawValidation = styled.div`
  p {
    margin-bottom: 20px;
    font-size: 18px;
    i {
      font-style: italic;
      color: #f00;
    }
  }
  ${EditInputInnerBox} {
    column-gap: 0;
    justify-content: center;
  }
`;
