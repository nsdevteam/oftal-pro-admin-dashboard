import { addDocument } from 'burnbase/firestore';

import { IClient } from '../../interface';
import { clientsCollectionName } from './clients.utils';

const addClient = async (client: IClient): Promise<void> => {
  await addDocument(clientsCollectionName, {
    ...client,
    createdAt: Date.now(),
  });
};

export default addClient;
