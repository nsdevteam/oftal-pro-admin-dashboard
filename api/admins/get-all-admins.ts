import { getAllData } from '../../utils/helpers';
import { adminsCollectionName } from './admins.utils';

const getAllAdmins = getAllData(adminsCollectionName);

export default getAllAdmins;         
