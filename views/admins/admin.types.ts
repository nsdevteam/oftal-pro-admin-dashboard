import { IAdmin } from '../../interface';

export interface IAdminForm extends IAdmin {
  password: string;
  confirmPassword: string;
}

export interface AdminFormProps {
  closeForm: () => void;
  doc?:any;   
}
