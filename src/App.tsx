import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Router } from './router/Router';
import './style.css';

export function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Router />
      </BrowserRouter>
    </RecoilRoot>
  );
}
