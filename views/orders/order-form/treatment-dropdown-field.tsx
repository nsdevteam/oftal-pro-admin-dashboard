import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Box, Dropdown, Typography } from '../../../elements';
import { IOrder } from '../../../interface';
import { TREATMENT_VALUES } from './order-form.data';

const TreatmentDropdownField: FC<{ isEditable: boolean }> = ({
  isEditable,
}) => {
  const defaultValue = 'HMC';
  const label = 'Tratamento*';
  const values = TREATMENT_VALUES;

  const { control, setValue } = useFormContext<IOrder>();

  const fieldValue = useWatch({ control, name: 'treatment' });
  const color = useWatch({ control, name: 'color' });
  const refractiveIndex = useWatch({ control, name: 'refractiveIndex' });

  useEffect(() => {
    if (fieldValue === 'UC' && (refractiveIndex !== '1.5' || color !== 'white'))
      setValue('treatment', defaultValue);
  }, [refractiveIndex, color, fieldValue]);

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Typography>{label}</Typography>
      <Dropdown
        disabled={!isEditable}
        values={values.filter(
          (value) =>
            value !== 'UC' || (refractiveIndex === '1.5' && color === 'white')
        )}
        defaultValue={String(fieldValue ?? '') || defaultValue}
        onSelect={(value) => {
          setValue('treatment', (value as IOrder['treatment']) ?? defaultValue);
        }}
      />
    </Box>
  );
};

export default TreatmentDropdownField;
