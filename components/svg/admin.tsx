import { FC } from 'react';

import { SVGProps } from './svg.types';

const Admin: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 18 21"
    fill="none"
    {...props}
  >
    <path
      d="M8 13V15C6.4087 15 4.88258 15.6321 3.75736 16.7574C2.63214 17.8826 2 19.4087 2 21H0C0 18.8783 0.842855 16.8434 2.34315 15.3431C3.84344 13.8429 5.87827 13 8 13ZM8 12C4.685 12 2 9.315 2 6C2 2.685 4.685 0 8 0C11.315 0 14 2.685 14 6C14 9.315 11.315 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10ZM17 16H18V21H10V16H11V15C11 14.2044 11.3161 13.4413 11.8787 12.8787C12.4413 12.3161 13.2044 12 14 12C14.7956 12 15.5587 12.3161 16.1213 12.8787C16.6839 13.4413 17 14.2044 17 15V16ZM15 16V15C15 14.7348 14.8946 14.4804 14.7071 14.2929C14.5196 14.1054 14.2652 14 14 14C13.7348 14 13.4804 14.1054 13.2929 14.2929C13.1054 14.4804 13 14.7348 13 15V16H15Z"
      fill="currentColor"
    />
  </svg>
);

export default Admin;
