import { User } from 'firebase/auth';

import { IClient } from '../../interface';

export interface IUserContext {
  loading: boolean;
  userAuth: User | null;
  userData: IClient | null;
  forceVerifyLogin: () => void;
}
