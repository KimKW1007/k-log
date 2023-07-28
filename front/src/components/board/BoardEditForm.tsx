import { userInfomation } from '@atoms/atoms';
import Tags from '@components/board/Tags';
import { BoardTitleBox, CompletionBtn, CompletionBtnBox, CustomQuill, TitleInput } from '@components/board/subTitlePage/BoardAddForm';
import CompletionBox from '@components/board/subTitlePage/CompletionBox';
import { useMutation, useQuery } from '@tanstack/react-query';
import customApi from '@utils/customApi';
import ifInImageApi from '@utils/ifInImageApi';
import useCustomQuill from '@utils/useCustomQuill';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import { useRecoilState } from 'recoil';
import useConfirm from 'src/hooks/useConfirm';
import useConvert from 'src/hooks/useConvert';
import useHandleSideMenu from 'src/hooks/useHandleSideMenu';
import useIsMount from 'src/hooks/useIsMount';
import styled from 'styled-components';


const BoardEditForm = ({subTitle, id} : {[key : string] : string}) => {  
  const methods = useForm({
    mode: 'all'
  });
  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,
    formState: { errors }
  } = methods;
  const { handleClickMenu, isOpen, isActive } = useHandleSideMenu();
  const router = useRouter();
  const quillRef = useRef<ReactQuill>(null);
  const { isMount } = useIsMount();
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const [contents, setContents] = useState<string>('');
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const { formats, modules } = useCustomQuill(quillRef, String(currentUser?.id!));


  const { getApi } = customApi(`/board/${id}`);
  const { data } = useQuery(['GET_BOARD', id], getApi, {
    enabled: !!isMount
  });
  const {currentBoard, prevBoard, nextBoard} = data ?? {};


  const  {convertContent , reverseConvert} = useConvert();
  const onChangeContents = (contents: string) => {
    setContents(contents);
    setValue('contents', contents === '<p><br></p>' ? '' : convertContent(contents));
    trigger('contents');
  };

  const { postApi } = ifInImageApi('/board/category/edit', true);
  const {mutate: editBoardMutate} = useMutation(postApi,{
    onError(error) {
        console.log({error})
    },
    onSuccess(data) {
      console.log({data})
      router.replace(`/${id}`)
    },
  })

  const { deleteApi: imageDeleteApi } = ifInImageApi(`작성중/${currentUser?.id!}`);
  const { mutate : deleteImageMutate } = useMutation(imageDeleteApi, {
    onError(error) {console.log({ error }); }
  });
  const { handlePageLeave, handleRouteChangeStart } = useConfirm(router, deleteImageMutate);
/*   useEffect(()=>{
      if(boardLastId){
        deleteImageMutate({})
      }
  },[boardLastId]) */
  
  /* useEffect(() => {
    window.addEventListener('beforeunload', handlePageLeave);
    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => {
      window.removeEventListener('beforeunload', handlePageLeave);
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [isMount]); */


  const editMutateFn = ({boardTitle, image, contents}: any)=>{
    const formData = new FormData();
    formData.append("boardTitle", boardTitle)
    formData.append("boardImage", image)
    formData.append("contents", contents)
    formData.append("categorySubTitle", subTitle)
    formData.append("boardId", id)
    formData.append("tags", currentTags.toString())
    editBoardMutate(formData)
  }

  const onSubmit = ({boardTitle, image, contents}:  any) => {
    if(image.length <= 0){
      if(confirm('대표이미지가 비어있습니다.\n계속 진행 시 기본이미지로 저장됩니다.')){
        editMutateFn({boardTitle, image, contents})
      }
    }else{
      editMutateFn({boardTitle, image, contents})
    }
  };
  
  useEffect(()=>{
    setCurrentTags(currentBoard.tags.split(','))
  },[data, isMount])

  return (
    <>
    {(data && isMount) ? (
      <FormProvider {...methods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <BoardTitleBox>
            <TitleInput isError={Boolean(errors.boardTitle)} {...register('boardTitle', { required: true })} defaultValue={currentBoard.boardTitle} placeholder="게시물의 제목을 입력하세요" autoComplete='off' />
          </BoardTitleBox>
          <Tags currentTags={currentTags} setCurrentTags={setCurrentTags}  />
          <CustomQuill forwardedRef={quillRef} modules={modules} formats={formats} defaultValue={reverseConvert(currentBoard.contents)}  onChange={onChangeContents} />
          <CompletionBtnBox>
            <CompletionBtn type="button" onClick={handleClickMenu}>
              작성 완료
            </CompletionBtn>
            {isActive && <CompletionBox handleClickMenu={handleClickMenu} isOpen={isOpen} boardLastId={Number(id)} defaultThumbnail={currentBoard.thumbnail} />}
          </CompletionBtnBox>
        </Form>
      </FormProvider>
    ) : null}
  </>
  )
}

export default BoardEditForm

const Form = styled.form``;
