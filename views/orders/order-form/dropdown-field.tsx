import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Box, Dropdown, Typography } from '../../../elements';
import { IOrder } from '../../../interface';
import { DropdownFieldProps } from './order-form.types';

const DropdownField: FC<DropdownFieldProps> = ({
  name,
  label,
  allowed,
  isBoolean,
  isEditable,
  ...props
}) => {
  const { control, setValue } = useFormContext<IOrder>();

  const fieldValue = useWatch({ control, name });

  const validatorValues = useWatch({
    control,
    name: allowed?.[0] as keyof Omit<IOrder, 'leftEye' | 'rightEye'>,
  });

  useEffect(() => {
    if (allowed && validatorValues) {
      if (!allowed[1].includes(validatorValues as string | number)) {
        setValue(name, false);
      }
    }
  }, [fieldValue, validatorValues]);

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Typography>{label}</Typography>
      <Dropdown
        {...props}
        disabled={!isEditable}
        defaultValue={String(fieldValue ?? '')}
        onSelect={(value: string) => {
          setValue(name, isBoolean ? JSON.parse(value) : value);
        }}
      />
    </Box>
  );
};

export default DropdownField;
