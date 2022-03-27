import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authState } from '../components/store/authState';

export const AuthenticatedGuard: FC = ({ children }) => {
  const auth = useRecoilValue(authState);

  const location = useLocation();

  return auth ? <>{children}</> : <Navigate to="/" replace={false} state={{ from: location }} />;
};
