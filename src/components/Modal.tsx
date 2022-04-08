import { memo, useContext, useEffect, useState, VFC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useMemoCrud } from '../hooks/useMemoCrud';
import { ModalContext } from './provider/ModalProvider';
import { memoState } from '../store/memoState';
import { editIndexState } from '../store/editIndexState';

export const Modal: VFC = memo(() => {
  const memos = useRecoilValue(memoState);
  const { upDateMemo } = useMemoCrud();

  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const { modal, setModal } = useContext(ModalContext);
  const [editIndex, setEditIndex] = useRecoilState(editIndexState);
  console.log(modal);
  useEffect(() => {
    if (editIndex !== null) {
      setEditTitle(memos[editIndex].title);
      setEditCategory(memos[editIndex].category);
      setEditDescription(memos[editIndex].description);
    }
  }, [editIndex, memos]);

  const editClear = () => {
    setModal(false);
    setEditTitle('');
    setEditCategory('');
    setEditDescription('');
    setEditIndex(null);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (editIndex === null) return;
    upDateMemo(memos[editIndex].id, editTitle, editCategory, editDescription, memos[editIndex].date, Boolean(memos[editIndex].mark_div));
    editClear();
  };

  return (
    <div
      id="modal"
      className={`fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-slate-500 bg-opacity-75 antialiased opacity-0 transition duration-300 ease-in-out ${
        modal ? ' visible opacity-100' : 'invisible'
      }`}
    >
      <input onClick={editClear} className="modal-bg absolute top-0 left-0 z-10 h-full w-full opacity-0" />
      <div className="z-20 mx-auto flex w-11/12 max-w-2xl flex-col rounded-lg border border-gray-300 shadow-xl sm:w-5/6 lg:w-1/2">
        <div className="flex flex-row justify-between rounded-tl-lg rounded-tr-lg border-b border-gray-200 bg-white p-6">
          <p className="font-semibold text-gray-800">Memo 編集</p>
          <button onClick={editClear} className="modal-close">
            <svg className="pointer-events-none h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12">
                {' '}
              </path>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <div className="flex flex-col bg-gray-50 px-6 pt-4">
              <div className="mb-2 font-semibold text-gray-700">
                Title
                <textarea
                  value={editTitle}
                  onChange={(e) => {
                    setEditTitle(e.target.value);
                  }}
                  className="text-m placeholder-blueGray-300 w-full rounded border-0 px-2 text-gray-600 shadow outline-none focus:outline-none focus:ring"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col bg-gray-50 px-6 pt-4">
              <div className="mb-2 font-semibold text-gray-700">
                Category
                <input
                  value={editCategory}
                  onChange={(e) => {
                    setEditCategory(e.target.value);
                  }}
                  className="text-m placeholder-blueGray-300 w-full rounded border-0 px-2 text-gray-600 shadow outline-none focus:outline-none focus:ring"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col bg-gray-50 px-6 pt-4">
              <div className="mb-2 font-semibold text-gray-700">
                Description
                <textarea
                  value={editDescription}
                  onChange={(e) => {
                    setEditDescription(e.target.value);
                  }}
                  className="text-m placeholder-blueGray-300 w-full rounded border-0 px-2 text-gray-600 shadow outline-none focus:outline-none focus:ring"
                  required
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between rounded-bl-lg rounded-br-lg border-t border-gray-200 bg-white p-5">
            <input
              onClick={() => {
                setEditTitle('');
                setEditCategory('');
                setEditDescription('');
              }}
              type="button"
              value="クリア"
              className="rounded bg-slate-400 px-4 py-2 font-semibold text-white"
            />

            <input type="submit" value="保存" className="rounded bg-blue-500 px-4 py-2 font-semibold text-white" />
          </div>
        </form>
      </div>
    </div>
  );
});
