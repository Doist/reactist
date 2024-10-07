import type { ResponsiveProp } from '../utils/responsive-props';
import type { DividerWeight, Space } from '../utils/common-types';
import type { ReusableBoxProps } from '../box';
type Align = 'start' | 'center' | 'end';
interface StackProps extends ReusableBoxProps {
    /** Space between items */
    space?: ResponsiveProp<Space>;
    /** Align items horizontally */
    align?: ResponsiveProp<Align>;
    /** The weight of the dividers to add. Defaults to 'none', which means no dividers are added */
    dividers?: DividerWeight;
}
declare const Stack: import("../utils/polymorphism").PolymorphicComponent<"div", StackProps, "obfuscateClassName">;
export type { StackProps };
export { Stack };
