import { OnlyAlignCenterFlex } from '@/src/components/common/CommonFlex';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ifInImageApi from '@/src/utils/ifInImageApi';
import customApi from '@/src/utils/customApi';
import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Image from 'next/image';
import defaultAuthorImage from '@/src/assets/images/500_94.jpg';
import { EditBtn } from '../EditCategory/EditCategoryList';
import ImageInputLabelBox from '@/src/components/common/ImageInputLabelBox';
import { GET_USER_MINI_PL, USERS } from '@/src/utils/queryKeys';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@/src/atoms/atoms';
import useIsMount from '@/src/hooks/useIsMount';

const EditSidebarHeader = () => {
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const { isMount } = useIsMount();
  const queryClient = useQueryClient();
  const { getApi } = customApi('/file/getUserPl');
  const { data } = useQuery([GET_USER_MINI_PL, USERS], () => getApi(true));
  const { postApi } = ifInImageApi('/file/upload', true);
  const { mutate } = useMutation(postApi, {
    onSuccess(data) {
      setIsChangeValue(false);
      queryClient.invalidateQueries([GET_USER_MINI_PL, USERS]);
    }
  });

  const [isChangeValue, setIsChangeValue] = useState(false);
  const [image, setImage] = useState('');

  const methods = useForm({
    mode: 'all',
    defaultValues: useMemo(() => {
      return {
        image: data?.imageUrl ? data.imageUrl : defaultAuthorImage.src,
        description: data?.description
      };
    }, [data])
  });
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { isDirty }
  } = methods;

  const onSubmit = async ({ image, description }: any) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('description', description);

    mutate(formData);
  };
  useEffect(() => {
    reset({
      image: data?.imageUrl ? data.imageUrl : defaultAuthorImage.src,
      description: data?.description
    });
    queryClient.invalidateQueries([GET_USER_MINI_PL, USERS]);
    setImage(data?.imageUrl ? data.imageUrl : defaultAuthorImage.src);
  }, [data]);

  useEffect(() => {
    if (isDirty) {
      setIsChangeValue(true);
    } else {
      setIsChangeValue(false);
    }
  }, [isDirty]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === 'change') {
        setIsChangeValue(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  const externaImageLoader = ({ src }: { src: string }) => `${src}`;


  return (
    <FormProvider {...methods}>
      <EditSidebarHeaderForm onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <SidebarHeaderBox>
          <ImgBox>
            <Image loader={externaImageLoader} src={image || defaultAuthorImage.src} alt={'프로필 이미지'} width={120} height={120} />
            <ImageInputLabelBox setIsChangeValue={setIsChangeValue} setImage={setImage} id={'userImage'} />
          </ImgBox>
          <DescBox>
            <TextArea className="customScroll" disabled={!isMount && !Boolean(currentUser?.isAdmin)} {...register('description')}></TextArea>
          </DescBox>
          <EditBtn isChangeValue={isChangeValue} disabled={!isChangeValue}>
            저장
          </EditBtn>
        </SidebarHeaderBox>
      </EditSidebarHeaderForm>
    </FormProvider>
  );
};

export default EditSidebarHeader;

const EditSidebarHeaderForm = styled.form`
  width: 100%;
  border-bottom: 1px solid #b8b8b8a1;
  margin-bottom: 20px;
  padding-bottom: 20px;
`;

export const SidebarHeaderBox = styled(OnlyAlignCenterFlex)`
  padding: 20px 0;
  flex-direction: column;
  row-gap: 30px;
`;

export const ImgBox = styled.div<{ isBgBlack?: boolean }>`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 4px 4px 0px 2px #dde6ed;
  img {
    position: relative;
    z-index: 1;
    max-width: 100%;
  }
  ${({ isBgBlack }) =>
    isBgBlack &&
    `
    box-shadow: 4px 4px 0px 2px #898989;
  `}
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 110px;
  line-height: 20px;
  text-align: center;
  border: 1px solid #a5a5a5;
  outline: none;
  background: #f0f0f0;
  padding: 10px 10px 10px 20px;
  border-radius: 5px;
  transition: 0.2s;
  resize: none;
  font-family: 'Pretendard-Regular';
  &::-webkit-scrollbar-thumb {
    background-color: #000 !important;
  }
  &::-webkit-scrollbar-track {
    background-color: rgba(0, 0, 0, 0.1);
    margin: 3px 0;
  }
  &:focus {
    border: 1px solid #000;
    background: #fff;
  }
`;

export const InputLabelBox = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  label {
    display: block;
    width: 100%;
    height: 100%;
    background: transparent;
    padding: 40px;
    transition: 0.3s;
    cursor: pointer;
    svg {
      width: 100%;
      color: transparent;
    }
  }
  &:hover {
    label {
      background: rgba(0, 0, 0, 0.5);
      svg {
        color: #fff;
      }
    }
  }
`;

export const DescBox = styled.div`
  width: 100%;
`;
