import { FC, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { IOrder } from '../../../interface';
import DropdownField from './dropdown-field';
import { REFRACTIVE_VALUES } from './order-form.data';

const DropdownRefractiveField: FC<{ isEditable: boolean }> = ({
  isEditable,
}) => {
  const { control, setValue } = useFormContext<IOrder>();
  const color = useWatch({ control, name: 'color' });
  const type = useWatch({ control, name: 'type' });
  const refractive = useWatch({ control, name: 'refractiveIndex' });

  useEffect(() => {
    setValue('refractiveIndex', refractive);
  }, [color, type]);

  return (
    <DropdownField
      name="refractiveIndex"
      label="Índice de refracção"
      disabled={!isEditable}
      values={Object.entries(REFRACTIVE_VALUES[color] ?? {})
        .filter(([, allowedList]) => allowedList.includes(type))
        .map(([value]) => value)}
      isEditable={false}
    />
  );
};

export default DropdownRefractiveField;
