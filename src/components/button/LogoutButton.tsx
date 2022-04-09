import { VFC } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PrimaryButton } from './PrimaryButton';

export const LogoutButton: VFC = () => {
  const { logout } = useAuth();

  return (
    <div className="mr-8 mt-2 flex flex-row justify-end">
      <PrimaryButton onClick={logout}>Logout</PrimaryButton>
    </div>
  );
};
