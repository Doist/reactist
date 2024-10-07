import type { ResponsiveProp, ResponsiveBreakpoints } from '../utils/responsive-props';
import type { Space } from '../utils/common-types';
import type { ReusableBoxProps } from '../box';
type ColumnWidth = 'auto' | 'content' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5';
interface ColumnProps {
    width?: ColumnWidth;
}
declare const Column: import("../utils/polymorphism").PolymorphicComponent<"div", ColumnProps, "obfuscateClassName">;
type ColumnsHorizontalAlignment = 'left' | 'center' | 'right';
type ColumnsVerticalAlignment = 'top' | 'center' | 'bottom' | 'baseline';
type ColumnsCollapseBelow = Exclude<ResponsiveBreakpoints, 'mobile'>;
interface ColumnsProps extends ReusableBoxProps {
    space?: ResponsiveProp<Space>;
    align?: ResponsiveProp<ColumnsHorizontalAlignment>;
    alignY?: ResponsiveProp<ColumnsVerticalAlignment>;
    collapseBelow?: ResponsiveBreakpoints;
}
declare const Columns: import("../utils/polymorphism").PolymorphicComponent<"div", ColumnsProps, "obfuscateClassName">;
export type { ColumnProps, ColumnsProps, ColumnWidth, ColumnsCollapseBelow, ColumnsHorizontalAlignment, ColumnsVerticalAlignment, };
export { Column, Columns };
