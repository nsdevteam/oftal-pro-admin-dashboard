import { getAllData } from 'burnbase/firestore';

import { IUserPrices } from '../../interface';
import { pricesCollectionName } from './prices.utils';

const getPrices = getAllData<IUserPrices>(pricesCollectionName);

export default getPrices;
