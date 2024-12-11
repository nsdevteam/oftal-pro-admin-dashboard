import { WithUid } from 'burnbase/firestore';
import { FC, useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import getPrices from '../../api/prices/get-prices';
import { Box, Button, Input, Typography } from '../../elements';
import { IUserPrices } from '../../interface';
import PricesForm from './prices-form';
import PricesTable from './prices-table';
import PricesCards from './prices-cards';

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

  const handleItemSelect = (item:any)=>{
      setSelectedDoc(item);
      setOpen(true);
  }

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
          <Button className='add-item-btn' mt="L" disabled={loading} onClick={() => setOpen(true)}>
            <Typography as="span">Adicionar Preço</Typography>
            <Typography as="span" ml="M">
              <FiPlus size={18} color="#FFF" />
            </Typography>
          </Button>
        </Box>
        <div className='dis-dk'>
        <PricesTable
          setSelectedDoc={handleItemSelect}
          customData={prices}   
          data={prices.filter(({ name }) => {
            if (filterPrices && !name.includes(filterPrices)) return false;

            return true;
          })}
        />
        </div>
        <div className='dis-mb'>
        <PricesCards
            setSelectedDoc={handleItemSelect}
            customData={prices}   
            data={prices.filter(({ name }) => {
              if (filterPrices && !name.includes(filterPrices)) return false;
  
              return true;
            })}
        />
        </div>   
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
