import { WithUid } from 'burnbase/firestore';
import { FC } from 'react';

import { Box, Table, Typography } from '../../elements';
import { IOrder, TRowData } from '../../interface';
import { OrderTableProps } from './orders.types';

const HEADINGS: Record<string, string> = {
  clientId: 'Cliente',
  ref: 'Ref/Nome de pacitente',
  type: 'Tipo',
  refractiveIndex: 'Índice de refração',
  color: 'Cor',
  treatment: 'Tratamento',
};

const OrderTable: FC<OrderTableProps> = ({ data, onSelectDoc }) => (
  <Box width="100%">
    <Typography as="h2">Listagem de pedidos</Typography>
    <Table
      columns={HEADINGS}
      data={data as unknown as TRowData}
      onSelect={(item) => onSelectDoc(item as unknown as WithUid<IOrder>)}
    />
  </Box>
);

export default OrderTable;
