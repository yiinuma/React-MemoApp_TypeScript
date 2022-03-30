/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axiosInstance';
import { MemoType } from '../types/memo';

export const useMemoCrud = () => {
  const { loginInstance } = axiosInstance();

  // 何でもメモ新規登録
  const createMemo = useCallback(
    (title: string, category: string, description: string, date: string, complete: boolean) => {
      loginInstance
        .post('/memo', { title, category, description, date, mark_div: Number(complete) })
        .then((res: AxiosResponse<MemoType[]>) => {
          toast.success('新規登録しました');
          console.log(res);
        })
        .catch((e: AxiosError<{ error: string }>) => {
          toast.success('新規登録に失敗しました');
          console.log(e.message);
        });
    },
    [loginInstance]
  );

  // 何でもメモ一覧取得
  const readMemo = useCallback(() => {
    loginInstance
      .get('/memos', {})
      .then((res: AxiosResponse<MemoType[]>) => {
        toast.success('一覧を取得しました');
        console.log(res);
      })
      .catch((e: AxiosError<{ error: string }>) => {
        toast.success('一覧取得に失敗しました');
        console.log(e.message);
      });
  }, [loginInstance]);

  // 何でもメモ更新
  const upDateMemo = useCallback(
    (id: string, title: string, category: string, description: string, date: string, complete: boolean) => {
      loginInstance
        .put(`/memo${id}`, { title, category, description, date, mark_div: Number(complete) })
        .then((res: AxiosResponse<MemoType[]>) => {
          toast.success('更新しました');
          console.log(res);
        })
        .catch((e: AxiosError<{ error: string }>) => {
          toast.success('更新に失敗しました');
          console.log(e.message);
        });
    },
    [loginInstance]
  );

  return { createMemo, readMemo, upDateMemo };
};
