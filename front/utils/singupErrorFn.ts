import { FieldError } from "react-hook-form";

export const errorFn = (passSentence: string, firVal?: FieldError, secVal?: FieldError) => {
  if (secVal) {
    return firVal?.message || secVal.message || passSentence;
  }
  return firVal?.message || passSentence;
};