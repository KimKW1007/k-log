import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useRouter, usePathname } from 'next/navigation';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import useCustomQuill from '@/src/utils/useCustomQuill';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@/src/atoms/atoms';
import { useMutation, useQuery } from '@tanstack/react-query';
import ifInImageApi from '@/src/utils/ifInImageApi';
import { FormProvider, useForm } from 'react-hook-form';
import CompletionBox from './CompletionBox';
import Tags from '../Tags';
import PageLoading from '@/src/components/common/Loading/PageLoading';
import customApi from '@/src/utils/customApi';
import { GET_BOARD } from '@/src/utils/queryKeys';
import useIsMount from '@/src/hooks/useIsMount';
import useConfirm from '@/src/hooks/useConfirm';
import useHandleSideMenu from '@/src/hooks/useHandleSideMenu';
import useConvert from '@/src/hooks/useConvert';

/* agate / base16/dracula */

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.RefObject<ReactQuill>;
}

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import('react-quill');
    const { default: BlotFormatter } = await import('quill-blot-formatter');
    const hljs = await import('highlight.js');
    hljs.default.configure({
      languages: ['javascript', 'typescript', 'python', 'css']
    });

    QuillComponent.Quill.register('modules/blotFormatter', BlotFormatter);
    return function forwardRef({ forwardedRef, ...props }: ForwardedQuillComponent) {
      return <QuillComponent ref={forwardedRef} theme={'snow'} {...props} />;
    };
  },
  {
    ssr: false
  }
);

interface BoardFormProps {
  subTitle: string;
  id?: string;
  isEdit?: boolean;
}

const BoardForm = ({ subTitle, id, isEdit = false }: BoardFormProps) => {
  const methods = useForm({
    mode: 'all'
  });
  const { handleClickMenu, isOpen, isActive } = useHandleSideMenu();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = methods;

  const router = useRouter();
  const pathname = usePathname();
  const quillRef = useRef<ReactQuill>(null);
  const { isMount } = useIsMount();
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const { formats, modules, boardLastId } = useCustomQuill(quillRef, String(currentUser?.id!), subTitle);
  const [isSuccess, setIsSuccess] = useState(false);

  const { convertContent } = useConvert();

  /* 로딩 */
  const [isLoading, setIsLoading] = useState(true);

  /* 생성 및 수정 */
  const { postApi: editApi } = ifInImageApi('/board/category/edit', true);
  const { postApi: createApi } = ifInImageApi('/board/createBoard', true);
  const { mutate: boardMutate } = useMutation(isEdit ? editApi : createApi, {
    onSuccess(data) {
      if (isEdit) {
        router.replace(`/${id}`);
      } else {
        let boardIdTimeout: string | number | NodeJS.Timeout | undefined;
        const checkBoardId = () => {
          if (data.boardId) {
            clearTimeout(boardIdTimeout); // 기다리던 타임아웃을 취소
            router.replace(`/${data.boardId}`);
          } else {
            boardIdTimeout = setTimeout(checkBoardId, 100); // 100ms 마다 체크
          }
        };
        checkBoardId();
      }
    }
  });

  /* Edit 일 경우 data */
  const { getApi } = customApi(`/board/getBoard/${id}`);
  const { data } = useQuery([GET_BOARD, id], () => getApi(), {
    enabled: !!isEdit
  });
  const { currentBoard } = data ?? {};

  useEffect(() => {
    if (data) {
      setCurrentTags(currentBoard.tags?.length >= 1 ? currentBoard.tags.split(',') : []);
      setValue('boardTitle', currentBoard.boardTitle);
    }
  }, [data, isMount, isEdit]);

  /* 작성중인 data 삭제 */
  const { deleteApi: imageDeleteApi } = ifInImageApi(`deleteFiles/작성중/${currentUser?.id!}`);
  const { mutate: deleteImageMutate } = useMutation(imageDeleteApi);
  const { handlePageLeave, handleRouteChangeStart } = useConfirm(pathname, deleteImageMutate);

  useEffect(() => {
    if (boardLastId) {
      deleteImageMutate({});
    }
  }, [boardLastId]);

  useEffect(() => {
    if (!isSuccess) {
      window.addEventListener('beforeunload', handlePageLeave);
    }
    return () => {
      window.removeEventListener('beforeunload', handlePageLeave);
    };
  }, [isMount, isSuccess]);

  useEffect(() => {
    let isLoadingTimer: string | number | NodeJS.Timeout | undefined;
    clearInterval(isLoadingTimer);
    isLoadingTimer = setInterval(() => {
      if (quillRef.current?.editor?.root) {
        setIsLoading(false);
        clearInterval(isLoadingTimer);
      }
    }, 1000);
  }, [data]);

  const mutateFn = ({ boardTitle, image }: any) => {
    const contents = quillRef.current?.editor?.root.innerHTML!;
    const formData = new FormData();
    formData.append('boardTitle', boardTitle);
    formData.append('boardImage', image);
    formData.append('contents', contents === '<p><br></p>' ? '' : convertContent(contents));
    formData.append('categorySubTitle', subTitle);
    formData.append('boardId', isEdit ? id! : '작성중');
    formData.append('tags', currentTags.toString());
    boardMutate(formData);
    setIsSuccess(true);
    handleClickMenu();
  };

  const onSubmit = ({ boardTitle, image, contents }: any) => {
    if (image.length <= 0) {
      if (confirm('대표이미지가 비어있습니다.\n계속 진행 시 기본이미지로 저장됩니다.')) {
        mutateFn({ boardTitle, image, contents });
      }
    } else {
      mutateFn({ boardTitle, image, contents });
    }
  };

  return (
    <>
      <PageLoading isLoading={isLoading!} />
      {isMount ? (
        <FormProvider {...methods}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <BoardTitleBox>
              <TitleInput isError={Boolean(errors.boardTitle)} {...register('boardTitle', { required: true })} placeholder="게시물의 제목을 입력하세요" autoComplete="off" />
            </BoardTitleBox>
            <Tags currentTags={currentTags} setCurrentTags={setCurrentTags} />
            <CustomQuill forwardedRef={quillRef} modules={modules} formats={formats} defaultValue={data ? convertContent(currentBoard.contents) : ''} />
            <CompletionBtnBox>
              <CompletionBtn type="button" onClick={handleClickMenu}>
                작성 완료
              </CompletionBtn>
              {isActive && <CompletionBox handleClickMenu={handleClickMenu} isOpen={isOpen} boardLastId={data ? Number(id) : boardLastId} defaultThumbnail={data ? currentBoard.thumbnail : null} />}
            </CompletionBtnBox>
          </Form>
        </FormProvider>
      ) : null}
    </>
  );
};

export default BoardForm;

const Form = styled.form``;
export const BoardTitleBox = styled.div`
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.8);
`;
export const TitleInput = styled.input<{ isError: boolean }>`
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

export const CustomQuill = styled(QuillNoSSRWrapper)`
  .ql-editor * {
    font-size: 14px;
    font-family: 'Pretendard-Regular' !important;
  }
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
    background: #454545;
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
  .ql-snow .ql-editor pre.ql-syntax {
    white-space: pre;
    overflow: auto;
    padding: 20px;
    &::-webkit-scrollbar {
      width: 8px;
      height: 4px;
    }

    &::-webkit-scrollbar-thumb:horizontal {
      background-color: #fff;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-corner {
      display: none;
    }
  }
`;

export const CompletionBtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 30px 0;
`;

export const CompletionBtn = styled.button`
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
