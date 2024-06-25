import { createUser } from 'burnbase/auth';
import { FC, useState } from 'react';
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import toast from 'react-hot-toast';

import { updateClient } from '../../api/clients';
import { clientsCollectionName } from '../../api/clients/clients.utils';
import { Box, Button, Dropdown, Input, Typography } from '../../elements';
import { CLIENT_TYPE_LEGEND } from './client.data';
import ClientFormPrices from './client-prices';
import { ClientFormProps, IClientForm } from './clients.types';

const ClientFormSelectType: FC = () => {
  const openState = useState(false);
  const { control, setValue } = useFormContext<IClientForm>();
  const type = useWatch({ control, name: 'type' });

  return (
    <Dropdown
      values={['0', '1']}
      openState={openState}
      label="Escolha uma opção"
      legend={CLIENT_TYPE_LEGEND}
      defaultValue={CLIENT_TYPE_LEGEND[type]}
      onSelect={(value) => {
        setValue('type', Number(value));
        openState[1](false);
      }}
    />
  );
};

const ClientForm: FC<ClientFormProps> = ({ closeForm, doc, prices }) => {
  const form = useForm<IClientForm>({
    defaultValues: {
      email: '',
      fullName: '',
      priceId: 'NoFlnYsN5tOM8RETJ38R',
      ...doc,
    },
  });

  const submitClient = async () => {
    try {
      const { email, password, fullName, clientId, type, priceId } =
        form.getValues();
      if (!doc) {
        await createUser(email, password, {
          hasInstance: true,
          userInfo: { fullName, type, clientId: `CL${clientId}`, priceId },
          userCollectionName: clientsCollectionName,
        });
        return;
      }

      await updateClient(doc.uid, { fullName, clientId, type, priceId });
    } finally {
      closeForm();
    }
  };

  const handleSubmitClient = () =>
    toast.promise(submitClient(), {
      loading: `${doc ? 'Atualizando' : 'Adicionando'} cliente...`,
      success: `Cliente ${doc ? 'atualizado' : 'adicionado'} com sucesso`,
      error: `Erro ad ${doc ? 'atualizar' : 'adicionar'} cliente`,
    });

  return (
    <FormProvider {...form}>
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
            <ClientFormSelectType />
          </Box>
          <Box display="flex" flexDirection="column" gap="1rem">
            <Typography>Tabela de Preço</Typography>
            <ClientFormPrices prices={prices} />
          </Box>
          {!doc && (
            <>
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
            </>
          )}
          <Button mt="1rem" onClick={handleSubmitClient}>
            {doc ? 'Atualizar' : 'Adicionar'} Cliente
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default ClientForm;
