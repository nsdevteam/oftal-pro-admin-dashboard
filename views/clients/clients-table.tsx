import { FC } from 'react';

import { Box, Table, Typography } from '../../elements';
import { IClient, TRowData } from '../../interface';

const HEADINGS: Record<string, string> = {
  clientId: 'ID',
  fullName: 'Nome',
  email: 'Email',
  lastLoginAt: 'Último login',
};

const OrderTable: FC<{ data: ReadonlyArray<IClient> }> = ({ data }) => (
  <Box width="100%">
    <Typography as="h2">Listagem de pedidos</Typography>
    <Table
      columns={HEADINGS}
      special={{ lastLoginAt: 'date' }}
      data={data as unknown as TRowData}
    />
  </Box>
);

export default OrderTable;