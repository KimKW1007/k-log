import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled,{keyframes} from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import useIsMount from 'src/hooks/useIsMount';
import DOMPurify from 'dompurify';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import imageApi from '@utils/ImageApi';



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
  const quillRef = useRef<ReactQuill>(null)
  const [contents, setContents] = useState<string>('');
  const {isMount} = useIsMount();
  const onChangeContents = (contents : string)=>{
    console.log({contents})
    setContents(contents)
  }
  const {postApi} = imageApi('uploads');
  const handleImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      if(input.files){
        const file = input.files[0];
        const formData = new FormData();
        formData.append("image", file);
        formData.append("userId", 'admin1');
        try {
          const res = await postApi(formData);
          const IMG_URL = res.url;
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection();
          editor?.insertEmbed(range?.index!, "image", `${IMG_URL}`);
          editor?.setSelection(range?.index! + 1, 0);
        } catch (err) {
          return "실패";
        }
      }
    });
  }
  
  const modules = useMemo(()=>(
    { 
      blotFormatter: {},
      toolbar:{
        container:[
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],  
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color'] }, { 'background': [] }],
          ['image', 'link'],
          ['clean'] 
        ],
        handlers: {
          image: handleImage,
        }
      },
      
    }
  ),[])
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background',
    'align',
  ]
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
/*  */
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
