import { FC } from 'react';

import { Layout } from '../../components';
import Clients from '../../views/clients';

const ClientsPage: FC = () => (
  <Layout pageTitle="Pedidos">
    <Clients />
  </Layout>
);

export default ClientsPage;
