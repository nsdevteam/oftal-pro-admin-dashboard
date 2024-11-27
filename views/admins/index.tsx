import { FC, useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import { getAllAdmins } from '../../api/admins';
import { Box, Button, Input, Typography } from '../../elements';
import { IAdmin } from '../../interface';
import AdminForm from './admin-form';
import AdminTable from './admin-table';

const Admins: FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [admins, setAdmins] = useState<ReadonlyArray<IAdmin>>([]);
  const [filterAdmins, setFilterAdmins] = useState('');

  useEffect(() => {
    getAllAdmins()
      .then(setAdmins)
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
            <Typography as="span">Adicionar Administrador</Typography>
            <Typography as="span" ml="M">
              <FiPlus size={18} color="#FFF" />
            </Typography>
          </Button>
        </Box>
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
        />
      </Box>
      <Box p="0.5rem" display="flex" justifyContent="space-between">
        <Typography as="h4">Total de resultados: {admins.length}</Typography>
      </Box>
      {isOpen && <AdminForm closeForm={() => setOpen(false)} />}
    </Box>
  );
};

export default Admins;
