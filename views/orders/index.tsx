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
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDoc, setSelectedDoc] = useState<WithUid<IOrder> | null>(null);
  const [orders, setOrders] = useState<ReadonlyArray<WithUid<IOrder>>>([]);

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .finally(() => setLoading(false));
  }, []);

  const csvData = useMemo(
    () => [
      [
        'Ref/Nome de pacitente',
        'Tipo',
        'Índice de refração',
        'Cor',
        'Tratamento',
        'Diâmetro',
      ],
      ...orders.map((order) => [
        order.ref,
        TYPE_LEGEND[order.type],
        order.refractiveIndex,
        COLOR_LEGEND[order.color],
        order.treatment,
        order.diameter,
      ]),
    ],
    [orders]
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
                type="search"
                name="search"
                mr={['0', 'S']}
                ml={['0', 'S']}
                borderRadius="M"
                backgroundColor="transparent"
                placeholder="Procurar por pedidos..."
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
        <OrderTable data={orders} onSelectDoc={setSelectedDoc} />
      </Box>
      <Box p="0.5rem" display="flex" justifyContent="space-between">
        <Typography as="h4">Total de resultados: {orders.length}</Typography>
        {/* {!!orders.length && (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button>
              <FiChevronLeft size={16} color="#27272A" />
              <Typography>Anterior</Typography>
            </Button>
            <Button>
              <Typography>Seguinte</Typography>
              <FiChevronRight size={16} color="#27272A" />
            </Button>
          </Box>
        )} */}
      </Box>
      {selectedDoc && (
        <OrderForm doc={selectedDoc} closeForm={() => setSelectedDoc(null)} />
      )}
    </Box>
  );
};

export default Orders;
