import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled,{keyframes} from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useIsMount from 'src/hooks/useIsMount';
import DOMPurify from 'dompurify';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import imageApi from '@utils/ImageApi';
import useCustomQuill from '@utils/useCustomQuill';
import { useRecoilState } from 'recoil';
import { userInfomation } from '@atoms/atoms';



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
  const [currentQuery, setCurrentQuery] = useState('');
  const quillRef = useRef<ReactQuill>(null)
  const [contents, setContents] = useState<string>('');
  const [currentUser, setCurrentUser] = useRecoilState(userInfomation);

  const {isMount} = useIsMount();
  const onChangeContents = (contents : string)=>{
    console.log({contents})
    setContents(contents)
  }
  const { formats, modules } = useCustomQuill(quillRef, currentUser!.userId! , currentQuery, '1');

  useEffect(()=>{
    if(router.query.subTitle){
      setCurrentQuery(String(router.query.subTitle).split(' ').at(-1)!)
    }
  },[router.query.subTitle])
  return (
    <div>
      <CustomQuill forwardedRef={quillRef} modules={modules} formats={formats}  onChange={onChangeContents} />
      {typeof window !== 'undefined' ?(
        <TestWrap dangerouslySetInnerHTML={{ __html :  DOMPurify.sanitize(contents)  }} />
      ):<div/>}
    </div>
  )
}
// 게시물 보이기
/* 
일단 저장


*/
export default SubTitleAddForm

const CustomQuill = styled(QuillNoSSRWrapper)`
  .ql-toolbar{
    background: #fff;
    color: #000;
  }
  .ql-container{
    height: 700px;
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
