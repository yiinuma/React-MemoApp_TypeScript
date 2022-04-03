import dayjs from 'dayjs';
import { memo, useContext, useEffect, VFC } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaCheck, FaTrashAlt } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ModalContext } from './provider/ModalProvider';
import { editIndexState } from './store/editIndexState';
import { TodoType } from '../types';
import { memoState } from './store/memoState';
import { useMemoCrud } from '../hooks/useMemoCrud';

// type Props = {
//   todoList: TodoType[];
//   putTodoList: (items: TodoType[]) => void;
// };

export const TodoList: VFC = memo(() => {
  const { readMemo } = useMemoCrud();

  const memoList = useRecoilValue(memoState);
  const { modal, setModal } = useContext(ModalContext);
  const setEditIndex = useSetRecoilState(editIndexState);
  console.log(memoList);

  useEffect(() => {
    readMemo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const checkLimit = (todoLimit: string) => {
  //   const keepTheDeliveryDate = dayjs(todoLimit).isAfter(dayjs());
  //   return keepTheDeliveryDate;
  // };

  // const handleComplete = (id: string | number) => {
  //   putTodoList(
  //     todoList.map((list) => {
  //       if (id === list.id) {
  //         return {
  //           ...list,
  //           complete: !list.complete,
  //         };
  //       }
  //       return list;
  //     })
  //   );
  // };

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
      {memoList.map((list, index) => (
        <li className={`todo-item ${list.mark_div ? 'completed' : ''}`} key={list.id}>
          <div className="todo-div">
            <p className="todo-todo">{list.title}</p>
            <div className="todo-task">
              {/* <p className="todo-date">
                期限:{list.limit}
                {checkLimit(list.limit) ? '' : <span className="limit-over">期限が過ぎています！！</span>}
              </p> */}
              <div>
                <button onClick={() => handleEdit(index)} className="edit-btn">
                  <i className="pointer-events-none">
                    <FaEdit />
                  </i>
                </button>
                {/* <button onClick={() => handleComplete(list.mark_div)} className="complete-btn"> */}
                <i className="pointer-events-none">
                  <FaCheck />
                </i>
                {/* </button> */}
                {/* <button onClick={() => handleDelete(list.id)} className="trash-btn"> */}
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
