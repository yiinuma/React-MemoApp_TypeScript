import { ReactNode, VFC } from 'react';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};
// eslint-disable-next-line react/function-component-definition
export const PrimaryButton: VFC<Props> = (props) => {
  const { onClick, children } = props;
  return (
    <button onClick={onClick} className="mt-2 ml-8 h-10 rounded bg-white px-4 hover:bg-orange-400">
      {children}
    </button>
  );
};
