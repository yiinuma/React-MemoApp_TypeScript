import { Route, Routes } from 'react-router-dom';
import { VFC } from 'react';

import { Login } from '../pages/Login';
import { Memo } from '../pages/Memo';
import { Page404 } from '../pages/Page404';
import { AuthenticatedGuard } from './AuthenticatedGuard';

export const Router: VFC = () => (
  <Routes>
    <Route path="/" element={<Login />} />

    <Route
      path="/memo"
      element={
        <AuthenticatedGuard>
          <Memo />
        </AuthenticatedGuard>
      }
    />
    <Route path="*" element={<Page404 />} />
  </Routes>
);
