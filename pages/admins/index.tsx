import { FC } from 'react';

import { Layout } from '../../components';
import Admins from '../../views/admins';

const AdminsPage: FC = () => (
  <Layout pageTitle="Pedidos">
    <Admins />
  </Layout>
);

export default AdminsPage;
