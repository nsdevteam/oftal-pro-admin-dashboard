import { FC } from 'react';

import { Layout } from '../../components';
import { Box, Button, Input, Typography } from '../../elements';

const AccountPage: FC = () => (
  <Layout pageTitle="Oftal Pro">
    <Box
      as="div"
      maxWidth="100%"
      height="90vh"
      width="80vw"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      alignContent="flex-start"
      padding="1rem"
      className='page-form account-page'
    >
      <Typography className='page-title' padding="0.5rem">Dados do usuário</Typography>
      <Box className='content' as="div" width="80%" padding="0.5rem" marginTop="2rem">
        <Typography className='page-subtitle' padding="1rem">Actualizar os seus dados</Typography>
        <Box
          as="form"
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Box
            as="div"
            width="100vw"
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Box
              as="div"
              margin="0.5rem"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography className='label' textAlign="left" padding="0.5rem">
                Primeiro nome
              </Typography>
              <Input
                p="L"
                type="text"
                outline="none"
                borderRadius="M"
                border="1px solid #E4E4E7"
                color="textInverted"
                mr={['NONE', 'S']}
                ml={['NONE', 'S']}
                minWidth={['100%', '10rem']}
                width={['30rem', 'NONE']}
                bg="transparent"
                placeholder="john"
                nFocus={{
                  borderColor: '#A6A6A6',
                }}
              />
            </Box>
            <Box
              as="div"
              margin="0.5rem"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography className='label' textAlign="left" padding="0.5rem">
                Sobrenome
              </Typography>
              <Input
                p="L"
                type="text"
                outline="none"
                borderRadius="M"
                border="1px solid #E4E4E7"
                color="textInverted"
                bg="transparent"
                mr={['NONE', 'S']}
                ml={['NONE', 'S']}
                minWidth={['100%', '10rem']}
                width={['30rem']}
                placeholder="Doe"
                nFocus={{
                  borderColor: '#A6A6A6',
                }}
              />
            </Box>
          </Box>
          <Box
            as="div"
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Box
              as="div"
              margin="0.5rem"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography className='label' textAlign="left" padding="0.5rem">
                Endereço de email
              </Typography>
              <Input
                p="L"
                type="email"
                outline="none"
                borderRadius="M"
                border="1px solid #E4E4E7"
                color="textInverted"
                mr={['NONE', 'S']}
                ml={['NONE', 'S']}
                minWidth={['100%', '10rem']}
                width={['30rem']}
                bg="transparent"
                placeholder="johndoe@oftalpro.com"
                nFocus={{
                  borderColor: '#A6A6A6',
                }}
              />
            </Box>
            <Box
              as="div"
              margin="0.5rem"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography className='label' textAlign="left" padding="0.5rem">
                Número de telefone
              </Typography>
              <Input
                p="L"
                type="number"
                outline="none"
                borderRadius="M"
                border="1px solid #E4E4E7"
                color="textInverted"
                mr={['NONE', 'S']}
                ml={['NONE', 'S']}
                minWidth={['100%', '10rem']}
                width={['30rem']}
                bg="transparent"
                placeholder="(+244) 945 000 000"
                nFocus={{
                  borderColor: '#A6A6A6',
                }}
              />
            </Box>
          </Box>
          <Box
            as="div"
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
          >
            <Box
              as="div"
              margin="0.5rem"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography className='label' textAlign="left" padding="0.5rem">
                Data de criação de conta
              </Typography>
              <Input
                p="L"
                type="date"
                outline="none"
                borderRadius="M"
                border="1px solid #E4E4E7"
                color="textInverted"
                mr={['NONE', 'S']}
                ml={['NONE', 'S']}
                minWidth={['100%', '10rem']}
                width={['30rem']}
                bg="transparent"
                placeholder="10-02-2019"
                nFocus={{
                  borderColor: '#A6A6A6',
                }}
              />
            </Box>
            <Box
              as="div"
              margin="0.5rem"
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Typography className='label' textAlign="left" padding="0.5rem">
                Última data de login
              </Typography>
              <Input
                p="L"
                type="date"
                outline="none"
                borderRadius="M"
                border="1px solid #E4E4E7"
                marginLeft="0.5rem"
                color="textInverted"
                mr={['NONE', 'S']}
                ml={['NONE', 'S']}
                minWidth={['100%', '10rem']}
                width={['30rem']}
                bg="transparent"
                placeholder="20-03-2020"
                nFocus={{
                  borderColor: '#A6A6A6',
                }}
              />
            </Box>
          </Box>
          <Button minWidth={['100%', '10rem']}>Salvar</Button>
        </Box>
      </Box>
    </Box>
  </Layout>
);

export default AccountPage;
