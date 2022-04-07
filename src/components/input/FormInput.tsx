import { VFC } from 'react';

type Props = {
  id: string;
  required: boolean;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const FormInput: VFC<Props> = (props) => {
  const { id, type, value, onChange, required } = props;
  return (
    <input
      id={id}
      required={required}
      type={type}
      value={value}
      onChange={onChange}
      className="text-m placeholder-blueGray-300 h-10 min-h-[40px] w-full rounded border-0 px-2 text-gray-600 shadow outline-none focus:outline-none focus:ring"
    />
  );
};
