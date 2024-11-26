import { getAllData } from '../../utils/helpers';
import { clientsCollectionName } from './clients.utils';

const getAllClients = getAllData(clientsCollectionName);

export default getAllClients;    
