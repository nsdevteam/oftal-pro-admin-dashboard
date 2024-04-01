import { getAllData } from 'burnbase/firestore';

import { IClient } from '../../interface';
import { clientsCollectionName } from './clients.utils';

const getAllClients = getAllData<IClient>(clientsCollectionName);

export default getAllClients;
