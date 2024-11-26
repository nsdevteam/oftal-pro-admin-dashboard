

import { IUserPrices } from '../../interface';
import { updateDocument } from '../../utils/helpers';
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
