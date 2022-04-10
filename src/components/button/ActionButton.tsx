import { VFC } from 'react';
import { IconType } from 'react-icons/lib';

type Props = {
  index: number;
  bg: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  CustomTag: IconType;
  disable: boolean;
};

export const ActionButton: VFC<Props> = (props) => {
  const { bg, onClick, CustomTag, disable } = props;

  return (
    <button onClick={onClick} className={`${bg} relative ml-4 px-4 py-1`} disabled={disable}>
      <i className="pointer-events-none">
        <CustomTag />
      </i>
    </button>
  );
};
