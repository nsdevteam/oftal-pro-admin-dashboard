import { ChangeEventHandler, FC, useId } from 'react';

import { Box, Typography } from '../index';
import { AttachmentProps } from './attachment.types';

const Attachment: FC<AttachmentProps> = ({
  label,
  onChange,
  disabled,
  supportingText,
}) => {
  const id = useId();

  const handleOnChangeFile: ChangeEventHandler<HTMLInputElement> = (e) =>
    onChange(e.target.files ?? ([] as unknown as FileList));

  return (
    <Box as="label">
      <input
        id={id}
        multiple
        type="file"
        name="attachment"
        disabled={disabled}
        style={{ display: 'none' }}
        onChange={handleOnChangeFile}
        accept=".csv"
      />
      <Box
        display="flex"
        columnGap="8px"
        alignItems="center"
        {...(disabled && { opacity: 0.7 })}
      >
        <Box
          padding="1rem"
          display="flex"
          color="#A6A6A6"
          cursor="pointer"
          fontWeight="bold"
          fontSize="0.75rem"
          alignItems="center"
          borderRadius="0.8rem"
          justifyContent="center"
          nHover={{ opacity: 0.8 }}
          border="1px solid #A6A6A6"
          aria-label="add attachment"
        >
          {label}
        </Box>
        {supportingText && (
          <Typography color="#A6A6A6">{supportingText}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Attachment;
