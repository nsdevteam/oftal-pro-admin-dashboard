import { IClient } from '../../interface';

export interface IClientForm extends IClient {
  password: string;
  confirmPassword: string;
}

export interface ClientFormProps {
  closeForm: () => void;
}
