import { addDocument } from 'burnbase/firestore';

import { IUserPrices } from '../../interface';
import { pricesCollectionName } from './prices.utils';

const addPrices = async (prices: IUserPrices): Promise<void> => {
  await addDocument(pricesCollectionName, {
    ...prices,
    createdAt: Date.now(),
  });
};

export default addPrices;
