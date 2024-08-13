/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react'
import type { ObfuscatedClassName } from './common-types'

type Merge<P1, P2> = Omit<P1, keyof P2> & P2

type EmptyObject = {
    [K in any]: never
}

type ObfuscateClassNameMode = 'keepClassName' | 'obfuscateClassName' | 'omitClassName'

/**
 * If a set of props include the `className` prop, we replace it with a `exceptionallySetClassName`
 * prop instead.
 *
 * This can be customized via the second generic parameter, as there are cases where it may be
 * needed to omit this behaviour and keep the `className`. You can also instruct it to remove the
 * `className` prop while not replacing it with the `exceptionallySetClassName` one.
 *
 * @see ObfuscatedClassName['exceptionallySetClassName'] for details about this prop
 * @see PolymorphicComponent for details about this feature
 */
type WithObfuscatedClassName<
    Props,
    ShouldObfuscateClassName extends ObfuscateClassNameMode
> = 'className' extends keyof Props
    ? ShouldObfuscateClassName extends 'obfuscateClassName'
        ? Omit<Props, 'className'> & ObfuscatedClassName
        : ShouldObfuscateClassName extends 'omitClassName'
        ? Omit<Props, 'className'>
        : ShouldObfuscateClassName extends 'keepClassName'
        ? Props
        : never
    : Props

type PolymorphicProp<ComponentType extends React.ElementType> = {
    /**
     * Used to instruct this component what React element to render as. It can be both a string
     * representing a HTML tag name, or a React component.
     *
     * When using this prop, the component you apply it to will also recognize in its props types
     * all the props from the component or HTML element you are rendering it as.
     *
     * Some uses for this feature:
     *
     * - Using some of our layout components, while at the same time being able to set them to use
     *   semantic HTML elements needed for accessibility purposes (e.g. `nav`, `main`, etc).
     * - Using a design system link component, but have it internally use a client-side router link
     *   implemented via a React component (e.g. react-router's `Link`).
     *
     * Keep in mind that not all compositions of this kind may work well, especially when composing
     * with another React component and not with a HTML tag name. In particular, if the components
     * being composed have opposing concerns of clashing features (e.g. they have contradicting
     * styles applied to them) things may not go well. In those cases prefer to nest them instead.
     *
     * @see PolymorphicComponent
     */
    as?: ComponentType
}

/**
 * Given a component or element type, and a set of additional props, this builds the entire set of
 * props for a polymorphic component.
 *
 * It does three things:
 *
 * 1. it merges the element type props with the `OwnProps`
 * 2. it adds the `as` prop to allow for polymorphism to happen
 * 3. it optionally obfuscates or omits the className prop if present
 *
 * @see PolymorphicProp
 * @see WithObfuscatedClassName
 */
type PolymorphicComponentProps<
    ComponentType extends React.ElementType,
    OwnProps,
    ShouldObfuscateClassName extends ObfuscateClassNameMode
> = Merge<
    WithObfuscatedClassName<React.ComponentProps<ComponentType>, ShouldObfuscateClassName>,
    OwnProps & PolymorphicProp<ComponentType>
>

type ElementTagNameMap = HTMLElementTagNameMap &
    Pick<SVGElementTagNameMap, Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>>

type ElementByTag<TagName extends keyof ElementTagNameMap> = ElementTagNameMap[TagName]

type ElementByTagOrAny<
    ComponentType extends React.ElementType
> = ComponentType extends keyof ElementTagNameMap ? ElementByTag<ComponentType> : any

/**
 * The function passed to React.forwardRef, but typed in a way that's prepared for polymorphism via
 * the `as` prop. It also allows to specify if the `className` prop should be obfuscated or omitted.
 *
 * @see PolymorphicComponentProps
 * @see WithObfuscatedClassName
 */
interface ForwardRefFunction<
    ComponentType extends React.ElementType,
    OwnProps,
    ShouldObfuscateClassName extends ObfuscateClassNameMode
