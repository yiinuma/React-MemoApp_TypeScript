import { ReactNode, VFC } from 'react';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
  children: ReactNode;
};

export const ApiButton: VFC<Props> = (props) => {
  const { onClick, disabled, children } = props;
  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <button onClick={onClick} disabled={disabled} className={`mt-2 h-10 cursor-pointer rounded bg-white px-4 hover:bg-orange-400 ${disabled && ' cursor-not-allowed text-slate-400 hover:bg-white'}`}>
      {children}
    </button>
  );
};
