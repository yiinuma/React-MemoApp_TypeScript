import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../components/store/authState';
import { axiosInstance } from '../lib/axiosInstance';

type AxiosType = {
  access_token: string;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { loginInstance } = axiosInstance();
  const setAuth = useSetRecoilState<boolean>(authState);
  const localAuth = localStorage.getItem('auth');
  const localToken = localStorage.getItem('token');

  useEffect(() => {
    if (!localAuth || !localToken) {
      localStorage.setItem('auth', JSON.stringify(false));
      localStorage.setItem('token', JSON.stringify(''));
    }
  }, [localAuth, localToken]);

  const login = useCallback(
    (email: string, pass: string) => {
      loginInstance
        .post<AxiosType>('login', { email, password: pass })
        .then((res) => {
          setAuth(true);
          localStorage.setItem('auth', JSON.stringify(true));
          localStorage.setItem('token', res.data.access_token);
          toast.success('ログインに成功しました');
          navigate('memo');
        })
        .catch(() => {
          toast.error('ログインに失敗しました');
        });
    },
    [loginInstance, navigate, setAuth]
  );
  return [login];
};
