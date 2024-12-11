import { FC, useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import { getAllAdmins } from '../../api/admins';
import { Box, Button, Input, Typography } from '../../elements';
import { IAdmin } from '../../interface';
import AdminForm from './admin-form';
import AdminTable from './admin-table';
import AdminCards from './admin-cards';

const Admins: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [admins, setAdmins] = useState<ReadonlyArray<IAdmin>>([]);
  const [filterAdmins, setFilterAdmins] = useState('');
  const [selectDoc, setSelectedDoc] = useState<any>(null);
  useEffect(() => {
    getAllAdmins()
      .then(setAdmins)
      .finally(() => setLoading(false));
  }, []);

  const handleSelectItem = (item:any)=>{
    setSelectedDoc(item);
    /* setOpen(true);  */     
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
            <Typography  as="span">Adicionar Administrador</Typography>
            <Typography as="span" ml="M">
              <FiPlus size={18} color="#FFF" />
            </Typography>
          </Button>
        </Box>
        <div className='dis-dk'>
        <AdminTable
          data={admins.filter(({ fullName, email }) => {
            if (
              filterAdmins &&
              !fullName.includes(filterAdmins) &&
              !email.includes(filterAdmins)
            ) {
              return false;
            }

            return true;
          })} 
          setSelectedDoc={handleSelectItem}   
        />
        </div>
        <div className='dis-mb'>
          <AdminCards 
             data={admins.filter(({ fullName, email }) => {
              if (
                filterAdmins &&
                !fullName.includes(filterAdmins) &&
                !email.includes(filterAdmins)
              ) {
                return false;
              }
  
              return true;
            })} 
            setSelectedDoc={handleSelectItem}
          />
        </div>
 
      </Box>   
      {isOpen && <AdminForm doc={selectDoc} closeForm={() => setOpen(false)} />}
    </Box>   
  );
};

export default Admins;
