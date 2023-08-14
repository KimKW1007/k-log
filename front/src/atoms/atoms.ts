import { SearchBoardProps } from '@src/types/board';
import { User } from '@src/types/user';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom: sessionPersistAtom } = recoilPersist({
  key: 'sessionStorageKey',
  storage: sessionStorage
});
const { persistAtom: localPersistAtom } = recoilPersist();

export const userInfomation = atom<User | null>({
  key: 'userInfomationKey',
  default: null,
  effects_UNSTABLE: [sessionPersistAtom]
});

export const inputResetBoolean = atom<boolean>({
  key: 'inputResetBooleanKey',
  default: false
});

export const currentBanner = atom<number>({
  key: 'currentBannerKey',
  default: 1
});

export const NotFoundByEmail = atom<boolean>({
  key: 'NotFoundByEmailKey',
  default: false
});

export const isRemoveSidebar = atom<boolean>({
  key: 'isRemoveSidebarKey',
  default: false
});

export const searchModalState = atom<boolean>({
  key: 'searchModalStateKey',
  default: false
});

export const currentPagenation = atom<number>({
  key: 'currentPagenationKey',
  default: 1,
  effects_UNSTABLE: [sessionPersistAtom]
});
export const searchRecent = atom<SearchBoardProps[]>({
  key: 'searchRecentKey',
  default: [],
  effects_UNSTABLE: [localPersistAtom]
});
