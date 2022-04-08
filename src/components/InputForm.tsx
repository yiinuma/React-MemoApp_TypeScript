import { memo, useState, VFC } from 'react';
import dayjs from 'dayjs';

import { useMemoCrud } from '../hooks/useMemoCrud';
import { FormInput } from './input/FormInput';
import { InputField } from './InputField';

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
        <InputField htmlFor="title" label="Title">
          <br />
          <FormInput
            id="title"
            required
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSubmitDisabled(false);
            }}
          />
        </InputField>
      </div>
      <div className="w-2/12">
        <InputField htmlFor="category" label="Category">
          <br />
          <FormInput
            id="category"
            required={false}
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubmitDisabled(false);
            }}
          />
        </InputField>
      </div>
      <div className="w-5/12">
        <InputField htmlFor="description" label="Description">
          <br />
          <FormInput
            id="description"
            required={false}
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setSubmitDisabled(false);
            }}
          />
        </InputField>
      </div>

      <button
        id="submit"
        type="button"
        className={`ml-2 h-10 min-w-fit rounded px-4 py-2 ${title === '' || submitDisabled ? 'bg-slate-300' : 'bg-orange-400 hover:bg-orange-500'}`}
        onClick={handleSubmit}
        disabled={title === ''}
      >
        Submit
      </button>
    </form>
  );
});
