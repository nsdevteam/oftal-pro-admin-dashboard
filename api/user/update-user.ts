

import { updateDocument } from '../../utils/helpers';
import { TUpdateUser } from './user.protocol';
import { userCollectionName } from './user.utils';

const updateUser: TUpdateUser = (uid, docData) =>
  updateDocument(userCollectionName, uid, docData);

export default updateUser;     
