
import { IUserPrices } from '../../interface';
import { getAllData } from '../../utils/helpers';
import { pricesCollectionName } from './prices.utils';

const getPrices = getAllData(pricesCollectionName);

export default getPrices;
