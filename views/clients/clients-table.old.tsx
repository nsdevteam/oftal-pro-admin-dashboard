import { FC } from 'react';

import { Box, Table, Typography } from '../../elements';
import { TRowData } from '../../interface';
import { ClientTableProps } from './clients.types';

const HEADINGS: Record<string, string> = {
  clientId: 'ID',
  fullName: 'Nome',
  email: 'Email',
  lastLoginAt: 'Último login',
  option: 'Opções',
};

const ClientsTable: FC<ClientTableProps> = ({ data, setSelectedDoc }) => (
  <Box width="100%">
    <Typography as="h2">Listagem de Clientes</Typography>
    <Table
      columns={HEADINGS}
      special={{ lastLoginAt: 'date' }}
      data={data as unknown as TRowData}
      onSelect={(index) => setSelectedDoc(data[index])}
    />
  </Box>
);

export default ClientsTable;
