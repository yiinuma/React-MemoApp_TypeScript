import { VFC } from 'react';

type Props = {
  id: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeHolder: string;
};

export const LoginInput: VFC<Props> = (props) => {
  const { id, type, value, onChange, placeHolder } = props;
  return (
    <input
      id={id}
      required
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeHolder}
      className="text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out"
    />
  );
};
