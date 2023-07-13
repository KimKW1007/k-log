import { useMutation } from '@tanstack/react-query';
import imageApi from '@utils/ImageApi';
import customApi from '@utils/customApi';
import { GetServerSideProps } from 'next';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'




function getBase64(file : any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const SidebarHeader = () => {

  const {postApi} = imageApi("/upload");
  const {mutate} = useMutation(postApi,{
    onError(error : any) {
        console.log({error})
    },
    onSuccess(data) {
        console.log({data})
    },
  })
  

  const methods = useForm({mode:"all"});
  const  {handleSubmit, register, setValue} = methods;
  const { onChange, ref } = register('image');
  const [image, setImage] = useState();
  const onAvatarChange = useCallback(async (event : any) => {
    if (event.target.files?.[0]) {
      const imageFile = event.target.files[0];
      const base64 = await getBase64(imageFile).then((res : any) => {
        setImage(res)
      });

      setValue('image', imageFile)
      onChange(event);
    }
  }, []);
  const onSubmit = async ({image}: any) =>{
    if(image.length < 1)  {
      alert("File을 선택해주세요");
      return
    }
    const formData = new FormData();
    formData.append('file', image);
    console.log(formData.get("file"))
   
    mutate(formData) 

  }



  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      {image && <img src={image} width="100px" />}
      <input ref={ref} onChange={onAvatarChange} type="file" name="userImage" id="userImage" />
      <button>제출</button>
    </form>
  )
}

export default SidebarHeader

