import axios, { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { TodoType, UserType } from '../types';

export const useGetUserData = () => {
  const [userData, setUserData] = useState<TodoType[]>([]);

  const getLimitDay = useCallback(() => {
    const limitDay = dayjs().format('YYYY-MM-DD');
    return limitDay;
  }, []);

  const getUserData = useCallback(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?userId=1')
      .then((res: AxiosResponse<UserType[]>) => {
        const newArray = [...res.data];
        const apiTodoList: TodoType[] = newArray.map((list) => ({
          id: list.id,
          text: list.title,
          limit: getLimitDay(),
          complete: list.completed,
        }));
        setUserData(apiTodoList);
        toast.success('dataを取得しました');
      })

      .catch(() => {
        toast.error('dataを取得できませんでした');
        setUserData([]);
      });
  }, [getLimitDay]);

  return { userData, getUserData };
};
