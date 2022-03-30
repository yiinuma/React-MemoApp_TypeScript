import { memo, VFC } from 'react';
import { RecoilRoot } from 'recoil';

import { InputForm } from '../components/InputForm';
import { Modal } from '../components/Modal';
import { Title } from '../components/Title';
import { TodoList } from '../components/TodoList';
import { useStorage } from '../hooks/useStorage';
import '../style.css';
import { ModalProvider } from '../components/provider/ModalProvider';

export const Memo: VFC = memo(() => {
  const { todoList, putTodoList } = useStorage();

  return (
    <RecoilRoot>
      <ModalProvider>
        <div className="min-h-screen bg-gradient-to-l from-green-500 to-green-700 pt-4 pl-4">
          <Title />
          <div className="mt-8 ml-auto mr-auto flex w-[80%] flex-col justify-center">
            <InputForm />
            <TodoList todoList={todoList} putTodoList={putTodoList} />
          </div>
          <Modal todoList={todoList} putTodoList={putTodoList} />
        </div>
      </ModalProvider>
    </RecoilRoot>
  );
});
