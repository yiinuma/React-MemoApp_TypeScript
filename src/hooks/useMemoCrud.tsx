import axios from 'axios';
import { useCallback } from 'react';
import { axiosInstance } from '../lib/axiosInstance';

export const useMemoCrud = () => {
  const { loginInstance } = axiosInstance();

  // 何でもメモ新規登録
  const createMemo = useCallback((title: string, category: string, description: string, date: string, mark_div: number) => {
    loginInstance
      .post('/memo', { title, category, description, date, mark_div })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error.response.data.message));
  }, []);

  // 何でもメモ一覧取得
  const readMemo = useCallback(() => {
    loginInstance
      .get('/memos', {})
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response.data.message));
  }, []);

  return { createMemo, readMemo };
};
