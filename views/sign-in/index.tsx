import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { updateUser } from '../../api/user';
import { EyeSlashSVG, EyeSVG } from '../../components/svg';
import LogoSVG from '../../components/svg/logo';
import { RoutePaths, RoutesEnum } from '../../constants/routes';
import { useUser } from '../../context/user';
import { Box, Button, Input, Typography } from '../../elements';
import styles from '../../styles/auth/auth.module.css';
import { loginWithEmailAndPassword } from '../../utils/helpers';

const Home: FC = () => {
  const [loading, setLoading] = useState(false);
  const { userAuth, forceVerifyLogin } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const { push } = useRouter();
     
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onBlur',
  });

  const onLoginSubmit = async () => {
    try {
      const { email, password } = getValues();

      await loginWithEmailAndPassword(email, password).then((credential:any) =>
        updateUser(credential.uid, { lastLoginAt: Date.now() })
      );

      forceVerifyLogin();
      reset();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userAuth && !loading) push('/cart');
  }, [userAuth, loading]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () =>
    toast.promise(onLoginSubmit(), {
      loading: 'Iniciando a sessão',
      success: 'Sessão iniciada com sucesso',
      error: (e) => e.message ?? e ?? 'Erro ao iniciar a sessão',
    });

  return (
    <Box
      as="div"
      height="100vh"
      width={['auto', 'auto', 'auto', '100%']}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
      className={`${styles?.authWrapper} page-form`}        
    >
      <div className={`${styles?.contentWrapper}`}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"   
      >
        <LogoSVG />
        <Typography m="L" fontSize={['0.5rem', '1rem']}>
          Insira os seus dados e clique em prosseguir
        </Typography>
      </Box>
      <form onSubmit={handleSubmit(handleLogin)}>
        <Box pt="1rem">
          <Typography
            fontSize={['0.5rem', '1rem']}
            textAlign="left"
            py="0.5rem"
             className='label'
          >
            Email
          </Typography>
          <Input
            width={['18rem', '30rem']}
            p={['0.5rem', 'L']}
            fontSize={['0.5rem', '1rem']}
            type="email"
            bg="transparent"
            outline="none"
            borderRadius="M"
            border="1px solid #E4E4E7"
            color="textInverted"
            placeholder="johndoe@oftalpro.com"
            nFocus={{
              border: '1px solid #50ADE5',
            }}
            {...register('email', {
              required: 'Campo email é obrigatório',
              max: {
                value: 6,
                message: 'O email deve ter no máximo 6 caracteres',
              },
            })}
          />
          {errors.email && (
            <Typography className="alertDanger">
              {errors.email.message as string}
            </Typography>
          )}
        </Box>
        <Box pt="1rem">
          <Typography
            fontSize={['0.5rem', '1rem']}
            textAlign="left"
            py="0.5rem"
            className='label'
          >
            Senha
          </Typography>
          <Box
            width={['18rem', '30rem']}
            height={['2rem', '3.5rem']}
            color="textInverted"
            borderRadius="M"
            border="1px solid #E4E4E7"
            bg="transparent"
            display="flex"
            flexWrap="nowrap"
            overflow="hidden"
            alignItems="center"
            justifyContent="stretch"
            className='input-wrapper'
          >
            <Input
              width={['18rem', '30rem']}
              height={['100%']}
              p={['M', 'L']}
              fontSize={['0.5rem', '1rem']}
              type={showPassword ? 'text' : 'password'}
              bg="transparent"
              border="none"
              borderRadius="M"
              outline="none"
              minWidth={['100%', '10rem']}
              placeholder="***************"
              nFocus={{
                border: '1px solid #50ADE5',
              }}
              {...register('password', {
                required: 'Campo palavra-passe é obrigatório',
                maxLength: {
                  value: 12,
                  message: 'O email deve ter no máximo 12 caracteres',
                },
              })}
            />
            <Box onClick={togglePasswordVisibility} cursor="pointer" m="0.5rem">
              {showPassword ? (
                <EyeSVG width={16} height={16} />
              ) : (
                <EyeSlashSVG width={16} height={16} />
              )}
            </Box>
          </Box>
          {errors.password && (
            <Typography className="alertDanger">
              {errors.password.message as string}
            </Typography>
          )}
        </Box>
        <div>
        <Button className={`${styles?.authBtn}`} width="100%">Entrar &rarr;</Button>
        </div>

      </form>
      <Box
        as="div"
        display="flex"
        fontSize={['0.5rem', '1rem']}
        justifyContent="center"
        alignItems="center"
      >
        <Typography padding="0.5rem">Esqueceu a sua senha?</Typography>
        <Link className={`${styles?.optionalLink}`} href={RoutePaths[RoutesEnum.ResetPassword]}>
          Solicitar uma nova senha.      
        </Link>
      </Box>
      </div>
      {/* <!-- Powered By Company --> */}
      <div>
        <a className={styles?.poweredByLink} href='https://www.nsdevteam.com' target='_blank'>
          <span className="nsdev-copyright"></span>   
        </a>   
      </div>
      {/* <!-- Whatsapp Support --> */}
      <a href="https://wa.me/244926976310?text=Se%20precisar%20de%20ajuda%20ou%20um%20suporte%20urgente%2C%20entra%20em%20contacto%20via%20WhatsApp%20ou%20liga%20no%20nosso%20número%20de%20telefone%20926%20976%20220"   className="wa-float" target="_blank">
      <span className='wa-icon'></span>    
      </a>
    </Box>
  );
};

export default Home;
