import * as React from 'react';
import { ResponsiveProp } from '../utils/responsive-props';
import type { ObfuscatedClassName } from '../utils/common-types';
type AvatarSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
type Props = ObfuscatedClassName & {
    /** @deprecated Please use `exceptionallySetClassName` */
    className?: string;
    /** @deprecated */
    colorList?: string[];
    size?: ResponsiveProp<AvatarSize>;
    avatarUrl?: string;
    user: {
        name?: string;
        email: string;
    };
};
declare function Avatar({ user, avatarUrl, size, className, colorList, exceptionallySetClassName, ...props }: Props): React.JSX.Element;
declare namespace Avatar {
    var displayName: string;
}
export { Avatar };
