import { FC, memo, ReactNode } from 'react';

type Props = {
  readonly children: ReactNode;
};

export const Layout: FC<Props> = memo((props) => {
  const { children } = props;
  return <div className="min-h-screen bg-gradient-to-l from-slate-500 to-slate-700 px-4 pt-4">{children}</div>;
});
