import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useIsMount from 'src/hooks/useIsMount';
import DOMPurify from 'dompurify';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import useCustomQuill from '@utils/useCustomQuill';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@atoms/atoms';
import customApi from '@utils/customApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import ifInImageApi from '@utils/ifInImageApi';
import useConfirm from 'src/hooks/useConfirm';
import { FormProvider, useForm } from 'react-hook-form';
import CompletionBox from './CompletionBox';
import useHandleSideMenu from 'src/hooks/useHandleSideMenu';
import useConvert from 'src/hooks/useConvert';
import "highlight.js/styles/rainbow.css";
/* agate / base16/dracula */

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}


const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');
    const { default: BlotFormatter } = await import('quill-blot-formatter');
    const hljs = await import('highlight.js');
    hljs.default.configure({
      languages: ['javascript', 'ruby', 'python']
    })
    QuillComponent.Quill.register('modules/blotFormatter', BlotFormatter);
    return function forwardRef({ forwardedRef, ...props }: ForwardedQuillComponent) {
      return <QuillComponent ref={forwardedRef} theme={"snow"} {...props}  />;
    };
  },
  {
    ssr: false
  }
);

const SubTitleAddForm = () => {
  const methods = useForm({
    mode: 'all'
  });
  const { handleClickMenu, isOpen, isActive } = useHandleSideMenu();

  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,
    formState: { errors }
  } = methods;
  const router = useRouter();
  const quillRef = useRef<ReactQuill>(null);
  const [contents, setContents] = useState<string>('');
  const [isCompletion, setIsCompletion] = useState(false);
  const { isMount } = useIsMount();
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const [currentTitle, setCurrentTitle] = useState('');
 
 
  const  {convertContent} = useConvert();
  const onChangeContents = (contents: string) => {
    setContents(contents);
    setValue('contents', contents === '<p><br></p>' ? '' : convertContent(contents));
    trigger('contents');
  };
  const { formats, modules, boardLastId } = useCustomQuill(quillRef, currentUser?.userId!);

  const { deleteApi } = ifInImageApi(`${boardLastId}/${currentUser?.userId!}`);
  const { mutate : deleteImageMutate } = useMutation(deleteApi, {
    onError(error) {console.log({ error }); }
  });

  const { postApi } = ifInImageApi('/board/createBoard', true);
  const {mutate: createBoardMutate} = useMutation(postApi,{
    onError(error) {
        console.log({error})
    },
    onSuccess(data) {
      console.log({data})
    },
  })


  const { handlePageLeave, handleRouteChangeStart } = useConfirm(router, deleteImageMutate);

  /* 
  useEffect(()=>{
      if(boardLastId){
        deleteImageMutate({})
      }
  },[boardLastId])
  
  useEffect(() => {
    window.addEventListener('beforeunload', handlePageLeave);
    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => {
      window.removeEventListener('beforeunload', handlePageLeave);
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [isMount]); */

  const createMutateFn = ({boardTitle, image, contents}: any)=>{
    const formData = new FormData();
    formData.append("boardTitle", boardTitle)
    formData.append("boardImage", image)
    formData.append("contents", contents)
    formData.append("categorySubTitle", currentTitle)
    formData.append("boardId", boardLastId)
    // createBoardMutate(formData)
  }

  const onSubmit = ({boardTitle, image, contents}:  any) => {
    if(image.length <= 0){
      if(confirm('대표이미지가 비어있습니다.\n계속 진행 시 기본이미지로 저장됩니다.')){
        createMutateFn({boardTitle, image, contents})
      }
    }else{
      createMutateFn({boardTitle, image, contents})
    }
  };
  useEffect(()=>{
    if(router.query.subTitle){
      setCurrentTitle(String(router.query.subTitle))
    }

  },[router.query.subTitle])
  return (
    <>
      {isMount ? (
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <BoardTitleBox>
              <TitleInput isError={Boolean(errors.boardTitle)} {...register('boardTitle', { required: true })} placeholder="게시물의 제목을 입력하세요" />
            </BoardTitleBox>
            <CustomQuill forwardedRef={quillRef} modules={modules} formats={formats}  onChange={onChangeContents} />
            <TestWrap dangerouslySetInnerHTML={{ __html :  DOMPurify.sanitize(contents)  }} />
            <CompletionBtnBox>
              <CompletionBtn type="button" onClick={handleClickMenu}>
                작성 완료
              </CompletionBtn>
              {isActive && <CompletionBox handleClickMenu={handleClickMenu} isOpen={isOpen} boardLastId={boardLastId} />}
            </CompletionBtnBox>
          </Form>
        </FormProvider>
      ) : null}
    </>
  );
};
// 게시물 보이기
/* 
일단 저장


*/
export default SubTitleAddForm;

const Form = styled.form``;
const BoardTitleBox = styled.div`
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.8);
`;
const TitleInput = styled.input<{ isError: boolean }>`
  width: 100%;
  line-height: 40px;
  padding: 20px 20px;
  background: transparent;
  font-size: 24px;
  border: 1px solid rgba(128, 128, 128, 0.8);
  outline: none;
  color: #fff;
  transition: 0.2s;
  &:focus {
    border: 1px solid #fff;
  }
  &::placeholder {
    transiton: 0.2s;
  }
  ${({ isError, theme }) =>
    isError &&
    `
    border: 1px solid ${theme.color.err};
    &::placeholder {
      color : ${theme.color.err};
    }
  `}
`;

const CustomQuill = styled(QuillNoSSRWrapper)`
  .ql-toolbar {
    background: #fff;
    color: #000;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 15px;
  }
  .ql-toolbar.ql-snow .ql-formats {
    padding: 5px 0;
  }
  .ql-container {
    height: 800px;
  }
  .ql-snow .ql-color-picker .ql-picker-options {
    width: 199px;
    padding: 10px 7px;
  }
  .ql-snow .ql-color-picker .ql-picker-item {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 3px;
    border: 1px solid #a5a5a5a1;
  }
  .ql-snow .ql-editor pre.ql-syntax{
    background : #474949;
  }
`;

const TestWrap = styled.div`
  .ql-align-center {
    text-align: center;
  }
  .ql-align-right {
    text-align: right;
  }
  img {
    // cursor:default !important;
  }
`;

const CompletionBtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 30px 0;
`;

const CompletionBtn = styled.button`
  padding: 15px 40px;
  line-height: 16px;
  border-radius: 40px;
  background: #e5e5e5;
  transition: 0.2s;
  font-size: 14px;
  &:hover {
    background: #fff;
  }
`;

const SubmitBtn = styled.button`
  width: 88px;
  line-height: 38px;
  border-radius: 20px;
  background: #e5e5e5;
  transition: 0.2s;
  &:hover {
    background: #fff;
  }
`;
