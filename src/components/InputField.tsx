import { ReactNode, FC } from 'react';

type Props = {
  htmlFor: string;
  label: string;
  children: ReactNode;
};

export const InputField: FC<Props> = (props) => {
  const { htmlFor, label, children } = props;
  return (
    <label htmlFor={htmlFor} className="text-left font-semibold">
      {label}
      {children}
    </label>
  );
};
