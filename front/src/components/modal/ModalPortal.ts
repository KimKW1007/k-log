import useIsMount from '@/src/hooks/useIsMount';
import { ChildrenProps } from '@/src/types/children';
import ReactDOM from 'react-dom';

const ModalPortal = ({ children }: ChildrenProps) => {
  const { isMount } = useIsMount();

  const el = document.getElementById('modal-root') as HTMLElement;

  return isMount ? ReactDOM.createPortal(children, el) : null;
};

export default ModalPortal;
