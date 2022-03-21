import { memo, VFC } from 'react';
import toast from 'react-hot-toast';
import { PrimaryButton } from './button/PrimaryButton';
import { TodoType } from '../types';

type Props = {
  todoList: TodoType[];
  putTodoList: (items: TodoType[]) => void;
};
export const Sort: VFC<Props> = memo((props) => {
  const { todoList, putTodoList } = props;

  const handleSortInput = (target: 'id' | 'limit') => {
    const sortTodoList = [...todoList].sort(
      (a, b) => new Date(a[target]).valueOf() - new Date(b[target]).valueOf(),
    );
    let sortName;
    if (target === 'id') {
      sortName = '入力順';
      toast.success(`${sortName}で並び替えました`);
    } else if (target === 'limit') {
      sortName = '期限順';
      toast.success(`${sortName}で並び替えました`);
    }
    putTodoList(sortTodoList);
  };

  return (
    <div className="mt-2 flex flex-row justify-end">
      <PrimaryButton onClick={() => handleSortInput('id')}>入力順で並び替え</PrimaryButton>
      <PrimaryButton onClick={() => handleSortInput('limit')}>期限順で並び替え</PrimaryButton>
    </div>
  );
});
