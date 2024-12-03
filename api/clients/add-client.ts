

import { addDoc } from 'firebase/firestore';
import { IClient } from '../../interface';
import { clientsDatabase } from '../../utils/helpers';

const addClient = async (client: IClient): Promise<void> => {
  await addDoc(clientsDatabase, {
    ...client,
    createdAt: Date.now(),
  });
};

export default addClient;
