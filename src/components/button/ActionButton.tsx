import { VFC } from 'react';
import { IconType } from 'react-icons/lib';
import { useRecoilValue } from 'recoil';
import { LoadingState } from '../../store/loadingState';

type Props = {
  index: number;
  bg: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  CustomTag: IconType;
};

export const ActionButton: VFC<Props> = (props) => {
  const { bg, onClick, CustomTag } = props;
  const loading = useRecoilValue<boolean>(LoadingState);

  return (
    <button onClick={onClick} className={`${bg} relative ml-4 px-4 py-1`} disabled={loading}>
      <i className="pointer-events-none">
        <CustomTag />
      </i>
    </button>
  );
};
