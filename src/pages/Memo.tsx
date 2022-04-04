import { memo, VFC } from 'react';
import { RecoilRoot } from 'recoil';

import { InputForm } from '../components/InputForm';
import { Modal } from '../components/Modal';
import { Title } from '../components/Title';
import { TodoList } from '../components/TodoList';
import '../style.css';
import { ModalProvider } from '../components/provider/ModalProvider';
import { Logout } from '../components/Logout';

export const Memo: VFC = memo(() => (
  <RecoilRoot>
    <ModalProvider>
      <div className="min-h-screen bg-gradient-to-l from-green-500 to-green-700 px-4 pt-4">
        <Logout />
        <Title />
        <div className="mt-8 ml-auto mr-auto flex w-[80%] flex-col justify-center">
          <InputForm />
          <TodoList />
        </div>
        <Modal />
      </div>
    </ModalProvider>
  </RecoilRoot>
));
