import { memo, VFC } from 'react';
import { RecoilRoot } from 'recoil';

import { InputForm } from './components/InputForm';
import { GetWebApi } from './components/GetWebApi';
import { ClearList } from './components/ClearList';
import { Modal } from './components/Modal';
import { Sort } from './components/Sort';
import { Title } from './components/Title';
import { TodoList } from './components/TodoList';
import { useStorage } from './hooks/useStorage';
import './style.css';
import { ModalProvider } from './components/provider/ModalProvider';

export const Todo: VFC = memo(() => {
  const { todoList, putTodoList, clearTodoList } = useStorage();

  return (
    <RecoilRoot>
      <ModalProvider>
        <div className="min-h-screen bg-gradient-to-l from-green-500 to-green-700 pt-4 pl-4">
          <Title />
          <div className="mt-4 ml-auto mr-auto flex w-[80%] flex-col justify-center">
            <div className="my-4 flex justify-end gap-4">
              <GetWebApi todoList={todoList} putTodoList={putTodoList} />
              <ClearList todoList={todoList} clearTodoList={clearTodoList} />
            </div>
            <InputForm todoList={todoList} putTodoList={putTodoList} />
            <Sort todoList={todoList} putTodoList={putTodoList} />

            <TodoList todoList={todoList} putTodoList={putTodoList} />
          </div>
          <Modal todoList={todoList} putTodoList={putTodoList} />
        </div>
      </ModalProvider>
    </RecoilRoot>
  );
});
