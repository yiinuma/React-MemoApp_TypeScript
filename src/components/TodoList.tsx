import { memo, useEffect, VFC } from 'react';
import { FaEdit, FaCheck, FaTrashAlt } from 'react-icons/fa';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { editIndexState } from '../store/editIndexState';
import { memoState } from '../store/memoState';
import { useMemoCrud } from '../hooks/useMemoCrud';
import { LoadingState } from '../store/loadingState';
import { modalState } from '../store/modalState';
import { ActionButton } from './button/ActionButton';

export const TodoList: VFC = memo(() => {
  const { readMemo, upDateMemo, deleteMemo } = useMemoCrud();
  const memos = useRecoilValue(memoState);
  const [modal, setModal] = useRecoilState(modalState);
  const setEditIndex = useSetRecoilState(editIndexState);
  const loading = useRecoilValue<boolean>(LoadingState);

  useEffect(() => {
    readMemo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleComplete = (id: string, title: string, category: string, description: string, date: string, complete: boolean) => {
    const completeChange = !complete;
    upDateMemo(id, title, category, description, date, completeChange);
  };

  const handleDelete = (id: string) => {
    deleteMemo(id);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setModal(!modal);
  };

  return (
    <ul className="todo-list mt-8 w-full">
      {loading && (
        <>
          <div className="absolute top-[40%] left-[50%] z-20 translate-x-[-50%]">
            <div className="h-12 w-12 animate-spin rounded-xl bg-blue-300" />
          </div>
          <div className="absolute left-0 right-0 top-0 bottom-0 z-10 bg-slate-50 opacity-70" />
        </>
      )}
      {memos.map((list, index) => (
        <li className={`mb-2 w-full rounded ${list.mark_div ? ' bg-slate-200 opacity-60' : ' bg-white'}`} key={list.id}>
          <div className="ml-auto mr-auto flex w-[100%] flex-col">
            <div className="flex items-center">
              <p className={`break-words py-1 px-4 text-left font-semibold ${list.mark_div && 'line-through'} `}>{list.title}</p>
              {list.category !== '' && <span className="rounded-full bg-slate-100 px-4 py-1 text-sm">{list.category}</span>}
            </div>
            <p className={`break-words py-1 px-4 text-left ${list.mark_div && 'line-through'} `}>{list.description}</p>
            <div className="flex w-full flex-row items-center justify-end rounded border-t border-slate-200 px-4">
              <div className="mt-1">
                <ActionButton bg="bg-blue-300" onClick={() => handleEdit(index)} CustomTag={FaEdit} />
                <ActionButton bg="bg-amber-300" onClick={() => handleComplete(list.id, list.title, list.category, list.description, list.date, Boolean(list.mark_div))} CustomTag={FaCheck} />
                <ActionButton bg="bg-lime-300" onClick={() => handleDelete(list.id)} CustomTag={FaTrashAlt} />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
});
