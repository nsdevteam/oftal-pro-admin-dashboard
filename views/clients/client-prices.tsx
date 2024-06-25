import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Dropdown } from '../../elements';
import { ClientFormProps, IClientForm } from './clients.types';

const ClientFormPrices: FC<Pick<ClientFormProps, 'prices'>> = ({ prices }) => {
  const openState = useState(false);
  const { control, setValue } = useFormContext<IClientForm>();
  const priceId = useWatch({ control, name: 'priceId' });

  return (
    <Dropdown
      openState={openState}
      defaultValue={priceId}
      label="Escolha uma opção"
      values={prices.map(({ uid }) => uid)}
      legend={prices.reduce(
        (acc, { uid, name }) => ({ ...acc, [uid]: name }),
        {}
      )}
      onSelect={(value) => {
        setValue('priceId', value);
        openState[1](false);
      }}
    />
  );
};

export default ClientFormPrices;
