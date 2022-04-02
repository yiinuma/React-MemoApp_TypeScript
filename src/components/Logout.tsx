import { VFC } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { PrimaryButton } from './button/PrimaryButton';
import { authState } from './store/authState';

export const Logout: VFC = () => {
  const setAuth = useSetRecoilState<boolean>(authState);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    navigate('/');
    toast.success('ログインアウトしました');
  };

  return (
    <div className="mr-8 mt-2 flex flex-row justify-end">
      <PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
    </div>
  );
};
