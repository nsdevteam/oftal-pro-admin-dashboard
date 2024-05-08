import { WithUid } from 'burnbase/firestore';

import { DropdownProps } from '../../../elements/dropdown/dropdown.types';
import { IOrder } from '../../../interface';

export interface OrderFormProps {
  closeForm: () => void;
  isEditable: boolean;
  doc: WithUid<IOrder> | null;
}

export interface DropdownFieldProps
  extends Pick<
    DropdownProps,
    'label' | 'values' | 'legend' | 'disabled' | 'defaultValue'
  > {
  isBoolean?: boolean;
  isEditable: boolean;
  name: keyof Omit<IOrder, 'leftEye' | 'rightEye'>;
  allowed?: [
    keyof Omit<IOrder, 'leftEye' | 'rightEye'>,
    ReadonlyArray<string | number>
  ];
}

export interface OrderFormSubmitProps {
  doc: WithUid<IOrder> | null;
  closeForm: () => void;
}
