import { useState, useEffect } from 'react';
import { TodoType } from '../types/index';

const STORAGE_KEY = 'my-todo';

export const useStorage = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    } else {
      const setNewTodo = JSON.parse(data) as TodoType[];
      setTodoList(setNewTodo);
      // setTodoList(JSON.parse(data))
    }
  }, []);

  const putTodoList = (items: TodoType[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setTodoList(items);
  };

  const clearTodoList = (): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    setTodoList([]);
  };

  return { todoList, putTodoList, clearTodoList };
};
