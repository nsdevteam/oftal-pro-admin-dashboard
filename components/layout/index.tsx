import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import { useUser } from '../../context/user';
import { Box } from '../../elements';
import Header from './header';
import { LayoutProps } from './layout.types';
import Sidebar from './sidebar';

const Layout: FC<LayoutProps> = ({ pageTitle = '', children }) => {
  const { push } = useRouter();
  const { userAuth, loading } = useUser();
  const [isOpenMenu, setOpenMenu] = useState(false);
  const title = `${pageTitle} | Dashboard do administrador`;

  useEffect(() => {
    if (!userAuth && !loading) push('/');
  }, [userAuth, loading]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
      </Head>
      <Box height="100vh" display="flex" flexDirection="column">
        <Header setOpenMenu={setOpenMenu} />
        <Box width="100%" display="flex" flex="1" overflow="hidden">
          <Sidebar isOpenMenu={isOpenMenu} />
          <Box
            flex="1"
            p="2rem"
            as="main"
            display="flex"
            overflowY="auto"
            flexDirection="column"
          >
            {children}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
