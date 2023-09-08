import React, { useMemo } from 'react';
import ifInImageApi from './ifInImageApi';
import ReactQuill from 'react-quill';
import hljs from 'highlight.js/lib/core';
import { removeEmptyBetweenString } from './removeTwoMoreEmptyBetweenString';
import 'highlight.js/styles/atom-one-dark.css';

const useCustomQuill = (quillRef: React.RefObject<ReactQuill>) => {
  const { postApi } = ifInImageApi('/file/boardImage');

  const handleImage = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      if (input.files) {
        const file = new File([input.files[0]], removeEmptyBetweenString(input.files[0].name), { type: input.files[0].type });
        const formData = new FormData();
        formData.append('image', file);
        try {
          const res = await postApi(formData);
          const IMG_URL = res.url;
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection();
          editor?.insertEmbed(range?.index!, 'image', `${IMG_URL}`);
          editor?.setSelection(range?.index! + 1, 0);
          const insertedImage = editor?.root.querySelector('img[src="' + IMG_URL + '"]');
          if (insertedImage) {
            insertedImage.setAttribute('width', '300px');
            insertedImage.setAttribute('height', 'auto');
          }
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
          [{ align: [] }],
          [{ indent: '-1' }, { indent: '+1' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          ['image', 'link']
        ],
        handlers: {
          image: handleImage
        }
      }
    };
  }, []);
  const formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'color', 'background', 'align', 'code-block'];

  return { formats, modules };
};

export default useCustomQuill;
