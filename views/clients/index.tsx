import { WithUid } from 'burnbase/firestore';
import { FC, useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import getAllClients from '../../api/clients/get-all-clients';
import { getPrices } from '../../api/prices';
import { Box, Button, Input, Typography } from '../../elements';
import { IClient, IUserPrices } from '../../interface';
import ClientForm from './client-form';
import ClientsTable from './clients-table';
import ClientsCards from './clients-cards';
import FilterInput from '../../elements/filter-input';

const Clients: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterClients, setFilterClients] = useState('');
  const [filteredClients,setFilteredClients] = useState<Array<any>>([]);
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
      .then((res)=>{
        setFilteredClients(res);
        setClients(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleItemSelect = (item:any)=>{
    setSelectedDoc(item);
    setOpen(true);
  }
  const handleSearchFilter = (result:any)=>{
    setFilteredClients(result);
  } 
  return (
      <div className='view-wrapper clients-wrapper'>
         <div className='view-header clients-header'>
          <Button className='add-item-btn' mt="L" disabled={loading} onClick={() => setOpen(true)}>
            <Typography as="span">Adicionar Cliente</Typography>
            <Typography as="span" ml="M">
              <FiPlus size={18} color="#FFF" />
            </Typography>
          </Button>
          </div>

          <div className='view-content clients-content'>
          <div className='dis-dk'>
        <ClientsTable
          setSelectedDoc={setSelectedDoc}
          customData={clients}   
          data={filteredClients.filter(({ fullName, email }) => {
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
        </div>
          <div className='dis-mb'>
            <FilterInput  data={clients} onFilter={handleSearchFilter}  />          
            <ClientsCards
                  setSelectedDoc={setSelectedDoc}
                  customData={clients}   
                  data={filteredClients.filter(({ fullName, email }) => {
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
          </div>   
        </div>
      <div className='view-modal-silent'>
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
      </div>
    </div>
  );
};

export default Clients;
