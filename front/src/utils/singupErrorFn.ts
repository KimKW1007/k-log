import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export const errorFn = (passSentence: string, firVal?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>, secVal?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>) => {
  if (secVal) {
    return firVal?.message || secVal.message || passSentence;
  }
  return firVal?.message || passSentence;
};