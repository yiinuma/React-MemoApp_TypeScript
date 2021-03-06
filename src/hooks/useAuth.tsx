import jwtDecode from 'jwt-decode';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../store/authState';
import { axiosInstance } from '../lib/axiosInstance';

type AxiosType = {
  access_token: string;
};

type AxiosExpType = {
  id: number;
  iat: number;
  exp: number;
};

export const useAuth = () => {
  const navigate = useNavigate();
  const { loginInstance } = axiosInstance();
  const setAuth = useSetRecoilState<boolean>(authState);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  useEffect(() => {
    const localAuth = localStorage.getItem('auth');
    const localToken = localStorage.getItem('token');
    const localExp = localStorage.getItem('exp');
    if (!localAuth || !localToken || !localExp) {
      localStorage.setItem('auth', JSON.stringify(false));
      localStorage.setItem('token', JSON.stringify(''));
      localStorage.setItem('exp', JSON.stringify(''));
    }
  }, []);

  const login = useCallback(
    (email: string, pass: string) => {
      setLoginLoading(true);
      loginInstance
        .post<AxiosType>('login', { email, password: pass })
        .then((res) => {
          const decodedToken = jwtDecode<AxiosExpType>(res.data.access_token);

          localStorage.setItem('auth', JSON.stringify(true));
          localStorage.setItem('token', res.data.access_token);
          localStorage.setItem('exp', JSON.stringify(decodedToken.exp));
          navigate('memo');
          toast.success('ログインに成功しました');
        })
        .catch(() => {
          toast.error('ログインに失敗しました');
        })
        .finally(() => setLoginLoading(false));
    },
    [loginInstance, navigate]
  );

  const logout = useCallback(() => {
    setAuth(false);
    localStorage.removeItem('token');
    localStorage.removeItem('exp');
    localStorage.setItem('auth', JSON.stringify(false));
    navigate('/');
    toast.success('ログインアウトしました');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setAuth]);

  return { login, logout, loginLoading };
};
