/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { useCallback } from 'react';
import { axiosInstance } from '../lib/axiosInstance';
import { MemoType } from '../types/memo';

export const useMemoCrud = () => {
  const { loginInstance } = axiosInstance();

  // 何でもメモ新規登録
  const createMemo = useCallback(
    (title: string, category: string, description: string, date: string, mark_div: number) => {
      loginInstance
        .post('/memo', { title, category, description, date, mark_div })
        .then((response: AxiosResponse<MemoType[]>) => {
          console.log(response);
        })
        .catch((e: AxiosError<{ error: string }>) => console.log(e.message));
    },
    [loginInstance]
  );

  // 何でもメモ一覧取得
  const readMemo = useCallback(() => {
    loginInstance
      .get('/memos', {})
      .then((response: AxiosResponse<MemoType[]>) => console.log(response))
      .catch((e: AxiosError<{ error: string }>) => console.log(e.message));
  }, [loginInstance]);

  return { createMemo, readMemo };
};
