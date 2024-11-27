import { WithUid } from 'burnbase/firestore';
import { FC, useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import getAllClients from '../../api/clients/get-all-clients';
import { getPrices } from '../../api/prices';
import { Box, Button, Input, Typography } from '../../elements';
import { IClient, IUserPrices } from '../../interface';
import ClientForm from './client-form';
import OrderTable from './clients-table';

const Clients: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterClients, setFilterClients] = useState('');
  const [clients, setClients] = useState<ReadonlyArray<WithUid<IClient>>>([]);
  const [selectedDoc, setSelectedDoc] = useState<WithUid<IClient> | null>(null);

  const [prices, setPrices] = useState<ReadonlyArray<WithUid<IUserPrices>>>([]);
  useEffect(() => {
    getPrices()
      .then(setPrices)
      .finally(() => setLoading(false));
  }, []);

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
          <Button mt="L" disabled={loading} onClick={() => setOpen(true)}>
            <Typography as="span">Adicionar Cliente</Typography>
            <Typography as="span" ml="M">
              <FiPlus size={18} color="#FFF" />
            </Typography>
          </Button>
        </Box>
        <OrderTable
          setSelectedDoc={setSelectedDoc}
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
      {(isOpen || selectedDoc) && (
        <ClientForm
          prices={prices}
          doc={selectedDoc}
          closeForm={() => {
            setOpen(false);
            setSelectedDoc(null);
          }}
        />
      )}
    </Box>
  );
};

export default Clients;
