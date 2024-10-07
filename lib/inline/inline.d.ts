import type { ResponsiveProp } from '../utils/responsive-props';
import type { Space } from '../utils/common-types';
import type { ReusableBoxProps } from '../box';
type InlineAlign = 'left' | 'center' | 'right';
interface InlineProps extends ReusableBoxProps {
    space?: ResponsiveProp<Space>;
    align?: ResponsiveProp<InlineAlign>;
    alignY?: ResponsiveProp<'top' | 'center' | 'bottom'>;
}
declare const Inline: import("../utils/polymorphism").PolymorphicComponent<"div", InlineProps, "obfuscateClassName">;
export type { InlineProps, InlineAlign };
export { Inline };
