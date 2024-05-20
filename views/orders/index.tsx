import { WithUid } from 'burnbase/firestore';
import { FC, useEffect, useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import { FiSearch } from 'react-icons/fi';
import { RiFileExcel2Line } from 'react-icons/ri';

import getAllOrders from '../../api/orders/get-all-orders';
import { Box, Button, Input, Typography } from '../../elements';
import { IOrder } from '../../interface';
import OrderForm from './order-form';
import { COLOR_LEGEND, TYPE_LEGEND } from './orders.data';
import OrderTable from './orders-table';

const Orders: FC = () => {
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<ReadonlyArray<WithUid<IOrder>>>([]);
  const [selectDoc, setSelectedDoc] = useState<WithUid<IOrder> | null>(null);

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  const filterOrder = orders.filter(({ ref, type }) => {
    if (
      filter &&
      !ref.includes(filter) &&
      !TYPE_LEGEND[type].includes(filter)
    ) {
      return false;
    }

    return true;
  });

  const csvData = useMemo(
    () => [
      [
        'Ref/Nome de pacitente',
        'Tipo',
        'Índice de refração',
        'Tratamento',
        'Diâmetro',
        'Lado',
        'Esférico',
        'Cilindro',
        'Eixo',
        'Adição',
      ],
      ...filterOrder.flatMap((order) => [
        [
          order.ref,
          TYPE_LEGEND[order.type],
          order.refractiveIndex,
          COLOR_LEGEND[order.color],
          order.treatment,
          order.diameter,
          'Direito',
          order.rightEye?.spherical ?? '--',
          order.rightEye?.cylinder ?? '--',
          order.rightEye?.axis ?? '--',
          order.rightEye?.addition ?? '--',
        ],
        [
          order.ref,
          TYPE_LEGEND[order.type],
          order.refractiveIndex,
          order.treatment,
          order.diameter,
          'Esquerdo',
          order.leftEye?.spherical ?? '--',
          order.leftEye?.cylinder ?? '--',
          order.leftEye?.axis ?? '--',
          order.leftEye?.addition ?? '--',
        ],
      ]),
    ],
    [filterOrder]
  );

  return (
    <Box
      flex="1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box display="flex" gap="2rem" flexDirection="column">
        <Box
          width="100%"
          display="flex"
          padding="0.5rem"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Box
            width="100%"
            display="flex"
            mr={['0', 'S']}
            borderRadius="M"
            overflow="hidden"
            alignItems="center"
            color="textInverted"
            border="1px solid #E4E4E7"
            justifyContent="flex-start"
          >
            <Box cursor="pointer" padding="0.5rem" paddingRight="0">
              <FiSearch size={24} />
            </Box>
            <Box display="flex" flexDirection="column" flex="1">
              <Input
                p="L"
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                type="search"
                value={filter}
                name="search"
                mr={['0', 'S']}
                ml={['0', 'S']}
                borderRadius="M"
                backgroundColor="transparent"
                placeholder="Procurar por pedidos..."
                onChange={(e) => setFilter(e.target.value)}
              />
            </Box>
          </Box>
          <CSVLink filename="orders.csv" data={csvData}>
            <Button mt="L" disabled={loading}>
              <Typography as="span">Exportar</Typography>
              <Typography as="span" ml="M">
                <RiFileExcel2Line size={18} color="#FFF" />
              </Typography>
            </Button>
          </CSVLink>
        </Box>
        <OrderTable setSelectedDoc={setSelectedDoc} data={filterOrder} />
      </Box>
      <Box p="0.5rem" display="flex" justifyContent="space-between">
        <Typography as="h4">Total de resultados: {orders.length}</Typography>
      </Box>
      {selectDoc && (
        <OrderForm
          doc={selectDoc}
          closeForm={() => setSelectedDoc(null)}
          isEditable={false}
        />
      )}
    </Box>
  );
};

export default Orders;
