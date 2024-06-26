import { FiCreditCard, FiFileText } from 'react-icons/fi';
import { LuUsers2 } from 'react-icons/lu';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

import Admin from '../components/svg/admin';
import { MenuProps } from '../interface';

export const menuLink: MenuProps[] = [
  {
    id: 0,
    url: '/orders',
    title: 'Encomendas',
    icon: <FiFileText size={18} color="#FFF" />,
  },
  {
    id: 1,
    url: '/clients',
    title: 'Clientes',
    icon: <LuUsers2 size={18} color="#FFF" />,
  },
  {
    id: 2,
    url: '/prices',
    title: 'Preços',
    icon: <RiMoneyDollarCircleFill size={18} color="#FFF" />,
  },
  {
    id: 3,
    url: '/admins',
    title: 'Administradores',
    icon: <Admin maxWidth="1.1rem" maxHeight="1.1rem" width="100%" />,
  },
  {
    id: 4,
    url: '/account',
    title: 'Conta',
    icon: <FiCreditCard size={18} color="#FFF" />,
  },
];
