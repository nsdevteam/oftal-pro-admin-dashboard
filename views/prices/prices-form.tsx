import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { addPrices, updatePrices } from '../../api/prices';
import { Attachment, Box, Button, Input, Typography } from '../../elements';
import { IUserPrices } from '../../interface';
import { COLOR_LEGEND } from '../orders/orders.data';
import { PriceFormProps } from './prices.types';
import { handleChangeCSV } from './prices.utils';

const PricesForm: FC<PriceFormProps> = ({ closeForm, doc }) => {
  const form = useForm<IUserPrices>({
    defaultValues: {
      ...doc,
    },
  });

  const submitPrices = async () => {
    try {
      const { name, description, lens, extra } = form.getValues();
      if (!doc) {
        await addPrices({
          name,
          lens,
          extra,
          description,
        });
        return;
      }

      await updatePrices(doc.uid, { name, description, lens, extra });
    } finally {
      closeForm();
    }
  };

  const lensTransform = (csvText: string) => {
    const rows = csvText
      .split('\n')
      .map((row) => row.split('\r')[0].split(','));

    const data = rows.reduce(
      (acc, [color, refractive, ...values]) => ({
        ...acc,
        [color]: {
          ...acc[color as keyof typeof COLOR_LEGEND],
          [refractive]: values
            .filter((v) => v && Number(v) && !isNaN(Number(v)))
            .map(Number),
        },
      }),
      {} as IUserPrices['lens']
    );

    form.setValue('lens', data);
  };

  const extraTransform = (csvText: string) => {
    const rows = csvText
      .split('\n')
      .map((row) => row.split('\r')[0].split(','));

    const data = rows.reduce(
      (acc, [name, value]) => ({
        ...acc,
        [name]: Number(value),
      }),
      {} as IUserPrices['extra']
    );

    form.setValue('extra', data);
  };

  const handleSubmitPrices = () =>
    toast.promise(submitPrices(), {
      loading: `${doc ? 'Atualizando' : 'Adicionando'} preços...`,
      success: `Preços ${doc ? 'atualizados' : 'adicionados'} com sucesso`,
      error: `Erro ao ${doc ? 'atualizar' : 'adicionar'} preços`,
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
            <Typography>Nome</Typography>
            <Input
              borderRadius="0.8rem"
              border="1px solid #CDCDCD"
              placeholder="Preço especial"
              {...form.register('name')}
            />
          </Box>
          <Typography>Descrição</Typography>
          <Input
            borderRadius="0.8rem"
            border="1px solid #CDCDCD"
            placeholder="Este preço é especial"
            {...form.register('description')}
          />
          <Attachment
            disabled={false}
            supportingText={
              form.getValues('extra') ? 'Já tem ficheiro' : 'Adicione o CSV'
            }
            label="Adicionar preços das lentes"
            onChange={handleChangeCSV(lensTransform)}
          />
          <Attachment
            disabled={false}
            label="Adicionar preços das extra"
            supportingText={
              form.getValues('lens') ? 'Já tem ficheiro' : 'Adicione o CSV'
            }
            onChange={handleChangeCSV(extraTransform)}
          />
          <Button mt="1rem" onClick={handleSubmitPrices}>
            {doc ? 'Atualizar' : 'Adicionar'} Preços
          </Button>
        </Box>
      </Box>
    </FormProvider>
  );
};

export default PricesForm;
