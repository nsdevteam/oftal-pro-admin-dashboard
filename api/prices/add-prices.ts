
import { addDoc } from 'firebase/firestore';
import { IUserPrices } from '../../interface';
import { pricesDatabase } from '../../utils/helpers';

const addPrices = async (prices: IUserPrices): Promise<void> => {
  await addDoc(pricesDatabase, {
    ...prices,
    createdAt: Date.now(),
  });
};

export default addPrices;
