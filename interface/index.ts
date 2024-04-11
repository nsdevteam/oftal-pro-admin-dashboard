import { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEmptyObject {}

export interface MenuProps {
  id: number;
  url: string;
  title: string;
  icon: ReactNode;
}

interface IEye {
  axis?: string;
  active: boolean;
  cylinder?: string;
  addition?: string;
  spherical?: string;
}

export interface IAdmin {
  email: string;
  fullName: string;
  lastLoginAt?: number;
}

export interface IClient {
  type: number;
  email: string;
  fullName: string;
  createdAt?: number;
  lastLoginAt?: number;
  phoneNumber?: string;
  clientId: `CL${number}`;
}

export interface IOrder {
  status: 'pending' | 'solved';
  ref: string;
  leftEye?: IEye;
  rightEye?: IEye;
  prisma: boolean;
  diameter: number;
  coloring: boolean;
  precal?: FileList;
  recipe?: FileList;
  observation: string;
  minimumHeight: string;
  precals?: ReadonlyArray<string>;
  recipes?: ReadonlyArray<string>;
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

export type TRowData = ReadonlyArray<
  Record<string, string | number | undefined>
>;

export interface TableProps {
  data: TRowData;
  columns: Record<string, string>;
  special?: Record<string, 'date'>;
  onSelect: (item: Record<string, string | number | undefined>) => void;
}

export interface IUserPrices {
  extra: Record<string, number>;
  lens: Record<string, ReadonlyArray<number | null>>;
}
