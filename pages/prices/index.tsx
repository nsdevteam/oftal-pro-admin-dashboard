import { FC } from 'react';

import { Layout } from '../../components';
import Prices from '../../views/prices';

const PricesPage: FC = () => (
  <Layout pageTitle="Preços">
    <Prices />
  </Layout>
);

export default PricesPage;
