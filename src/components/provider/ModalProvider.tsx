import { createContext, useState } from 'react';

export const ModalContext = createContext(
  {} as {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
  },
);

export function ModalProvider(props: { children: React.ReactNode }) {
  const { children } = props;
  const [modal, setModal] = useState(false);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <ModalContext.Provider value={{ modal, setModal }}>{children}</ModalContext.Provider>;
}
