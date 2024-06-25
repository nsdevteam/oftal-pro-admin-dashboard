import { FC } from 'react';

import { Layout } from '../../components';
import Clients from '../../views/clients';

const ClientsPage: FC = () => (
  <Layout pageTitle="Clients">
    <Clients />
  </Layout>
);

export default ClientsPage;
