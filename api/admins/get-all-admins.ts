import { getAllData } from 'burnbase/firestore';

import { IAdmin } from '../../interface';
import { adminsCollectionName } from './admins.utils';

const getAllAdmins = getAllData<IAdmin>(adminsCollectionName);

export default getAllAdmins;
