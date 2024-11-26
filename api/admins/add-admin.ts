import { addDoc } from 'firebase/firestore';

import { IAdmin } from '../../interface';
import { adminsDatabase } from '../../utils/helpers';

const addAdmin = async (admin: IAdmin): Promise<void> => {
  await addDoc(adminsDatabase, admin);
};

export default addAdmin;
