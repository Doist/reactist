import * as React from 'react';
import './input.less';
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}
/**
 * @deprecated
 */
declare const Input: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLInputElement>>;
export { Input };
