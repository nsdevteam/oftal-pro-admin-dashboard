import { getAllData } from 'burnbase/firestore';

import { IClient } from '../../interface';
import { clientsCollectionName } from './clients.utis';

const getAllClients = getAllData<IClient>(clientsCollectionName);

export default getAllClients;
