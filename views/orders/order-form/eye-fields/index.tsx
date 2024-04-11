import { FC, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Box, InputList, Typography } from '../../../../elements';
import { IOrder } from '../../../../interface';
import { EyeFieldsProps } from './eye-fields.types';
import EyeSpherical from './eye-spherical';

const EyeFields: FC<EyeFieldsProps> = ({
  label,
  name,
  isAddition,
  setAddition,
}) => {
  const { control, setValue } = useFormContext<IOrder>();
  const eye = useWatch({ control, name: name });
  const type = useWatch({ control, name: 'type' });

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Box display="flex" gap="1rem" alignItems="flex-end">
        <Typography>{label}</Typography>
        {type !== 'single-focal' && (
          <Typography as="label" fontSize="0.8rem">
            <input
              type="checkbox"
              defaultChecked={!isAddition}
              onClick={() => setAddition(!isAddition)}
            />{' '}
            Longe e Perto
          </Typography>
        )}
      </Box>
      <Box
        gap="0.5rem"
        display="grid"
        alignItems="center"
        gridTemplateColumns={['1rem 1fr 1fr', '1rem 1fr 1fr 1fr 1fr']}
      >
        <input
          type="checkbox"
          defaultChecked={eye?.active}
          onClick={() => setValue(name, { active: !eye?.active })}
        />
        <EyeSpherical name={name} isAddition={isAddition} />
        <InputList
          label="Cilindro"
          disabled={!eye?.active}
          defaultValue={eye?.cylinder}
          onSelect={(value: string) => {
            const validValue = Number(value) - (Number(value) % 0.25);
            const isPositive = validValue > 0;

            setValue(
              `${name}.cylinder`,
              `${isPositive ? '+' : ''}${validValue.toFixed(2)}`
            );
          }}
        />
        <Box display={['block', 'none']} />
        <InputList
          label="Eixo"
          disabled={!eye?.active}
          defaultValue={eye?.axis}
          onSelect={(value: string) => {
            const validValue = Number(value.replace('°', ''));

            setValue(
              `${name}.axis`,
              validValue > 180
                ? '180°'
                : validValue < 0
                ? '0°'
                : `${validValue}°`
            );
          }}
        />
        {type !== 'single-focal' && isAddition && (
          <InputList
            label="Adição"
            disabled={!eye?.active}
            defaultValue={eye?.addition}
            onSelect={(value: string) => {
              const validValue = Number(value) - (Number(value) % 0.25);

              setValue(
                `${name}.addition`,
                `+${(validValue > 3.5
                  ? 3.5
                  : validValue < 0.5
                  ? 0.5
                  : validValue - (validValue % 0.25)
                ).toFixed(2)}`
              );
            }}
          />
        )}
      </Box>
    </Box>
  );
};

const Eyes: FC = () => {
  const [isAddition, setAddition] = useState(true);

  return (
    <Box display="flex" gap="1.25rem" flexDirection="column">
      <EyeFields
        name="rightEye"
        label="Olho Direito"
        isAddition={isAddition}
        setAddition={setAddition}
      />
      <EyeFields
        name="leftEye"
        label="Olho Esquerdo"
        isAddition={isAddition}
        setAddition={setAddition}
      />
    </Box>
  );
};

export default Eyes;
