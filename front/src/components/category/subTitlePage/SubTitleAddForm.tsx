import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled,{keyframes} from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useRouter  } from 'next/router';
import useIsMount from 'src/hooks/useIsMount';
import DOMPurify from 'dompurify';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import useCustomQuill from '@utils/useCustomQuill';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@atoms/atoms';
import customApi from '@utils/customApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import imageApi from '@utils/ImageApi';
import useConfirm from 'src/hooks/useConfirm';



interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}
const QuillNoSSRWrapper = dynamic(async () => {
  const { default: QuillComponent } = await import("react-quill");
  const { default: BlotFormatter } = await import("quill-blot-formatter");
  QuillComponent.Quill.register("modules/blotFormatter", BlotFormatter);
  return function forwardRef({ forwardedRef, ...props } : ForwardedQuillComponent) {
    return <QuillComponent ref={forwardedRef}  {...props} />;
  };
}, {
    ssr : false
})

const SubTitleAddForm = () => {
  const router = useRouter()
  const quillRef = useRef<ReactQuill>(null)
  const [contents, setContents] = useState<string>('');
  const {isMount} = useIsMount();
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);
  const onChangeContents = (contents : string)=>{
    setContents(contents)
  }
  const { formats, modules, boardLastId } = useCustomQuill(quillRef, currentUser?.userId!);
 
  const {deleteApi} = imageApi(`${boardLastId}/${currentUser?.userId!}`)
  const {mutate} = useMutation(deleteApi,{
    onError(error) {
        console.log({error})
    },
    onSuccess(data) {
      console.log({data})
    },
  })
  const {handlePageLeave, handleRouteChangeStart} = useConfirm(router, mutate);


  useEffect(()=>{
    if(boardLastId){
      mutate({})
    }
  },[boardLastId])
  
  useEffect(() => {
    window.addEventListener('beforeunload', handlePageLeave);
    router.events.on('routeChangeStart', handleRouteChangeStart);
    return () => {
      window.removeEventListener('beforeunload', handlePageLeave);
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [isMount]);



  return (
   <>
    {isMount && <Form>
      <BoardTitleBox>
        <TitleInput placeholder='게시물의 제목을 써 주세요'/>
      </BoardTitleBox>
      <CustomQuill forwardedRef={quillRef} modules={modules} formats={formats}  onChange={onChangeContents} />
      <TestWrap dangerouslySetInnerHTML={{ __html :  DOMPurify.sanitize(contents)  }} />
    </Form>}
    </>
  )
}
// 게시물 보이기
/* 
일단 저장


*/
export default SubTitleAddForm

const Form = styled.div`

`
const BoardTitleBox = styled.div`

margin-bottom : 30px;
padding-bottom : 30px;
border-bottom : 1px solid rgba(128,128,128,0.8);
`
const TitleInput = styled.input`
  width:100%;
  line-height: 40px;
  padding: 20px 20px;
  background: transparent;
  font-size: 24px;
  border : 1px solid rgba(128,128,128,0.8);
  outline : none;
  color: #fff;
  transition : .2s;
  &:focus{
    border : 1px solid #fff;
  }
`

const CustomQuill = styled(QuillNoSSRWrapper)`
  .ql-toolbar{
    background: #fff;
    color: #000;
    display:flex;
    align-items:center;
    height: 60px;
  }
  .ql-container{
    height: 700px;
  }
  .ql-snow .ql-color-picker .ql-picker-options{
    width: 199px;
    padding: 10px 7px;
  }
  .ql-snow .ql-color-picker .ql-picker-item{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin : 3px;
    border : 1px solid #a5a5a5a1;
  }
`

const TestWrap = styled.div`
.ql-align-center{
  text-align:center;
}
.ql-align-right{
  text-align:right;
}
img{
  // cursor:default !important;
}
`
