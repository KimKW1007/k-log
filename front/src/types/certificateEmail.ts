import { RegisterPagesProps } from "./register";
import { User } from "./user";

export interface CertificateEmailProps extends Omit<RegisterPagesProps, 'setIsAllChecked'> {
  small?: boolean;
  isClickFindBtn ?:boolean;
  userIds ?: User[];
}