
import { getDocument } from '../../utils/helpers';
import { TGetUser } from './user.protocol';
import { userCollectionName } from './user.utils';

const getUser: TGetUser = (docId) =>
  getDocument(userCollectionName, docId).catch((error) => error);

export default getUser;
