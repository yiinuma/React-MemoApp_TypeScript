import { memo, useState, VFC } from 'react';
import dayjs from 'dayjs';

import { useMemoCrud } from '../hooks/useMemoCrud';

export const InputForm: VFC = memo(() => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const { createMemo } = useMemoCrud();

  const getInputDay = () => {
    const inputDay = dayjs().format('YYYY/MM/DD');
    return inputDay;
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const date = getInputDay();
    const complete = false;
    createMemo(title, category, description, date, complete);
    setTitle('');
    setCategory('');
    setDescription('');
    setSubmitDisabled(true);
  };

  return (
    <form className="flex flex-row items-end justify-center gap-2 text-white">
      <div className="w-5/12">
        <label htmlFor="title">
          Title
          <br />
          <input
            id="title"
            type="text"
            className="text-m placeholder-blueGray-300 min-h-[40px] w-full rounded border-0 px-2 text-gray-600 shadow outline-none focus:outline-none focus:ring"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSubmitDisabled(false);
            }}
          />
        </label>
      </div>
      <div className="w-2/12">
        <label htmlFor="title">
          Category
          <br />
          <input
            type="text"
            className="text-m placeholder-blueGray-300 h-10 w-full rounded border-0 bg-white px-2 text-gray-600 shadow outline-none focus:outline-none focus:ring"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubmitDisabled(false);
            }}
          />
        </label>
      </div>
      <div className="w-5/12">
        <label htmlFor="title">
          Description
          <br />
          <input
            type="text"
            placeholder=""
            className="text-m placeholder-blueGray-300 h-10 w-full rounded border-0 bg-white px-2 text-gray-600 shadow outline-none focus:outline-none focus:ring"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setSubmitDisabled(false);
            }}
          />
        </label>
      </div>

      <button id="submit" type="button" className={submitDisabled ? `submit-disabled` : `submit-enabled`} onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
});
