import * as React from 'react';
import type { DividerWeight } from '../utils/common-types';
interface DividerProps {
    weight?: Exclude<DividerWeight, 'none'>;
}
declare function Divider({ weight, ...props }: DividerProps): React.JSX.Element;
export type { DividerProps, DividerWeight };
export { Divider };
