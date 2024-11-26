import { WithUid } from 'burnbase/firestore';

import { IOrder } from '../../interface';

export interface OrdersTableProps {
  data: ReadonlyArray<WithUid<IOrder>>;
  setSelectedDoc: (data: WithUid<IOrder>) => void;
}
   