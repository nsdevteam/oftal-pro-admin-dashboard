import { FC } from 'react';

import Box from '../box';
import Input from '../input';
import Typography from '../typography';
import { InputListProps } from './input-list.types';

const InputList: FC<InputListProps> = ({
  label,
  disabled,
  onSelect,
  defaultValue,
}) => (
  <Box as="label" position="relative" opacity={disabled ? 0.4 : 1}>
    <Typography fontSize="0.8rem">{label}</Typography>
    <Input
      type="text"
      minWidth="6rem"
      disabled={disabled}
      borderRadius="0.8rem"
      border="1px solid #CDCDCD"
      defaultValue={defaultValue}
      onBlur={(e) => onSelect(e.target.value)}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      className='c-input-list'
    />
  </Box>
);

export default InputList;
