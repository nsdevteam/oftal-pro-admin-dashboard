import { Dispatch, SetStateAction } from 'react';

export interface DropdownProps {
  label?: string;
  disabled?: boolean;
  values: ReadonlyArray<string>;
  defaultValue?: string | number;
  legend?: Record<string, string>;
  onSelect: (value: string) => void;
  openState?: [boolean, Dispatch<SetStateAction<boolean>>];
}
