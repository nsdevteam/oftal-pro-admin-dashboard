import { logout } from 'burnbase/auth';
import Link from 'next/link';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { menuLink } from '../../../constants';
import { useUser } from '../../../context/user';
import colors from '../../../design-system/light-theme/colors';
import { Box, Button, Typography } from '../../../elements';
import { SidebarProps } from '../layout.types';

const Sidebar: FC<SidebarProps> = ({ isOpenMenu }) => {
  const { handleSubmit } = useForm();
  const { userData, forceVerifyLogin } = useUser();

  const signOut = async () => {
    await logout();
    forceVerifyLogin();
  };

  const handleLogout = () =>
    toast.promise(signOut(), {
      loading: 'Terminando a sessão...',
      success: 'Sessão terminada com sucesso',
      error: 'Error ao terminar sessão',
    });

  return (
    <Box
      as="aside"
      top="4rem"
      bottom="0"
      flexDirection="column"
      alignItems="flex-start"
      color={colors.foreground}
      justifyContent="space-between"
      background={colors.secondary}
      width={['100vw', '100vw', '17rem']}
      position={['fixed', 'fixed', 'static']}
      display={[
        isOpenMenu ? 'flex' : 'none',
        isOpenMenu ? 'flex' : 'none',
        'flex',
      ]}
    >
      <Box as="ul" width="100%">
        {menuLink.map(({ id, url, title, icon }) => (
          <Link key={id} href={url}>
            <Box p="1rem" as="div" gap="0.5rem" color="white" display="flex">
              {icon}
              <Typography
                as="li"
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                {title}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
      <Box
        as="ul"
        width="100%"
        display="flex"
        padding="0.5rem"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Typography padding="0.5rem">{userData?.fullName}</Typography>
        <Typography padding="0.5rem">{userData?.email}</Typography>
        <Button
          bg="#FC6363"
          width="calc(100% - 2rem)"
          onClick={handleSubmit(handleLogout)}
        >
          Terminar a sessão
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
