import { ChangeEventHandler, useEffect, useState, VFC } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../components/store/authState';
import { LoadingState } from '../components/store/loadingState';
import { useLogin } from '../hooks/useLogin';

export const Login: VFC = () => {
  const [email, setEMail] = useState('');
  const [pass, setPass] = useState('');
  const [login] = useLogin();
  const localExp = Number(localStorage.getItem('exp'));
  const localAuth = localStorage.getItem('auth');
  const [auth, setAuth] = useRecoilState<boolean>(authState);
  const loading = useRecoilValue<boolean>(LoadingState);
  const navigate = useNavigate();

  useEffect(() => {
    if (localExp >= new Date().getTime() / 1000 && localAuth) {
      const exp = new Date(localExp * 1000);
      setAuth(true);

      if (auth) {
        navigate('memo');
        toast.success('ログインに成功しました');
        console.log('セッション有効期限', exp);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEMail(e.target.value);
  };
  const handlePassChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPass(e.target.value);
  };

  return (
    <figure className="flex h-screen bg-gray-100">
      <div className="border-primaryBorder relative m-auto w-full max-w-md rounded-lg border bg-white py-10 px-1 shadow-lg">
        {loading && (
          <>
            <div className="absolute top-[40%] left-[50%] z-20 translate-x-[-50%]">
              <div className="h-12 w-12 animate-spin rounded-xl bg-blue-300" />
            </div>
            <div className="absolute left-0 right-0 top-0 bottom-0 z-10 bg-slate-50 opacity-70" />
          </>
        )}
        <blockquote className="text-center text-2xl font-medium">
          <p className="text-lg font-semibold">Welcome to Memo-App</p>
        </blockquote>

        <div className="text-primary my-4 mx-6">
          <div className="mt-3 flex items-center justify-center">
            <h1 className="text-primary mt-2 mb-4 text-2xl font-medium">Login to your account</h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(email, pass);
            }}
          >
            <label htmlFor="email" className="text-left">
              Email:
              <input
                id="email"
                required
                type="mail"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email Address"
                className="text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out"
              />
            </label>
            <label htmlFor="password">
              Password:
              <input
                id="password"
                required
                type="password"
                value={pass}
                onChange={handlePassChange}
                placeholder="Password"
                className="text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out"
              />
            </label>
            <div className="mt-4 flex items-center justify-center">
              <button className="text-md border-blue rounded border bg-blue-700 py-2 px-4 text-white hover:bg-blue-500 focus:border-black focus:outline-none" value="Login">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </figure>
  );
};
