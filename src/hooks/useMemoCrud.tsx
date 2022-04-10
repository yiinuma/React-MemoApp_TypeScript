/* eslint-disable camelcase */
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useSetRecoilState } from 'recoil';
import { memoState } from '../store/memoState';
import { axiosInstance } from '../lib/axiosInstance';
import { MemoType } from '../types/memo';

export const useMemoCrud = () => {
  const { loginInstance } = axiosInstance();
  const setMemos = useSetRecoilState<MemoType[]>(memoState);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [readLoading, setReadLoading] = useState<boolean>(false);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  // 何でもメモ一覧取得
  const readMemo = useCallback(() => {
    setReadLoading(true);
    loginInstance
      .get<MemoType[]>('/memos', {})
      .then((res) => {
        toast.success('一覧を取得しました');
        setMemos(res.data);
      })
      .catch(() => {
        toast.success('一覧取得に失敗しました');
      })
      .finally(() => setReadLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 何でもメモ新規登録
  const createMemo = useCallback(
    (title: string, category: string, description: string, date: string, complete: boolean) => {
      setCreateLoading(true);
      loginInstance
        .post<MemoType[]>('/memo', { title, category, description, date, mark_div: Number(complete) })
        .then(() => {
          toast.success('新規登録しました');
          readMemo();
        })
        .catch(() => {
          toast.success('新規登録に失敗しました');
        })
        .finally(() => setCreateLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // 何でもメモ更新
  const upDateMemo = useCallback(
    (id: string, title: string, category: string, description: string, date: string, complete: boolean) => {
      setUpdateLoading(true);
      loginInstance
        .put(`/memo/${id}`, { title, category, description, date, mark_div: Number(complete) })
        .then(() => {
          toast.success('更新しました');
          readMemo();
        })
        .catch(() => {
          toast.success('更新に失敗しました');
        })
        .finally(() => setUpdateLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // 何でもメモ削除
  const deleteMemo = useCallback(
    (id: string) => {
      setDeleteLoading(true);
      loginInstance
        .delete(`/memo/${id}`)
        .then(() => {
          toast.success('削除しました');
          readMemo();
        })
        .catch((e: AxiosError<{ error: string }>) => {
          toast.success('削除に失敗しました');
          console.log(e.message);
        })
        .finally(() => setDeleteLoading(false));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { createMemo, createLoading, readMemo, readLoading, upDateMemo, updateLoading, deleteMemo, deleteLoading };
};
