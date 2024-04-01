import { FC } from 'react';

import { Box, Table, Typography } from '../../elements';
import { IAdmin, TRowData } from '../../interface';

const HEADINGS: Record<string, string> = {
  fullName: 'Nome',
  email: 'Email',
  lastLoginAt: 'Último login',
};

const AdminTable: FC<{ data: ReadonlyArray<IAdmin> }> = ({ data }) => (
  <Box width="100%">
    <Typography as="h2">Listagem de administrador</Typography>
    <Table
      columns={HEADINGS}
      special={{ lastLoginAt: 'date' }}
      data={data as unknown as TRowData}
    />
  </Box>
);

export default AdminTable;
