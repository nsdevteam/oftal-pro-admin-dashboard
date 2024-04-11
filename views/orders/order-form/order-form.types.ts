import { WithUid } from 'burnbase/firestore';

import { DropdownProps } from '../../../elements/dropdown/dropdown.types';
import { IOrder } from '../../../interface';

export interface OrderFormProps {
  doc: WithUid<IOrder>;
  closeForm: () => void;
}

export interface OrderFormSubmitProps {
  docId: string;
}

export interface DropdownFieldProps
  extends Pick<
    DropdownProps,
    'label' | 'values' | 'legend' | 'disabled' | 'defaultValue'
  > {
  isBoolean?: boolean;
  name: keyof Omit<IOrder, 'leftEye' | 'rightEye'>;
  allowed?: [
    keyof Omit<IOrder, 'leftEye' | 'rightEye'>,
    ReadonlyArray<string | number>
  ];
}
