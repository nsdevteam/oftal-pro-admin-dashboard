import Link from 'next/link';
import { FC } from 'react';

import { Layout } from '../../components';
import LogoSVG from '../../components/svg/logo';
import { RoutePaths, RoutesEnum } from '../../constants/routes';
import { Box, Button, Input, Typography } from '../../elements';

const Setting: FC = () => (
  <Layout pageTitle="Configurações">
    <Box
      as="div"
      height="90vh"
      width="80vw"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      <Box
        as="div"
        height="100%"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
      >
        <Typography padding="0.5rem">Setting page</Typography>
      </Box>
    </Box>
  </Layout>
);

export default Setting;
