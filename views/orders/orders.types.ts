import { WithUid } from 'burnbase/firestore';

import { IOrder } from '../../interface';

export interface OrdersTableProps {
  onSelect?: (docId: string) => void;
  selectedList?: ReadonlyArray<string>;
  setSelectedList?:any;   
  data: ReadonlyArray<WithUid<IOrder>>;
  setSelectedDoc: (data: WithUid<IOrder>) => void;
  customData?:any;
  displaySelectCheckbox?:boolean;    
}
   