import { WithUid } from 'burnbase/firestore';

import { IOrder } from '../../interface';

export interface OrderTableProps {
  data: ReadonlyArray<WithUid<IOrder>>;
  onSelectDoc: (uid: WithUid<IOrder>) => void;
}
