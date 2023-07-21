import React, { useEffect, useMemo, useState } from 'react'
import imageApi from './ImageApi';
import ReactQuill from 'react-quill';
import customApi from './customApi';
import { useQuery } from '@tanstack/react-query';
import useIsMount from 'src/hooks/useIsMount';
import { useRouter } from 'next/router';


const useCustomQuill = (quillRef : React.RefObject<ReactQuill>, userId : string) => {
  const {postApi} = imageApi('uploads');
  const router = useRouter()
  const [currentSubTitle, setCurrentSubTitle] = useState('');
  const { getApi } = customApi("/board/lastBoardId");
  const {isMount} = useIsMount();
  const {data : boardLastId} = useQuery(['GET_BOARD_LAST_ID'], getApi,{
    enabled: !!isMount
  })

  useEffect(()=>{
    if(router.query.subTitle){
      setCurrentSubTitle(String(router.query.subTitle).split(' ').at(-1)!)
    }
  },[router.query.subTitle])


  const handleImage =  () => {
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
        formData.append("subTitle", currentSubTitle);
        formData.append("boardId", String(boardLastId));
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
  const modules = useMemo(()=>{
    return { 
      blotFormatter: {},
      toolbar:{
        container:[
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'align': [] }],
          [{ 'indent': '-1'}, { 'indent': '+1' }],  
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          ['image', 'link'],
          ['clean'] 
        ],
        handlers: {
          image: handleImage,
        }
      },
    }
  },[currentSubTitle])
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

  return { formats, modules, boardLastId }
}

export default useCustomQuill