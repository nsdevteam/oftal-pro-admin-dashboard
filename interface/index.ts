import { ReactNode } from 'react';

import { COLOR_LEGEND } from './../views/orders/order-form/order-form.data';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEmptyObject {}

export interface MenuProps {
  id: number;
  url: string;
  title: string;
  icon: ReactNode;
}

export enum orderStatusEnum {
  Pendente,
  Encomendado,
}

export enum clientTypeEnum {
  'Tipo 1',
  'Tipo 2',
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

export interface IAdmin {
  email: string;
  fullName: string;
  lastLoginAt?: number;
}

export interface IClient {
  email: string;
  priceId: string;
  fullName: string;
  createdAt?: number;
  lastLoginAt?: number;
  phoneNumber?: string;
  type: clientTypeEnum;
  clientId: `CL${number}`;
}

export interface IOrder {
  ref: string;
  leftEye?: IEye;
  rightEye?: IEye;
  prisma: boolean;
  diameter: number;
  coloring: boolean;
  precal?: FileList;
  recipe?: FileList;
  createdAt?: number;
  observation: string;
  minimumHeight: string;
  clientId: `CL${number}`;
  status: orderStatusEnum;
  precals?: ReadonlyArray<string>;
  recipes?: ReadonlyArray<string>;
  refractiveIndex: string | undefined;
  treatment: 'HMC' | 'SHMC' | 'UC' | 'HC';
  color: 'white' | 'photochromatic' | 'transitions' | 'polarized';
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
  Record<string, ReactNode | string | number | undefined>
>;

export interface TableProps {
  data: TRowData;
  columns: Record<string, string>;
  special?: Record<string, 'date'>;
  onSelect?: (index: number) => void;
}

export interface IUserPrices {
  name: string;
  description?: string;
  extra: Record<string, number>;
  lens: Record<
    keyof typeof COLOR_LEGEND,
    Record<string, ReadonlyArray<number | null>>
  >;
}
