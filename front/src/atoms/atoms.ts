import { User } from '@src/types/user';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom: sessionPersistAtom } = recoilPersist({
  key: 'sessionStorageKey',
  storage: sessionStorage
});

export const userInfomation = atom<User | null>({
  key: 'userInfomationKey',
  default: null,
  effects_UNSTABLE: [sessionPersistAtom]
});

export const inputResetBoolean = atom<boolean>({
  key: 'inputResetBooleanKey',
  default: false
});
