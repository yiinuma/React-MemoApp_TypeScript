import jwtDecode from 'jwt-decode';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { authState } from '../components/store/authState';
import { LoadingState } from '../components/store/loadingState';
import { axiosInstance } from '../lib/axiosInstance';

type AxiosType = {
  access_token: string;
};

type AxiosExpType = {
  id: number;
  iat: number;
  exp: number;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const { loginInstance } = axiosInstance();
  const setAuth = useSetRecoilState<boolean>(authState);
  const setLoading = useSetRecoilState<boolean>(LoadingState);

  const localAuth = localStorage.getItem('auth');
  const localToken = localStorage.getItem('token');
  const localExp = localStorage.getItem('exp');

  useEffect(() => {
    if (!localAuth || !localToken || !localExp) {
      localStorage.setItem('auth', JSON.stringify(false));
      localStorage.setItem('token', JSON.stringify(''));
      localStorage.setItem('exp', JSON.stringify(''));
    }
  }, [localAuth, localExp, localToken]);

  const login = useCallback(
    (email: string, pass: string) => {
      setLoading(true);
      loginInstance
        .post<AxiosType>('login', { email, password: pass })
        .then((res) => {
          const decodedToken = jwtDecode<AxiosExpType>(res.data.access_token);

          setAuth(true);
          localStorage.setItem('auth', JSON.stringify(true));
          localStorage.setItem('token', res.data.access_token);
          localStorage.setItem('exp', JSON.stringify(decodedToken.exp));
          setLoading(false);
          navigate('memo');
          toast.success('ログインに成功しました');
        })
        .catch(() => {
          toast.error('ログインに失敗しました');
        });
    },
    [loginInstance, navigate, setAuth, setLoading]
  );
  return [login];
};
