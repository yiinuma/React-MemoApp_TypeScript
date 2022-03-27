import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../components/store/authState';
import { axiosInstance } from '../lib/axiosInstance';

export const useLogin = () => {
  const navigate = useNavigate();
  const { loginInstance } = axiosInstance();
  const setAuth = useSetRecoilState<boolean>(authState);

  const login = useCallback((email: string, pass: string) => {
    loginInstance
      .post('login', { email: email, password: pass })
      .then(() => {
        setAuth(true);
        toast.success('ログインに成功しました');
        navigate('memo');
      })
      .catch(() => {
        toast.error('ログインに失敗しました');
      });
  }, []);
  return [login];
};
