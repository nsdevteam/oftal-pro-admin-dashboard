import Link from 'next/link';
import { FC, useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import LogoSVG from '../../components/svg/logo';
import { RoutePaths, RoutesEnum } from '../../constants/routes';
import { Box, Button, Input, Typography } from '../../elements';
import styles from '../../styles/auth/auth.module.css';
import toast from 'react-hot-toast';
import { auth } from '../../api/init';
import { useForm } from 'react-hook-form';
const ResetPasswordPage: FC = () => {       
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    reValidateMode: 'onBlur',
  });

  const handleResetPassword = async (e:any) => {
    e.preventDefault();
    const {email} = getValues();
    try {
      await sendPasswordResetEmail(auth, email);
      toast("Foi enviado um e-mail para a sua caixa de correio eletrônico. Por favor siga as instruções para resetar a sua conta.");
      setTimeout(()=>{
          window.location.href="/"   
      },3000)
    } catch (err:any) {
      console.error(err.message);
      toast("Por favor tenta mais tarde ou entre em contacto com o a equipe tecnica. ERR_RESET_PASSWD_770");
    }
  };

  return(
    <>
  <Box
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
          Insira o email para a recuperação      
        </Typography>
      </Box>
      <form>
        <Box pt="1rem">
          <Typography className='label' fontSize={['0.5rem', '1rem']} textAlign="left" py="0.5rem">
            Endereço de email
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
        </Box>
        <Button onClick={($event)=>{handleResetPassword($event)}} className={`${styles?.authBtn}`}>Recuperar &rarr;</Button>     
      </form>
      <Box
        as="div"
        display="flex"
        fontSize={['0.5rem', '1rem']}
        justifyContent="center"
        alignItems="center"
          
      >
        <Link className={`${styles?.optionalLink}`} href={RoutePaths[RoutesEnum.Home]}>
          Voltar para a página de login.
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
      <a href="https://wa.me/244926976310?text=Se%20precisar%20de%20ajuda%20ou%20um%20suporte%20urgente%2C%20entra%20em%20contacto%20via%20WhatsApp%20ou%20liga%20no%20nosso%20número%20de%20telefone%20937%20464%20550"   className="wa-float" target="_blank">
      <span className='wa-icon'></span>    
      </a>
  </Box>
  </>)
};

export default ResetPasswordPage;
  