import { atom } from 'recoil';
import { MemoType } from '../types/memo';

export const memoState = atom<MemoType[]>({
  key: 'memoState',
  default: [],
});
