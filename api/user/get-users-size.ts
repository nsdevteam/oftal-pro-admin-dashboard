import { getCollectionSize } from 'burnbase/firestore';

import { TGetUsersSize } from './user.protocol';
import { userCollectionName } from './user.utils';

const getEntitiesSize: TGetUsersSize = (setter, queryParams) =>
  getCollectionSize(userCollectionName, queryParams);

export default getEntitiesSize;
