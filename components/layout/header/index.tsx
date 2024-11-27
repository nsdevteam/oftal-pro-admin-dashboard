import { FC } from 'react';

import colors from '../../../design-system/light-theme/colors';
import { Box } from '../../../elements';
import { LogoSVG, MenuSVG } from '../../svg';
import { HeaderProps } from '../layout.types';

const Header: FC<HeaderProps> = ({ setOpenMenu }) => (
  <Box
    px="1rem"
    as="header"
    width="100%"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    className="dash-header"
  >
    <Box
      cursor="pointer"
      display={['block', 'block', 'none']}
      onClick={() => setOpenMenu((v) => !v)}
    >
      <MenuSVG maxWidth="1.5rem" maxHeight="1.5rem" width="100%%" />
    </Box>
    <Box
      py="2rem"
      height={35}
      display="inline-flex"
      alignItems="center"
      background={colors.foreground}
    >
      <LogoSVG width={200} height={30} />
    </Box>
  </Box>
);

export default Header;
