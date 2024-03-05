import { FiCreditCard, FiFileText } from 'react-icons/fi';
import { LuUsers2 } from 'react-icons/lu';

import { MenuProps } from '../interface';

export const menuLink: MenuProps[] = [
  {
    id: 1,
    url: '/orders',
    title: 'Pedido',
    icon: <FiFileText size={18} color="#FFF" style={{ margin: '0.5rem' }} />,
  },
  {
    id: 2,
    url: '/clients',
    title: 'Clientes',
    icon: <LuUsers2 size={18} color="#FFF" style={{ margin: '0.5rem' }} />,
  },
  {
    id: 3,
    url: '/account',
    title: 'Conta',
    icon: <FiCreditCard size={18} color="#FFF" style={{ margin: '0.5rem' }} />,
  },
];
