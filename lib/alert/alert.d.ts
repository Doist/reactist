import * as React from 'react';
import type { AlertTone } from '../utils/common-types';
type AllOrNone<T> = T | {
    [K in keyof T]?: never;
};
type AlertCloseProps = AllOrNone<{
    closeLabel: string;
    onClose: () => void;
}>;
type AlertProps = {
    id?: string;
    children: React.ReactNode;
    tone: AlertTone;
} & AlertCloseProps;
declare function Alert({ id, children, tone, closeLabel, onClose }: AlertProps): React.JSX.Element;
export { Alert };
export type { AlertProps };
