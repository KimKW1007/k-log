import { CertificateEmailProps } from "./certificateEmail";
import { User } from "./user";

export interface FindIdProps extends CertificateEmailProps {
  isClickFindBtn: boolean;
  userIds: User[];
}
export interface FindPasswordProps extends Omit<FindIdProps,'userIds'> {
  isSuccessChangePassword: boolean
}