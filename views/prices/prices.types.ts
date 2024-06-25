import { WithUid } from 'burnbase/firestore';

import { IUserPrices } from '../../interface';

export interface PriceFormProps {
  closeForm: () => void;
  doc: WithUid<IUserPrices> | null;
}

export interface PriceTableProps {
  data: ReadonlyArray<WithUid<IUserPrices>>;
  setSelectedDoc: (data: WithUid<IUserPrices>) => void;
}
