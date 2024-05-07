import { FC, useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import getAllClients from '../../api/clients/get-all-clients';
import { Box, Button, Input, Typography } from '../../elements';
import { IClient } from '../../interface';
import ClientForm from './client-form';
import OrderTable from './clients-table';

const Clients: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [clients, setClients] = useState<ReadonlyArray<IClient>>([]);
  const [filterClients, setFilterClients] = useState('');

  useEffect(() => {
    getAllClients()
      .then(setClients)
      .finally(() => setLoading(false));
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
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus
                type="search"
                value={filterClients}
                name="search"
                mr={['0', 'S']}
                ml={['0', 'S']}
                borderRadius="M"
                backgroundColor="transparent"
                placeholder="Procurar por pedidos..."
                onChange={(e) => setFilterClients(e.target.value)}
              />
            </Box>
          </Box>
          <Button mt="L" disabled={loading} onClick={() => setOpen(true)}>
            <Typography as="span">Adicionar Cliente</Typography>
            <Typography as="span" ml="M">
              <FiPlus size={18} color="#FFF" />
            </Typography>
          </Button>
        </Box>
        <OrderTable
          data={clients.filter(({ fullName, email }) => {
            if (
              filterClients &&
              !fullName.includes(filterClients) &&
              !email.includes(filterClients)
            ) {
              return false;
            }

            return true;
          })}
        />
      </Box>
      <Box p="0.5rem" display="flex" justifyContent="space-between">
        <Typography as="h4">Total de resultados: {clients.length}</Typography>
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
      {isOpen && <ClientForm closeForm={() => setOpen(false)} />}
    </Box>
  );
};

export default Clients;
