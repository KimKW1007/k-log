import { FieldErrors, UseFormClearErrors, UseFormRegister, UseFormSetError, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RegisterInputs } from "./user";

export interface RegisterPagesProps {
  register: UseFormRegister<RegisterInputs>;
  watch: UseFormWatch<RegisterInputs>;
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
  errors?: FieldErrors<RegisterInputs>;
  setIsPassCertificate?: React.Dispatch<React.SetStateAction<boolean>>;
  isPassCertificate?: boolean;
  setValue?: UseFormSetValue<RegisterInputs>;
  setError: UseFormSetError<RegisterInputs>;
  clearErrors: UseFormClearErrors<RegisterInputs>;
}