import { orderStatusEnum } from '../../interface';

export const ADDITION_VALUES = Array.from(
  { length: 13 },
  (_, index) => 0.5 + 0.25 * index
);

export const CYLINDER_VALUES = Array.from(
  { length: 49 },
  (_, index) => 6 - 0.25 * index
);

export const SPHERICAL_VALUES = Array.from(
  { length: 161 },
  (_, index) => 20 - 0.25 * index
);

export const AXIS_VALUES = Array.from({ length: 181 }, (_, index) => 0 + index);

export const ADDITION_VALUES_LEGEND = ADDITION_VALUES.reduce(
  (acc, value) => ({
    ...acc,
    [value]: value.toFixed(2).replace('+', '').replace('.', ','),
  }),
  {}
);

export const CYLINDER_VALUES_LEGEND = CYLINDER_VALUES.reduce(
  (acc, value) => ({
    ...acc,
    [value]: value.toFixed(2).replace('+', '').replace('.', ','),
  }),
  {}
);

export const SPHERICAL_VALUES_LEGEND = SPHERICAL_VALUES.reduce(
  (acc, value) => ({
    ...acc,
    [value]: value.toFixed(2).replace('+', '').replace('.', ','),
  }),
  {}
);

export const AXIS_VALUES_LEGEND = AXIS_VALUES.reduce(
  (acc, value) => ({
    ...acc,
    [value]: `${value}º`,
  }),
  {}
);

export const STATUS_LEGEND = {
  [orderStatusEnum.Pendente]: 'Pendente',
  [orderStatusEnum.Encomendado]: 'Encomendado',
};

export const TREATMENT_VALUES = ['HMC', 'SHMC', 'UC', 'HC'];

export const TYPE_VALUES = [
  'single-focal',
  'boost',
  'dynamic',
  'extend',
  'office',
  'invisible',
  'bifocal',
];

export const TYPE_LEGEND = {
  ['single-focal']: 'Unifocal Fabrico',
  ['boost']: 'Anti-Fadiga BOOST',
  ['dynamic']: 'Progressiva Free-Form DYNAMIC',
  ['extend']: 'Progressiva Free-Form EXTENDED',
  ['office']: 'Regressiva OFFICE',
  ['invisible']: 'Bifocal Free-Form INVISIBLE',
  ['bifocal']: 'Bifocal',
};

export const COLOR_VALUES = [
  'white',
  'photochromatic',
  'transitions',
  'polarized',
];

export const COLOR_LEGEND = {
  white: 'Branca',
  photochromatic: 'Fotocromática',
  transitions: 'Transitions',
  polarized: 'Polarizada',
};

export const REFRACTIVE_VALUES: Record<
  string,
  Record<string, ReadonlyArray<string>>
> = {
  white: {
    '1.5': TYPE_VALUES,
    '1.5 Lenticular+': TYPE_VALUES.slice(0, 1),
    '1.56': TYPE_VALUES,
    '1.56 UV420 Blue Cut': TYPE_VALUES.slice(0, -1),
    '1.56 Bi-Concavo -': TYPE_VALUES.slice(0, 1),
    '1.59 Policabonato': TYPE_VALUES.slice(0, -1),
    '1.6': TYPE_VALUES.slice(0, -1),
    '1.6 UV420 Blue Cut': TYPE_VALUES.slice(0, -1),
    '1.67': TYPE_VALUES.slice(0, -1),
    '1.67 UV420 Blue Cut': TYPE_VALUES.slice(0, -1),
    '1.74': TYPE_VALUES.slice(0, -1),
    '1.74 UV420 Blue Cut': TYPE_VALUES.slice(0, -1),
  },
  photochromatic: {
    '1.56': TYPE_VALUES,
    '1.56 UV420 Blue Cut': TYPE_VALUES.slice(0, -1),
    '1.59 Policabonato': TYPE_VALUES.slice(0, -1),
    '1.6': TYPE_VALUES.slice(0, -1),
    '1.6 UV420 Blue Cut': TYPE_VALUES.slice(0, -1),
    '1.67': TYPE_VALUES.slice(0, -1),
    '1.67 UV420 Blue Cut': TYPE_VALUES.slice(0, -1),
  },
  transitions: {
    '1.5': TYPE_VALUES.slice(0, -1),
    '1.6': TYPE_VALUES.slice(0, -1),
    '1.67': TYPE_VALUES.slice(0, -1),
  },
  polarised: {
    '1.5': TYPE_VALUES.slice(0, -1),
    '1.56': TYPE_VALUES.slice(0, -1),
    '1.6': TYPE_VALUES.slice(0, -1),
    '1.67': TYPE_VALUES.slice(0, -1),
  },
};
