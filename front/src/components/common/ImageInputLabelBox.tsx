import { getBase64 } from '@utils/getBase64';
import React, { useCallback } from 'react'
import { RefCallBack, useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { Add } from '@styled-icons/ionicons-solid/Add';

interface InputLabelProps{
  setImage: React.Dispatch<React.SetStateAction<undefined>>
  setIsChangeValue ?: React.Dispatch<React.SetStateAction<boolean>>
}
/**
 * - 부모 컴포넌트에 position : relative 필수
 * 
 * @param setImage: React.Dispatch<React.SetStateAction<undefined>> 
 * @param setIsChangeValue ?: React.Dispatch<React.SetStateAction<boolean>>
 * 
 * 
 */
const ImageInputLabelBox = ({setImage, setIsChangeValue} :InputLabelProps) => {

  const {register, setValue} = useFormContext();
  const { onChange, ref } = register('image');

  const onAvatarChange = useCallback(async (event: any) => {
    if (event.target.files?.[0]) {
      const imageFile = event.target.files[0];
      const base64 = await getBase64(imageFile).then((res: any) => {
        setImage(res);
      });
      setValue('image', imageFile);
      setIsChangeValue && setIsChangeValue(true);
      onChange(event);
    }
  }, []);

  return (
    <InputLabelBox>
        <input ref={ref} onChange={onAvatarChange} type="file" className="blind" name="userImage" id="userImage" />
        <label htmlFor="userImage">
          <Add />
        </label>
    </InputLabelBox>
  )
}

export default ImageInputLabelBox

const InputLabelBox = styled.div`
  position: absolute;
  z-index: 3;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  label {
    display: flex;
    width: 100%;
    height: 100%;
    background: transparent;
    padding: 40px;
    transition: 0.3s;
    cursor: pointer;
    svg {
      margin: auto;
      width: 50px;
      color: transparent;
    }
  }
  &:hover {
    label {
      background: rgba(0, 0, 0, 0.5);
      svg {
        color: #fff;
      }
    }
  }
`;