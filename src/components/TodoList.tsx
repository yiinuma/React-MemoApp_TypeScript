import dayjs from 'dayjs';
import { memo, useContext, useEffect, useState, VFC } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaCheck, FaTrashAlt } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ModalContext } from './provider/ModalProvider';
import { editIndexState } from './store/editIndexState';
import { TodoType } from '../types';
import { memoState } from './store/memoState';
import { useMemoCrud } from '../hooks/useMemoCrud';
import { LoadingState } from './store/loadingState';

// type Props = {
//   todoList: TodoType[];
//   putTodoList: (items: TodoType[]) => void;
// };

export const TodoList: VFC = memo(() => {
  const { readMemo, upDateMemo } = useMemoCrud();

  const memoList = useRecoilValue(memoState);
  const { modal, setModal } = useContext(ModalContext);
  const setEditIndex = useSetRecoilState(editIndexState);
  const Loading = useRecoilValue<boolean>(LoadingState);

  console.log(memoList);

  useEffect(() => {
    readMemo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const checkLimit = (todoLimit: string) => {
  //   const keepTheDeliveryDate = dayjs(todoLimit).isAfter(dayjs());
  //   return keepTheDeliveryDate;
  // };

  const handleComplete = (id: string, title: string, category: string, description: string, date: string, complete: boolean) => {
    const completeChange = !complete;
    console.log(id, title, completeChange);
    upDateMemo(id, title, category, description, date, completeChange);
  };

  // const handleDelete = (id: string | number) => {
  //   putTodoList(todoList.filter((todo) => todo.id !== id));
  //   toast('Todoを削除しました', { icon: <FaTrashAlt /> });
  // };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setModal(!modal);
  };

  return (
    <ul className="todo-list mt-8 w-full">
      {Loading && (
        <>
          <div className="absolute top-[40%] left-[50%] z-20 translate-x-[-50%]">
            <div className="h-12 w-12 animate-spin rounded-xl bg-blue-300" />
          </div>
          <div className="absolute left-0 right-0 top-0 bottom-0 z-10 bg-slate-50 opacity-70" />
        </>
      )}
      {memoList.map((list, index) => (
        <li className={`todo-item ${list.mark_div ? 'bg-slate-200 opacity-60' : ''}`} key={list.id}>
          <div className="todo-div">
            <p className="todo-todo">{list.title}</p>
            <p className="todo-todo">{list.description}</p>
            <div className="todo-task">
              {/* <p className="todo-date">
                期限:{list.limit}
                {checkLimit(list.limit) ? '' : <span className="limit-over">期限が過ぎています！！</span>}
              </p> */}
              <div>
                <button onClick={() => handleEdit(index)} className="bg-blue-300 px-4 py-1">
                  <i className="pointer-events-none">
                    <FaEdit />
                  </i>
                </button>
                <button onClick={() => handleComplete(list.id, list.title, list.category, list.description, list.date, Boolean(list.mark_div))} className="ml-4 bg-amber-300 px-4 py-1">
                  <i className="pointer-events-none">
                    <FaCheck />
                  </i>
                </button>
                {/* <button onClick={() => handleDelete(list.id)} className="ml-4 bg-lime-300 px-4 py-1"> */}
                <i className="pointer-events-none">
                  <FaTrashAlt />
                </i>
                {/* </button> */}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
});
