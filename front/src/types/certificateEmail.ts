import { RegisterPageProps } from "./register";

export interface CertificateEmailProps extends Omit<RegisterPageProps, "setIsAllChecked"> {
  small?: boolean;

}