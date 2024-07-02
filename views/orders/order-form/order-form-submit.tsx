import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { Box, Typography } from '../../../elements';
import { IOrder } from '../../../interface';
import { formatMoney } from '../../../utils';
import { OrderFormSubmitProps } from './order-form.types';

const OrderFormSubmit: FC<OrderFormSubmitProps> = () => {
  const { control } = useFormContext<IOrder>();

  const total = useWatch({ control, name: 'total' });

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-end" gap="2rem">
      <Typography fontSize="1.5rem">
        Subtotal: {formatMoney(total ?? 0)} AOA
      </Typography>
    </Box>
  );
};

export default OrderFormSubmit;
