import { FC } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { adminsCollectionName } from '../../api/admins/admins.utils';
import { Box, Button, Input, Typography } from '../../elements';
import { AdminFormProps, IAdminForm } from './admin.types';
import { createUser } from '../../utils/helpers';

const AdminForm: FC<AdminFormProps> = ({ closeForm,doc }) => {
  const form = useForm<IAdminForm>({
    defaultValues: {
      fullName: '',
      email: '',
      ...doc     
    },
  });

  const addNewAdmin = async () => {
    const { email, password, fullName } = form.getValues();

    await createUser(email, password, {
      hasInstance: true,
      userInfo: { fullName },
      userCollectionName: adminsCollectionName,
    });
    closeForm();
  };

  const handleAddNewAdmin = () =>
    toast.promise(addNewAdmin(), {
      loading: 'Adicionando administrador...',
      success: 'Administrador adicionado com sucesso',
      error: 'Erro ad adicionar administrador',
    });

  return (
    <Box
      inset="0"
      bg="#0003"
      display="flex"
      position="fixed"
      onClick={closeForm}
      alignItems="center"
      p={['1rem', '2rem']}
      justifyContent="center"
      className='page-form admin-form'
    >
      <Box
        bg="white"
        top="2.5rem"
        width="3rem"
        height="3rem"
        right="3.5rem"
        display="flex"
        cursor="pointer"
        position="absolute"
        alignItems="center"
        onClick={closeForm}
        borderRadius="0.5rem"
        alignSelf="flex-start"
        justifyContent="center"
        border="1px solid #0002"
        nHover={{ borderColor: '#0005' }}
      >
        <Box fontSize="2rem" transform="scaleY(0.8)">
          X
        </Box>
      </Box>
      <Box
        p="2rem"
        bg="white"
        gap="1rem"
        width="30rem"
        display="flex"
        borderRadius="1rem"
        flexDirection="column"
        onClick={(e) => e.stopPropagation()}
      >
        <Box display="flex" flexDirection="column" gap="1rem">
          <Typography>Nome de administrador</Typography>
          <Input
            borderRadius="0.8rem"
            border="1px solid #CDCDCD"
            placeholder="Nome do administrador"
            {...form.register('fullName')}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap="1rem">
          <Typography>Email</Typography>
          <Input
            placeholder="Email"
            borderRadius="0.8rem"
            border="1px solid #CDCDCD"
            {...form.register('email')}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap="1rem">
          <Typography>Senha</Typography>
          <Input
            type="password"
            placeholder="Senha"
            borderRadius="0.8rem"
            border="1px solid #CDCDCD"
            {...form.register('password')}
          />
        </Box>
        <Box display="flex" flexDirection="column" gap="1rem">
          <Typography>Confirmar senha</Typography>
          <Input
            type="password"
            placeholder="Confirmar senha"
            borderRadius="0.8rem"
            border="1px solid #CDCDCD"
            {...form.register('confirmPassword')}
          />
        </Box>
        <Button mt="1rem" onClick={handleAddNewAdmin}>
          Adicionar Administrador
        </Button>
      </Box>
    </Box>
  );
};

export default AdminForm;
