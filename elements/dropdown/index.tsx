import { FC, useId, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { v4 } from 'uuid';

import useClickOutsideListenerRef from '../../hooks/use-click-outside-listener-ref';
import Box from '../box';
import Typography from '../typography';
import { DropdownProps } from './dropdown.types';

const Dropdown: FC<DropdownProps> = ({
  label,
  values,
  legend,
  disabled,
  onSelect,
  defaultValue,
}) => {
  const boxId = useId();
  const [isOpen, setOpen] = useState(false);

  const closeDropdown = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == boxId) ||
      event?.composedPath()?.some((node: any) => node?.id == boxId)
    )
      return;

    setOpen(false);
  };

  const dropdownRef = useClickOutsideListenerRef<HTMLDivElement>(closeDropdown);

  return (
    <Box id={boxId} position="relative" opacity={disabled ? 0.4 : 1}>
      <Box
        p="0.7rem"
        display="flex"
        minWidth="6rem"
        alignItems="center"
        borderRadius="0.8rem"
        border="1px solid #CDCDCD"
        justifyContent="space-between"
        onClick={() => setOpen(!isOpen)}
        cursor={disabled ? 'not-allowed' : 'pointer'}
      >
        <Typography as="span">
          {defaultValue ? legend?.[defaultValue] ?? defaultValue : label ?? ''}
        </Typography>
        <Typography as="span">
          <FiChevronDown size={24} color="#000" />
        </Typography>
      </Box>
      {!disabled && isOpen && (
        <Box
          bg="#fff"
          zIndex="1"
          mt="0.1rem"
          display="flex"
          minWidth="6rem"
          overflowY="auto"
          cursor="pointer"
          maxHeight="10rem"
          ref={dropdownRef}
          overflowX="hidden"
          position="absolute"
          borderRadius="0.8rem"
          flexDirection="column"
          border="1px solid #CDCDCD"
        >
          {values.map((value, index) => (
            <Box
              key={v4()}
              p="0.75rem"
              onClick={() => onSelect(value)}
              {...(index && { borderTop: '1px solid #CDCDCD' })}
            >
              {legend?.[value] ?? value}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Dropdown;
