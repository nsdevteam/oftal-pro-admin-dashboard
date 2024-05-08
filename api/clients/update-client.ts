import { updateDocument } from 'burnbase/firestore';

import { IClient } from '../../interface';
import { clientsCollectionName } from './clients.utils';

const addClient = async (
  uid: string,
  client: Partial<IClient>
): Promise<void> => {
  await updateDocument(clientsCollectionName, uid, {
    ...client,
    updateAt: Date.now(),
  });
};

export default addClient;
