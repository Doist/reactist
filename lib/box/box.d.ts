import type { ResponsiveProp } from '../utils/responsive-props';
import type { DividerWeight, Space, SpaceWithNegatives, WithEnhancedClassName } from '../utils/common-types';
interface BoxPaddingProps {
    padding?: ResponsiveProp<Space>;
    paddingX?: ResponsiveProp<Space>;
    paddingY?: ResponsiveProp<Space>;
    paddingTop?: ResponsiveProp<Space>;
    paddingRight?: ResponsiveProp<Space>;
    paddingBottom?: ResponsiveProp<Space>;
    paddingLeft?: ResponsiveProp<Space>;
}
interface BoxMarginProps {
    margin?: ResponsiveProp<SpaceWithNegatives>;
    marginX?: ResponsiveProp<SpaceWithNegatives>;
    marginY?: ResponsiveProp<SpaceWithNegatives>;
    marginTop?: ResponsiveProp<SpaceWithNegatives>;
    marginRight?: ResponsiveProp<SpaceWithNegatives>;
    marginBottom?: ResponsiveProp<SpaceWithNegatives>;
    marginLeft?: ResponsiveProp<SpaceWithNegatives>;
}
type BoxDisplay = 'block' | 'flex' | 'inline' | 'inlineBlock' | 'inlineFlex' | 'none';
type BoxFlexDirection = 'column' | 'row';
type BoxFlexWrap = 'nowrap' | 'wrap';
type BoxAlignItems = 'center' | 'flexEnd' | 'flexStart' | 'baseline';
type BoxJustifyContent = 'center' | 'flexEnd' | 'flexStart' | 'spaceAround' | 'spaceBetween' | 'spaceEvenly';
type BoxAlignSelf = 'flexStart' | 'flexEnd' | 'center' | 'baseline' | 'stretch';
type BoxOverflow = 'hidden' | 'auto' | 'visible' | 'scroll';
type BoxMaxMinWidth = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
type BoxMinWidth = 0 | BoxMaxMinWidth;
type BoxMaxWidth = BoxMaxMinWidth | 'full';
type BoxWidth = 0 | BoxMaxMinWidth | 'full' | 'auto' | 'maxContent' | 'minContent' | 'fitContent';
type BoxBackground = 'default' | 'aside' | 'highlight' | 'selected' | 'toast';
type BoxBorderRadius = 'standard' | 'none' | 'full';
interface BorderProps {
    borderRadius?: BoxBorderRadius;
    border?: DividerWeight;
}
interface ReusableBoxProps extends BorderProps, BoxPaddingProps {
    minWidth?: BoxMinWidth;
    maxWidth?: BoxMaxWidth;
    width?: BoxWidth;
    background?: BoxBackground;
    flexGrow?: 0 | 1;
    flexShrink?: 0;
}
type BoxPosition = 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky';
type BoxTextAlign = 'start' | 'center' | 'end' | 'justify';
interface BoxProps extends WithEnhancedClassName, ReusableBoxProps, BoxMarginProps {
    position?: ResponsiveProp<BoxPosition>;
    display?: ResponsiveProp<BoxDisplay>;
    flexDirection?: ResponsiveProp<BoxFlexDirection>;
    flexWrap?: BoxFlexWrap;
    gap?: ResponsiveProp<Space | 'none'>;
    alignItems?: ResponsiveProp<BoxAlignItems>;
    alignSelf?: ResponsiveProp<BoxAlignSelf>;
    justifyContent?: ResponsiveProp<BoxJustifyContent>;
    overflow?: BoxOverflow;
    height?: 'full';
    textAlign?: ResponsiveProp<BoxTextAlign>;
}
declare function getBoxClassNames({ position, display, flexDirection, flexWrap, flexGrow, flexShrink, gap, alignItems, justifyContent, alignSelf, overflow, width, height, background, border, borderRadius, minWidth, maxWidth, textAlign, padding, paddingY, paddingX, paddingTop, paddingRight, paddingBottom, paddingLeft, margin, marginY, marginX, marginTop, marginRight, marginBottom, marginLeft, className, }: BoxProps): string;
declare const Box: import("../utils/polymorphism").PolymorphicComponent<"div", BoxProps, "keepClassName">;
export type { BoxProps, BoxPaddingProps, BoxMarginProps, ReusableBoxProps, BoxMinWidth, BoxMaxWidth, BoxDisplay, BoxPosition, BoxFlexDirection, BoxFlexWrap, BoxAlignItems, BoxJustifyContent, BoxOverflow, BoxTextAlign, BoxBackground, BoxBorderRadius, };
export { Box, getBoxClassNames };
