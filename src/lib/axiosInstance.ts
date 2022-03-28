import axios from 'axios';

export const axiosInstance = () => {
  const token = localStorage.getItem('token');
  // if (!token) return null;

  const loginInstance = axios.create({
    baseURL: 'https://raisetech-memo-api.herokuapp.com/api',
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    headers: { Authorization: `Bearer ${token}` },
  });

  return { loginInstance };
};
