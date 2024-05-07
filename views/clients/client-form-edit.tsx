import { FC } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { updateUser } from '../../api/user';
import { useUser } from '../../context/user';
import { Box, Button, Dropdown, Input, Typography } from '../../elements';
import { ClientFormProps } from './clients.types';

const ClientFormEdit: FC<ClientFormProps> = ({ closeForm }) => {
  const type = ['Tipo 1', 'Tipo 2'];
  const { userData, userAuth } = useUser();

  const allNames = userData?.fullName.split(' ') ?? [''];
  const { register, getValues } = useForm({
    defaultValues: {
      firstName:
        allNames.length < 4 ? allNames[0] : allNames.slice(0, -2).join(' '),
      lastName:
        allNames.length < 3 ? allNames[1] ?? '' : allNames.slice(-2).join(' '),
      email: userData?.email ?? '',
      phone: userData?.phoneNumber ?? '',
      lastLoginAt: userData?.lastLoginAt
        ? new Date(userData.lastLoginAt)
        : '--',
      createdAt: userData?.createdAt ? new Date(userData.createdAt) : '--',
      type: userData?.type ? 'Tipo 2' : 'Tipo 1',
      password: userAuth.reloadUserInfo.passwordHash,
    },
  });

  const saveEdition = async () => {
    const { firstName, lastName, phone } = getValues();

    const fullName = `${firstName} ${lastName}`;

    updateUser(userAuth!.uid, {
      fullName,
      phoneNumber: phone,
    });
  };

  const handleEditClient = () =>
    toast.promise(saveEdition(), {
      loading: 'Editando cliente...',
      success: 'Cliente editado com sucesso',
      error: 'Erro ao aditar cliente',
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
        display="flex"
        flexDirection="column"
        borderRadius="1rem"
        onClick={(e) => e.stopPropagation()}
      >
        <Typography as="h2" textAlign="center">
          Editar cliente
        </Typography>
        <Box
          gap="1rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box display="flex" flexDirection="column" gap="1rem" width="100%">
            <Typography>Primeiro nome</Typography>
            <Input
              placeholder="John"
              borderRadius="0.8rem"
              {...register('firstName')}
              border="1px solid #CDCDCD"
            />
          </Box>
          <Box display="flex" flexDirection="column" gap="1rem" width="100%">
            <Typography>Sobrenome</Typography>
            <Input
              borderRadius="0.8rem"
              border="1px solid #CDCDCD"
              {...register('lastName')}
              placeholder="Doe"
            />
          </Box>
        </Box>
        <Box
          gap="1rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box display="flex" flexDirection="column" gap="1rem" width="100%">
            <Typography>Email</Typography>
            <Input
              borderRadius="0.8rem"
              border="1px solid #CDCDCD"
              {...register('email')}
              placeholder="centro@optico.com"
            />
          </Box>
          <Box display="flex" flexDirection="column" gap="1rem" width="100%">
            <Typography>Tipo de cliente</Typography>
            <Dropdown
              label="Opções"
              values={type}
              {...register('type')}
              onSelect={() => console.log('hello')}
            />
          </Box>
        </Box>
        <Box
          gap="1rem"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box display="flex" flexDirection="column" gap="1rem" width="100%">
            <Typography>Senha</Typography>
            <Input
              type="password"
              placeholder="Senha"
              borderRadius="0.8rem"
              border="1px solid #CDCDCD"
              {...register('password')}
            />
          </Box>
          <Box display="flex" flexDirection="column" gap="1rem" width="100%">
            <Typography>Confirmar senha</Typography>
            <Input
              type="password"
              placeholder="Confirmar senha"
              borderRadius="0.8rem"
              border="1px solid #CDCDCD"
              {...register('confirmPassword')}
            />
          </Box>
        </Box>
        <Button mt="1rem" onClick={handleEditClient}>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default ClientFormEdit;
