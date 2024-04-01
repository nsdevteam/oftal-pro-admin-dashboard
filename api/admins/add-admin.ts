import { addDocument } from 'burnbase/firestore';

import { IAdmin } from '../../interface';
import { adminsCollectionName } from './admins.utils';

const addAdmin = async (admin: IAdmin): Promise<void> => {
  await addDocument(adminsCollectionName, admin);
};

export default addAdmin;
