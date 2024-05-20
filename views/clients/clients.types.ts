import { WithUid } from 'burnbase/firestore';

import { IClient } from '../../interface';

export interface IClientForm extends IClient {
  password: string;
  confirmPassword: string;
}

export interface ClientFormProps {
  closeForm: () => void;
  doc: WithUid<IClient> | null;
}

export interface ClientTableProps {
  data: ReadonlyArray<WithUid<IClient>>;
  setSelectedDoc: (data: WithUid<IClient>) => void;
}
