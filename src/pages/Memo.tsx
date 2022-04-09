import { memo, VFC } from 'react';
import { RecoilRoot } from 'recoil';
import { LogoutButton } from '../components/button/LogoutButton';

import { InputForm } from '../components/InputForm';
import { Modal } from '../components/Modal';
import { Title } from '../components/Title';
import { TodoList } from '../components/TodoList';
import '../style.css';

export const Memo: VFC = memo(() => (
  <RecoilRoot>
    <div className="min-h-screen bg-gradient-to-l from-slate-500 to-slate-700 px-4 pt-4">
      <LogoutButton />
      <Title />
      <div className="mt-8 ml-auto mr-auto flex w-[80%] flex-col justify-center">
        <InputForm />
        <TodoList />
      </div>
      <Modal />
    </div>
  </RecoilRoot>
));
