import { createUser } from 'burnbase/auth';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { clientsCollectionName } from '../../api/clients/clients.utils';
import { Box, Button, Dropdown, Input, Typography } from '../../elements';
import { clientTypeEnum } from '../../interface';
import { ClientFormProps, IClientForm } from './clients.types';

const ClientForm: FC<ClientFormProps> = ({ closeForm }) => {
  const type: clientTypeEnum = ['Tipo 1', 'Tipo 2'];
  const form = useForm<IClientForm>({
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  const addNewClient = async () => {
    const { email, password, fullName, clientId, type } = form.getValues();

    await createUser(email, password, {
      hasInstance: true,
      userInfo: { fullName, type, clientId: `CL${clientId}` },
      userCollectionName: clientsCollectionName,
    });
    closeForm();
  };

  const handleAddNewClient = () =>
    toast.promise(addNewClient(), {
      loading: 'Adicionando cliente...',
      success: 'Cliente adicionado com sucesso',
      error: 'Erro ad adicionar cliente',
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
          <Typography>ID de cliente</Typography>
          <Input
            borderRadius="0.8rem"
            border="1px solid #CDCDCD"
            placeholder="001"
            {...form.register('clientId')}
          />
        </Box>
        <Typography>Nome de Cliente</Typography>
        <Input
          borderRadius="0.8rem"
          border="1px solid #CDCDCD"
          placeholder="Centro Óptico"
          {...form.register('fullName')}
        />
        <Box display="flex" flexDirection="column" gap="1rem">
          <Typography>Email</Typography>
          <Input
            borderRadius="0.8rem"
            border="1px solid #CDCDCD"
            {...form.register('email')}
            placeholder="centro@optico.com"
          />
        </Box>
        <Box display="flex" flexDirection="column" gap="1rem">
          <Typography>Tipo de cliente</Typography>
          <Dropdown
            label="Escolha uma opção"
            values={type}
            {...form.register('clientType')}
            onSelect={() => console.log('hello')}
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
        <Button mt="1rem" onClick={handleAddNewClient}>
          Adicionar Cliente
        </Button>
      </Box>
    </Box>
  );
};

export default ClientForm;
