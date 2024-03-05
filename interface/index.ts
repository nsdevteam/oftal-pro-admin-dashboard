import { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEmptyObject {}

export interface MenuProps {
  id: number;
  url: string;
  title: string;
  icon: ReactNode;
}

export interface OrderFormProps {
  closeForm: () => void;
}

interface IEye {
  axis?: string;
  active: boolean;
  cylinder?: string;
  addition?: string;
  spherical?: string;
}

export interface IClient {
  email: string;
  fullName: string;
  createdAt?: number;
  lastLoginAt?: number;
  phoneNumber?: string;
  clientId: `CL${number}`;
}

export interface IOrder {
  ref: string;
  leftEye?: IEye;
  rightEye?: IEye;
  prisma: boolean;
  precal?: FileList;
  recipe?: FileList;
  diameter: number;
  coloring: boolean;
  observation: string;
  minimumHeight: string;
  refractiveIndex: string | undefined;
  treatment: 'HMC' | 'SHMC' | 'UC' | 'HC';
  color: 'white' | 'photochromatic' | 'transitions' | 'polarised';
  type:
    | 'single-focal'
    | 'boost'
    | 'dynamic'
    | 'extend'
    | 'office'
    | 'invisible'
    | 'bifocal';
}

export interface EyeFieldsProps {
  label: string;
  name: 'rightEye' | 'leftEye';
}

export type TRowData = ReadonlyArray<
  Record<string, string | number | undefined>
>;

export interface TableProps {
  data: TRowData;
  columns: Record<string, string>;
  special?: Record<string, 'date'>;
}

export interface IUserPrices {
  extra: Record<string, number>;
  lens: Record<string, ReadonlyArray<number | null>>;
}
