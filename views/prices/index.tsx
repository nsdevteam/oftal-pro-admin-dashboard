import { WithUid } from 'burnbase/firestore';
import { FC, useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import getPrices from '../../api/prices/get-prices';
import { Box, Button, Input, Typography } from '../../elements';
import { IUserPrices } from '../../interface';
import PricesForm from './prices-form';
import PricesTable from './prices-table';

const Prices: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterPrices, setFilterPrices] = useState('');

  const [selectedDoc, setSelectedDoc] = useState<WithUid<IUserPrices> | null>(
    null
  );   

  const [prices, setPrices] = useState<ReadonlyArray<WithUid<IUserPrices>>>([]);
  useEffect(() => {
    getPrices()
      .then(setPrices)
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
                value={filterPrices}
                name="search"
                mr={['0', 'S']}
                ml={['0', 'S']}
                borderRadius="M"
                backgroundColor="transparent"
                placeholder="Procurar por pedidos..."
                onChange={(e) => setFilterPrices(e.target.value)}
              />
            </Box>
          </Box>
          <Button mt="L" disabled={loading} onClick={() => setOpen(true)}>
            <Typography as="span">Adicionar Preço</Typography>
            <Typography as="span" ml="M">
              <FiPlus size={18} color="#FFF" />
            </Typography>
          </Button>
        </Box>
        <PricesTable
          setSelectedDoc={setSelectedDoc}
          data={prices.filter(({ name }) => {
            if (filterPrices && !name.includes(filterPrices)) return false;

            return true;
          })}
        />
      </Box>
      <Box p="0.5rem" display="flex" justifyContent="space-between">
        <Typography as="h4">Total de resultados: {prices.length}</Typography>
      </Box>
      {(isOpen || selectedDoc) && (
        <PricesForm
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

export default Prices;
