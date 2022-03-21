import dayjs from 'dayjs';
import { memo, useContext, VFC } from 'react';
import toast from 'react-hot-toast';
import { FaEdit, FaCheck, FaTrashAlt } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import { ModalContext } from './provider/ModalProvider';
import { editIndexState } from './store/editIndexState';
import { TodoType } from '../types';

type Props = {
  todoList: TodoType[];
  putTodoList: (items: TodoType[]) => void;
};

export const TodoList: VFC<Props> = memo((props) => {
  const { todoList, putTodoList } = props;

  const { modal, setModal } = useContext(ModalContext);
  const setEditIndex = useSetRecoilState(editIndexState);

  const checkLimit = (todoLimit: string) => {
    const keepTheDeliveryDate = dayjs(todoLimit).isAfter(dayjs());
    return keepTheDeliveryDate;
  };

  const handleComplete = (id: string | number) => {
    putTodoList(
      todoList.map((list) => {
        if (id === list.id) {
          return {
            ...list,
            complete: !list.complete,
          };
        }
        return list;
      }),
    );
  };

  const handleDelete = (id: string | number) => {
    putTodoList(todoList.filter((todo) => todo.id !== id));
    toast('Todoを削除しました', { icon: <FaTrashAlt /> });
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setModal(!modal);
  };

  return (
    <ul className="todo-list mt-8 w-full">
      {todoList.map((list, index) => (
        <li
          className={`todo-item ${list.complete ? 'completed' : ''}`}
          key={list.id}
          data-limit={checkLimit(list.limit)}
        >
          <div className="todo-div">
            <p className="todo-todo">{list.text}</p>
            <div className="todo-task">
              <p className="todo-date">
                期限:{list.limit}
                {checkLimit(list.limit) ? (
                  ''
                ) : (
                  <span className="limit-over">期限が過ぎています！！</span>
                )}
              </p>
              <div>
                <button onClick={() => handleEdit(index)} className="edit-btn">
                  <i className="pointer-events-none">
                    <FaEdit />
                  </i>
                </button>
                <button onClick={() => handleComplete(list.id)} className="complete-btn">
                  <i className="pointer-events-none">
                    <FaCheck />
                  </i>
                </button>
                <button onClick={() => handleDelete(list.id)} className="trash-btn">
                  <i className="pointer-events-none">
                    <FaTrashAlt />
                  </i>
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
});
