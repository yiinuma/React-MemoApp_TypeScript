/* eslint-disable camelcase */
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';
import { LoadingState } from '../components/store/loadingState';
import { memoState } from '../components/store/memoState';
import { axiosInstance } from '../lib/axiosInstance';
import { MemoType } from '../types/memo';

export const useMemoCrud = () => {
  const { loginInstance } = axiosInstance();
  const setMemos = useSetRecoilState<MemoType[]>(memoState);
  const setLoading = useSetRecoilState<boolean>(LoadingState);

  // 何でもメモ新規登録
  const createMemo = useCallback(
    (title: string, category: string, description: string, date: string, complete: boolean) => {
      loginInstance
        .post<MemoType[]>('/memo', { title, category, description, date, mark_div: Number(complete) })
        .then((res) => {
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
    setLoading(true);
    loginInstance
      .get<MemoType[]>('/memos', {})
      .then((res) => {
        const resData = res.data;
        console.log(resData);
        setMemos(resData);
        setLoading(false);
        toast.success('一覧を取得しました');
      })
      .catch((e: AxiosError<{ error: string }>) => {
        toast.success('一覧取得に失敗しました');
        console.log(e.message);
      });
  }, [loginInstance, setLoading, setMemos]);

  // 何でもメモ更新
  const upDateMemo = useCallback(
    (id: string, title: string, category: string, description: string, date: string, complete: boolean) => {
      loginInstance
        .put(`/memo/${id}`, { title, category, description, date, mark_div: Number(complete) })
        .then((res) => {
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

  // 何でもメモ削除
  const deleteMemo = useCallback(
    (id: string) => {
      loginInstance
        .delete(`/memo${id}`)
        .then((res) => {
          toast.success('削除しました');
          console.log(res);
        })
        .catch((e: AxiosError<{ error: string }>) => {
          toast.success('削除に失敗しました');
          console.log(e.message);
        });
    },
    [loginInstance]
  );

  return { createMemo, readMemo, upDateMemo, deleteMemo };
};
