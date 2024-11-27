import { FC } from 'react';

import { Box, Table, Typography } from '../../elements';
import { TRowData } from '../../interface';
import { PriceTableProps } from './prices.types';

const HEADINGS: Record<string, string> = {
  name: 'Nome',
  description: 'Descrição',
};

const PriceTable: FC<PriceTableProps> = ({ data, setSelectedDoc }) => (
  <Box width="100%">
    <Typography as="h2">Listagem de Preços</Typography>
    <Table
      columns={HEADINGS}
      data={data as unknown as TRowData}
      onSelect={(index) => setSelectedDoc(data[index])}
    />
  </Box>
);

export default PriceTable;
