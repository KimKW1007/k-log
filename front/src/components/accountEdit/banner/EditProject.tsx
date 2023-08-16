import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { EditInputInnerArea } from '../AccountEditBox';
import EditInput from '../EditInput';
import { AllCenterFlex } from '@/src/components/common/CommonFlex';
import { SubmitBox, SubmitBtn } from '@/src/components/signup/signupForm';
import customApi from '@/src/utils/customApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ProjectList from './ProjectList';
import { GET_PROJECTS } from '@/src/utils/queryKeys';

const EditProject = () => {
  const queryClient = useQueryClient();

  const { getApi } = customApi('/banner/projects');
  const { data } = useQuery([GET_PROJECTS], () => getApi());

  const { postApi } = customApi('/banner/createProject');
  const { mutate } = useMutation(postApi, {
    onSuccess(data) {
      queryClient.invalidateQueries([GET_PROJECTS]);
    }
  });

  const methods = useForm({ mode: 'all' });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = methods;

  const onSubmit = (data: { [key: string]: string }) => {
    mutate(data);
    setValue('title', '');
    setValue('link', '');
  };

  return (
    <EditProjectWrap>
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <EditInputInnerArea>
            <EditInputBox>
              <EditInput title={'프로젝트 이름'} register={register('title', { required: true })} isError={false} isPassword />
              <EditInput title={'프로젝트 링크'} register={register('link', { required: true, validate: (value) => /(https?:\/\/[^\s]+)/g.test(value) || '에러' })} isError={Boolean(errors.link?.message)} isPassword />
              <ProjectSubmitBox>
                <SubmitBtn currentLevel="third">추가</SubmitBtn>
              </ProjectSubmitBox>
            </EditInputBox>
          </EditInputInnerArea>
        </Form>
      </FormProvider>
      <ProjectList projects={data} />
    </EditProjectWrap>
  );
};

export default EditProject;

const EditProjectWrap = styled.div``;

const Form = styled.form``;
const EditInputBox = styled(AllCenterFlex)`
  width: 100%;
  flex-direction: column;
  row-gap: 20px;
`;
export const ProjectSubmitBox = styled(SubmitBox)`
  max-width: 300px;
  width: 100%;
  margin: 0 auto;
`;
