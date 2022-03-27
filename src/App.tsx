import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Router } from './router/Router';
import './style.css';
import { RecoilRoot } from 'recoil';

export function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Router />
      </BrowserRouter>
    </RecoilRoot>
  );
}
