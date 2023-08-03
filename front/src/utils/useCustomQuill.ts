import React, { useEffect, useMemo, useState } from 'react';
import ifInImageApi from './ifInImageApi';
import ReactQuill from 'react-quill';
import customApi from './customApi';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import hljs from 'highlight.js/lib/core';
import { GET_BOARD_LAST_ID } from './queryKeys';
import { removeEmptyBetweenString } from './removeTwoMoreEmptyBetweenString';
import useIsMount from 'src/hooks/useIsMount';

const useCustomQuill = (quillRef: React.RefObject<ReactQuill>, userId: string, subTitle : string) =>{
  console.log({subTitle})
  const { postApi } = ifInImageApi('uploads');
  const {isMount} = useIsMount();
  const { getApi } = customApi(`/board/lastBoardId/${subTitle.replaceAll('/','-')}`);
  const { data: boardLastId } = useQuery([GET_BOARD_LAST_ID], ()=> getApi(true));

 
  const handleImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      if (input.files) {
        const file = new File([input.files[0]], removeEmptyBetweenString(input.files[0].name), {type : input.files[0].type});
        const formData = new FormData();
        formData.append('image', file);
        formData.append('userId', userId);
        formData.append('subTitle', subTitle);
        formData.append('boardId', '작성중');
        try {
          const res = await postApi(formData);
          const IMG_URL = res.url;
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection();
          editor?.insertEmbed(range?.index!, 'image', `${IMG_URL}`);
          editor?.setSelection(range?.index! + 1, 0);
        } catch (err) {
          return '실패';
        }
      }
    });
  };

  const modules = useMemo(() => {
    return {
      syntax: {
        highlight: (text: any) => hljs.highlightAuto(text).value
      },
      blotFormatter: {},
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          // [{ 'size': ['huge','large','small'] }],
          [{ align: [] }],
          [{ indent: '-1' }, { indent: '+1' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['image', 'link']
        ],
        handlers: {
          image: handleImage,
        }
      }
    };
  }, []);
  const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'color', 'background', 'align', 'code-block'];

  return { formats, modules, boardLastId };
};

export default useCustomQuill;
