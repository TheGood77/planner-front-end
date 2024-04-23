import { type InputHTMLAttributes, forwardRef } from 'react';
import styles from './TransparentField.module.css';

type TypeTransparentField = InputHTMLAttributes<HTMLInputElement>;

export const TransparentField = forwardRef<HTMLInputElement, TypeTransparentField>(({ className, ...rest }, ref) => {
    return (
        <input
            className={`${styles.transparentInput} ${className || ''}`}
            ref={ref}
            {...rest}
        />
    )
});

TransparentField.displayName = 'TransparentField';