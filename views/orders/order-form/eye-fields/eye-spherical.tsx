import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Box, InputList } from '../../../../elements';
import { IOrder } from '../../../../interface';

const EyeSpherical: FC<{
  isAddition: boolean;
  name: 'leftEye' | 'rightEye';
  isEditable: boolean;
}> = ({ name, isAddition, isEditable }) => {
  const { control, setValue } = useFormContext<IOrder>();

  const addition = useWatch({ control, name: `${name}.addition` });
  const spherical = useWatch({ control, name: `${name}.spherical` });

  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      <InputList
        disabled={!isEditable}
        defaultValue={spherical}
        label={`Esférico ${isAddition ? '' : '(longe)'}`}
        onSelect={(value: string) => {
          const validValue = Number(value) - (Number(value) % 0.25);
          const isPositive = validValue > 0;

          setValue(
            `${name}.spherical`,
            `${isPositive ? '+' : ''}${validValue.toFixed(2)}`
          );
        }}
      />
      {!isAddition && (
        <InputList
          disabled={!isEditable}
          label={`Esférico ${isAddition ? '' : '(perto)'}`}
          defaultValue={String(
            (
              Number(spherical?.replace('+', '').replace(',', '.') ?? '0') +
              Number(addition?.replace('+', '').replace(',', '.') ?? '0')
            ).toFixed(2)
          )}
          onSelect={(value: string) => {
            const validSpherical = Number(
              spherical?.replace('+', '').replace(',', '.')
            );
            const validValue = Number(value) - (Number(value) % 0.25);

            const additionRaw = Math.abs(validSpherical - validValue);

            setValue(
              `${name}.addition`,
              `+${(additionRaw > 3.5
                ? 3.5
                : additionRaw < 0.5
                ? 0.5
                : additionRaw - (additionRaw % 0.25)
              ).toFixed(2)}`
            );
          }}
        />
      )}
    </Box>
  );
};
export default EyeSpherical;
