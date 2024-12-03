
import { getAllData } from '../../utils/helpers';

const ordersCollectionName = 'orders';

const getAllOrders = getAllData(ordersCollectionName);

export default getAllOrders;
