import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage = typeof window !== "undefined" ? window.sessionStorage : undefined;


const { persistAtom: sessionPersistAtom } = recoilPersist({
  key: "sessionStorageKey",
  storage: sessionStorage,
});

export const userInfomation = atom<any>({
  key: "userInfomationdsa",
  default: null,
  effects_UNSTABLE: [sessionPersistAtom],
});