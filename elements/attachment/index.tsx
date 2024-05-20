import { ChangeEventHandler, FC, useId } from 'react';

import { Box, Typography } from '../index';
import { AttachmentProps } from './attachment.types';

const Attachment: FC<AttachmentProps> = ({
  label,
  files,
  onChange,
  isEditable,
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
        disabled={!isEditable}
        name="attachment"
        style={{ display: 'none' }}
        onChange={handleOnChangeFile}
        accept=".doc,.pdf,.jpg,.jpeg,.png"
      />
      <Box display="flex" columnGap="8px" alignItems="center">
        <Box
          aria-label="add attachment"
          color="#FFF"
          bg="#4763E4"
          padding="1rem"
          display="flex"
          cursor="pointer"
          fontWeight="bold"
          fontSize="0.75rem"
          alignItems="center"
          borderRadius="0.8rem"
          justifyContent="center"
          nHover={{ opacity: 0.8 }}
        >
          {label}
        </Box>
        {!!files?.length && (
          <Typography color="white">{files.length}</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Attachment;
