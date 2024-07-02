import { FC } from 'react';

import { Box, Table, Typography } from '../../elements';
import { TRowData } from '../../interface';
import { OrdersTableProps } from './orders.types';

const HEADINGS: Record<string, string> = {
  ref: 'Referência do pedido',
  type: 'Tipo',
  refractiveIndex: 'Índice de refração',
  color: 'Cor',
  spherical: 'Esférico',
  cylinder: 'Cilindro',
  axis: 'Eixo',
  addition: 'Adição',
};

const OrderTable: FC<OrdersTableProps> = ({ data, setSelectedDoc }) => (
  <Box width="100%">
    <Typography as="h2">Listagem de encomendas</Typography>
    <Table
      columns={HEADINGS}
      onSelect={(index) => setSelectedDoc(data[index])}
      data={
        data.map(
          ({
            ref,
            type,
            color,
            leftEye,
            rightEye,
            clientId,
            refractiveIndex,
            createdAt,
          }) => ({
            ref: `${new Date(createdAt!)
              .toISOString()
              .split('T')[0]
              .replaceAll('-', '')}-${clientId}-${ref}`,
            type,
            refractiveIndex,
            color,
            spherical: (
              <>
                <strong>D: </strong>
                {rightEye?.spherical || '--'}
                <br />
                <strong>E: </strong>
                {leftEye?.spherical || '--'}
              </>
            ),
            cylinder: (
              <>
                <strong>D: </strong>
                {rightEye?.cylinder || '--'}
                <br />
                <strong>E: </strong>
                {leftEye?.cylinder || '--'}
              </>
            ),
            addition: (
              <>
                <strong>D: </strong>
                {rightEye?.addition || '--'}
                <br />
                <strong>E: </strong>
                {leftEye?.addition || '--'}
              </>
            ),
            axis: (
              <>
                <strong>D: </strong>
                {rightEye?.axis || '--'}
                <br />
                <strong>E: </strong>
                {leftEye?.axis || '--'}
              </>
            ),
          })
        ) as TRowData
      }
    />
  </Box>
);

export default OrderTable;
