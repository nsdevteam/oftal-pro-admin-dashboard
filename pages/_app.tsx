import '../api/init';
import { Global } from '@emotion/react';
import { AppProps } from 'next/app';
import { ReactElement, StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '../context/user';
import GlobalStyles from '../design-system/global-styles';
import '../styles/global.css';  
    
const App = ({ Component, pageProps }: AppProps): ReactElement => (
  <StrictMode>
    <UserProvider>
    <Global styles={GlobalStyles} />
        <Component {...pageProps} />
        <Toaster />
    </UserProvider>
  </StrictMode>
);     

export default App;
        