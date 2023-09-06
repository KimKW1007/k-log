import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customApi from '@/src/utils/customApi';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { banner } from '@/src/utils/bannerList';
import ImageInputLabelBox from '@/src/components/common/ImageInputLabelBox';
import ifInImageApi from '@/src/utils/ifInImageApi';
import { ProjectSubmitBox } from './EditProject';
import { SubmitBtn } from '@/src/components/signup/signupForm';
import { GET_BANNER_LIST } from '@/src/utils/queryKeys';

const EditBanner = () => {
  const queryClient = useQueryClient();
  const methods = useForm({ mode: 'all' });
  const { handleSubmit, watch } = methods;
  const bannerList = [1, 2, 3];

  const [isChangeValue, setIsChangeValue] = useState(false);

  const [image, setImage] = useState('');

  const { getApi } = customApi('/banner/banners');
  const { data } = useQuery([GET_BANNER_LIST], () => getApi());
  const { postApi } = ifInImageApi('/banner/updateBanner');
  const { mutate } = useMutation(postApi, {
    onSuccess(data) {
      queryClient.invalidateQueries([GET_BANNER_LIST]);
    }
  });

  const [currentlistNumber, setCurrentListNumber] = useState(1);

  useEffect(() => {
    setImage('');
  }, [currentlistNumber]);

  const onSubmit = ({ image }: any) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('listNumber', String(currentlistNumber));

    mutate(formData);
    setIsChangeValue(false);
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'image') {
        setIsChangeValue(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const currentImg = data?.find((i : any) => Number(i.listNumber) === currentlistNumber)?.imageUrl;

  return (
    <EditBannerWrap>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <BannerItem notPointer>
            <BannerNumber>{currentlistNumber}</BannerNumber>
            <BannerImageBox>
              <BannerImageBg bannerImage={image || currentImg || banner[`banner${currentlistNumber}`]} />
              <ImageInputLabelBox setImage={setImage} id={'bannerImage'} />
            </BannerImageBox>
          </BannerItem>
          <BannerSubmitBox>
            <SubmitBtn currentLevel="third" disabled={!isChangeValue}>
              변경
            </SubmitBtn>
          </BannerSubmitBox>
        </Form>
      </FormProvider>
      <BannerList>
        {bannerList.map((listNumber: number, index: number) => {
          const foundImg = data?.find((i : any) => Number(i.listNumber) === listNumber)?.imageUrl;
          return(
            <BannerItem key={'bannerList' + listNumber} onClick={() => setCurrentListNumber(listNumber)}>
            <BannerNumber>{listNumber}</BannerNumber>
            <BannerImageBox>
              <BannerImageBg bannerImage={foundImg || banner[`banner${listNumber}`]} />
            </BannerImageBox>
          </BannerItem>
          )
          })}
      </BannerList>
    </EditBannerWrap>
  );
};

export default EditBanner;
const BannerSubmitBox = styled(ProjectSubmitBox)`
  margin: 20px auto;
`;

const BannerImageBg = styled.div<{ bannerImage: string }>`
  background: url(${({ bannerImage }) => bannerImage}) no-repeat center center/cover;
  width: 100%;
  height: 100%;
`;

const BannerImageBox = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
`;

const BannerItem = styled.li<{ notPointer?: boolean }>`
  width: 45%;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.color.lightGrey};
  margin: 0 auto;
  cursor: pointer;
  background: #d5d5d5;
  ${({ notPointer }) =>
    notPointer &&
    `
    cursor:default;
  `}
`;
const BannerList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  row-gap: 30px;
`;

const BannerNumber = styled.div`
  margin-bottom: 10px;
  font-weight: 700;
`;

const EditBannerWrap = styled.div``;

const Form = styled.form`
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGrey};
  margin-bottom: 30px;
`;
