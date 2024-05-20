import stylin from '@stylin.js/react';
import { FC, forwardRef, PropsWithChildren, PropsWithRef } from 'react';

import { ButtonProps } from './button.types';

const Button: FC<PropsWithRef<PropsWithChildren<ButtonProps>>> = forwardRef(
  (props, ref) => {
    const ButtonElement = stylin('button')();

    return (
      <ButtonElement
        all="unset"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        ref={ref}
        color="#FFF"
        bg="#439ACC"
        padding="1rem"
        display="flex"
        cursor="pointer"
        fontWeight="bold"
        fontSize="0.75rem"
        alignItems="center"
        borderRadius="0.8rem"
        justifyContent="center"
        nHover={{ opacity: 0.8 }}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export default Button;
