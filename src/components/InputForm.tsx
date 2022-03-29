import { memo, useState, VFC } from 'react';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

import { useMemoCrud } from '../hooks/useMemoCrud';

export const InputForm: VFC = memo(() => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { readMemo, createMemo } = useMemoCrud();

  const getInputDay = () => {
    const inputDay = dayjs().format('YYYY/MM/DD');
    return inputDay;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const date = getInputDay();
    const complete = false;
    readMemo();
    createMemo(title, category, description, date, complete);
    toast.success(`Todoを登録しました`);
    setTitle('');
    setCategory('');
    setDescription('');
    setSubmitDisabled(true);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row items-end justify-center text-white">
      <div className="block grow">
        新規Todo
        <input
          type="text"
          placeholder="タイトルを入力"
          className="text-m placeholder-blueGray-300 h-10 w-full rounded border-0 px-2 text-gray-600 shadow outline-none focus:outline-none focus:ring"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setSubmitDisabled(title === '' && category === '' && description === '');
          }}
        />
      </div>
      <div className="ml-2 block">
        カテゴリー
        <input
          type="text"
          placeholder="カテゴリー"
          className="text-m placeholder-blueGray-300 h-10 w-full rounded border-0 bg-white px-2 text-gray-600 shadow outline-none focus:outline-none focus:ring"
          required
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setSubmitDisabled(title === '' && category === '' && description === '');
          }}
        />
      </div>
      <div className="ml-2 block">
        内容
        <input
          type="text"
          placeholder="内容"
          className="text-m placeholder-blueGray-300 h-10 w-full rounded border-0 bg-white px-2 text-gray-600 shadow outline-none focus:outline-none focus:ring"
          required
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setSubmitDisabled(title === '' && category === '' && description === '');
          }}
        />
      </div>

      <input id="submit" type="submit" className={submitDisabled ? `submit-disabled` : `submit-enabled`} value="登録" />
    </form>
  );
});
