import { Dispatch, SetStateAction } from 'react';

export interface EyeFieldsProps {
  label: string;
  isAddition: boolean;
  isEditable: boolean;
  name: 'rightEye' | 'leftEye';
  setAddition: Dispatch<SetStateAction<boolean>>;
}
