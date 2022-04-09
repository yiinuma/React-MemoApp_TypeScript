import { atom } from 'recoil';

export const editIndexState = atom<number | null>({
  key: 'editIndexState',
  default: null,
});
