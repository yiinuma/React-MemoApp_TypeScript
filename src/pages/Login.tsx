import { ChangeEventHandler, useState, VFC } from 'react';
import { useLogin } from '../hooks/useLogin';

export const Login: VFC = () => {
  const [email, setEMail] = useState('');
  const [pass, setPass] = useState('');
  const [login] = useLogin();

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEMail(e.target.value);
  };
  const handlePassChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPass(e.target.value);
  };

  return (
    <figure className="flex h-screen bg-gray-100">
      <div className="border-primaryBorder m-auto w-full max-w-md rounded-lg border bg-white py-10 px-1 shadow-lg">
        <blockquote className="text-center text-2xl font-medium">
          <p className="text-lg font-semibold">Welcome to Memo-App</p>
        </blockquote>

        <div className="text-primary my-4 mx-6">
          <div className="mt-3 flex items-center justify-center">
            <h1 className="text-primary mt-2 mb-4 text-2xl font-medium">Login to your account</h1>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(email, pass);
            }}
          >
            <label className="text-left">Email:</label>
            <input
              required
              name="email"
              type="mail"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email Address"
              className={'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'}
            />
            <label>Password:</label>
            <input
              required
              name="password"
              type="password"
              value={pass}
              onChange={handlePassChange}
              placeholder="Password"
              className={'text-primary mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out'}
            />
            <div className="mt-4 flex items-center justify-center">
              <button className={'text-md border-blue rounded border bg-blue-700 py-2 px-4 text-white hover:bg-blue-500 focus:border-black focus:outline-none'} value="Login">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </figure>
  );
};
