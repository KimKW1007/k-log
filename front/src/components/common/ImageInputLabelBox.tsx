import { getBase64 } from '@/src/utils/getBase64';
import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { Add } from '@styled-icons/ionicons-solid/Add';
import { removeEmptyBetweenString } from '@/src/utils/removeTwoMoreEmptyBetweenString';

interface InputLabelProps {
  setImage: React.Dispatch<React.SetStateAction<string>>;
  setIsChangeValue?: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
}
/**
 * - 부모 컴포넌트에 position : relative 필수
 *
 * @param setImage: React.Dispatch<React.SetStateAction<undefined>>
 * @param setIsChangeValue ?: React.Dispatch<React.SetStateAction<boolean>>
 *
 *
 */
const ImageInputLabelBox = ({ setImage, setIsChangeValue, id }: InputLabelProps) => {
  const { register, setValue } = useFormContext();
  const { onChange, ref } = register('image');

  const onAvatarChange = useCallback(async (event: any) => {
    if (event.target.files?.[0]) {
      const imageFile = event.target.files[0];
      const base64 = await getBase64(imageFile).then((res: any) => {
        setImage(res);
      });
      const newImage = new File([imageFile], removeEmptyBetweenString(imageFile.name), { type: imageFile.type });
      setValue('image', newImage);
      setIsChangeValue && setIsChangeValue(true);
      onChange(event);
    }
  }, []);

  return (
    <InputLabelBox>
      <input ref={ref} onChange={onAvatarChange} type="file" className="blind" name={id} id={id} />
      <label htmlFor={id}>
        <Add />
      </label>
    </InputLabelBox>
  );
};

export default ImageInputLabelBox;

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
