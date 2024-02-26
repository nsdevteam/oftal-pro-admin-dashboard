import { FC, useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import getAllOrders from '../../api/orders/get-all-orders';
import { useUser } from '../../context/user';
import { Box, Button, Input, Typography } from '../../elements';
import { IOrder } from '../../interface';
import OrderForm from './order-form';
import OrderTable from './orders-table';

const Orders: FC = () => {
  const { userData } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [orders, setOrders] = useState<ReadonlyArray<IOrder>>([]);

  useEffect(() => {
    getAllOrders({ conditions: [['clientId', '==', userData?.clientId]] }).then(
      setOrders
    );
  }, []);

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
          <Button mt="L" onClick={() => setOpen(true)}>
            <Typography as="span">Novo pedido</Typography>
            <Typography as="span" ml="M">
              <FiPlus size={18} color="#FFF" />
            </Typography>
          </Button>
        </Box>
        <OrderTable data={orders} />
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
      {isOpen && <OrderForm closeForm={() => setOpen(false)} />}
    </Box>
  );
};

export default Orders;
