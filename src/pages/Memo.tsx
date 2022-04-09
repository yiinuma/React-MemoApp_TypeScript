import { memo, VFC } from 'react';
import { RecoilRoot } from 'recoil';
import { LogoutButton } from '../components/button/LogoutButton';

import { InputForm } from '../components/InputForm';
import { Layout } from '../components/Layout/Layout';
import { MainLayout } from '../components/Layout/MainLayout';
import { Modal } from '../components/Modal';
import { Title } from '../components/Title';
import { TodoList } from '../components/TodoList';
import '../style.css';

export const Memo: VFC = memo(() => (
  <RecoilRoot>
    <Layout>
      <LogoutButton />
      <MainLayout>
        <Title />
        <InputForm />
        <TodoList />
        <Modal />
      </MainLayout>
    </Layout>
  </RecoilRoot>
));