> {
    (
        props: PolymorphicComponentProps<ComponentType, OwnProps, ShouldObfuscateClassName>,
        ref:
            | ((instance: ElementByTagOrAny<ComponentType> | null) => void)
            | React.MutableRefObject<ElementByTagOrAny<ComponentType> | null>
            | null,
    ): React.ReactElement | null
    displayName?: string
}

/**
 * A component that can customize the React element type that it renders (a.k.a. a polymorphic
 * component). This is achieved by passing a prop `as={ElementType}` or `as="html-tag-name"`.
 *
 * It transparently takes care of forwarding refs, and properly sets the ref type depending on the
 * element type.
 *
 * ## Recognizing props based on the polymorphic type
 *
 * The `ComponentType` argument sets the default type for the `as` prop. Whatever the `as` prop
 * component or HTML element is, the type system will automatically allow you to pass props that are
 * not explicitly defined by you, but that are recognized as valid props to be passed to the
 * component you are rendering.
 *
 * For instance, see the following example:
 *
 * ```jsx
 * <Box as="label" htmlFor="field-id">Hello</Box>
 * ```
 *
 * The `htmlFor` prop is exclusive to label elements. If you omit the `as="label"` prop, the type
 * system will consider the `htmlFor` prop to be an error. The same happens if you pass a value of
 * an incorrect type to such prop. For instance, the example below will issue a type error:
 *
 * ```jsx
 * <Box as="label" htmlFor={123}>Hello</Box>
 * ```
 *
 * ## Omitting or obfuscating the `className` prop
 *
 * If a set of props include the `className` prop, we replace it with a `exceptionallySetClassName`
 * prop instead.
 *
 * This is to discourage customizing design system components via custom styling, while still
 * leaving the door open to do it as an escape hatch when the design system still has shortcomings
 * with respect to the product designs we want to achieve.
 *
 * The cumbersome name also serves the purpose of aiding in easily searching for the places in the
 * code where this escape hatch was needed, in order to identify areas where the design system
 * components need to improve to better match our needs.
 *
 * This behaviour can be customized via an optional second generic argument that allows to disable
 * this feature, or to omit the `className` altogether without replacing it with the obfuscated prop
 * name.
 *
 * @deprecated Use Ariakit's composition instead (https://ariakit.org/guide/composition)
 */
interface PolymorphicComponent<
    ComponentType extends React.ElementType,
    OwnProps,
    ShouldObfuscateClassName extends ObfuscateClassNameMode = 'obfuscateClassName'
> {
    <TT extends React.ElementType = ComponentType>(
        props: PolymorphicComponentProps<TT, OwnProps, ShouldObfuscateClassName>,
    ): React.ReactElement | null
    readonly $$typeof: symbol
    defaultProps?: Partial<
        PolymorphicComponentProps<ComponentType, OwnProps, ShouldObfuscateClassName>
    >
    propTypes?: React.WeakValidationMap<
        PolymorphicComponentProps<ComponentType, OwnProps, ShouldObfuscateClassName>
    >
    displayName?: string
}

/**
 * A wrapper to use React.forwardRef with polymorphic components in a type-safe manner. This is a
 * convenience over merely using React.forwardRef directly, and then manually forcing the resulting
 * value to be typed using `as PolymorphicComponent<…>`.
 *
 * @deprecated Use Ariakit's composition instead (https://ariakit.org/guide/composition)
 */
function polymorphicComponent<
    ComponentType extends React.ElementType = 'div',
    OwnProps = EmptyObject,
    ShouldObfuscateClassName extends ObfuscateClassNameMode = 'obfuscateClassName'
>(render: ForwardRefFunction<ComponentType, OwnProps, ShouldObfuscateClassName>) {
    return React.forwardRef(render) as PolymorphicComponent<
        ComponentType,
        OwnProps,
        ShouldObfuscateClassName
    >
}

export type { PolymorphicComponent }
export { polymorphicComponent }
