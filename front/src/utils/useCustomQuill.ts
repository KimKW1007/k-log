import React, { useMemo } from 'react'
import imageApi from './ImageApi';
import ReactQuill from 'react-quill';

/**
 * 
 * @param quillRef 
 * @param userId
 * @param currentParams 
 * @param paramsIndex 
 * @returns 
 */
const useCustomQuill = (quillRef : React.RefObject<ReactQuill>, userId : string , currentParams : string, paramsIndex : string) => {
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
        formData.append("userId", userId);
        formData.append("subTitle", currentParams);
        formData.append("subTitleIdx", paramsIndex);
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

  return { formats, modules }
}

export default useCustomQuill