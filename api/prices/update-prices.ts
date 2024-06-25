import { updateDocument } from 'burnbase/firestore';

import { IUserPrices } from '../../interface';
import { pricesCollectionName } from './prices.utils';

const updatePrices = async (
  uid: string,
  prices: Partial<IUserPrices>
): Promise<void> => {
  await updateDocument(pricesCollectionName, uid, {
    ...prices,
    updateAt: Date.now(),
  });
};

export default updatePrices;
