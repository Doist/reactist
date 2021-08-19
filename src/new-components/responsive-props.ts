type ResponsiveBreakpoints = 'mobile' | 'tablet' | 'desktop'

type Atom = string | number | boolean

/**
 * A responsive prop supports receiving values of its given base type, or an object mapping a
 * responsive breakpoint name to a value from the prop's base type.
 *
 * Some examples:
 *
 * - `align={{ mobile: 'left', tablet: 'center', desktop: 'right' }}`
 */
type ResponsiveProp<AtomType extends Atom> =
    | AtomType
    | Readonly<{ [key in ResponsiveBreakpoints]?: AtomType }>

const DEBUG = process.env.NODE_ENV === 'development'

/**
 * Builds a css module class name for a given prop + prop-value combination.
 *
 * We have a convention of building the internal utility-based class names system in a way that
 * resembles the prop for which it is used and the value of the prop. For instance, in a component
 * with a prop `width` with possible values `narrow` and `wide`, we encode the styles for each of
 * these alternatives in the class-names `.width-narrow` and `.width-wide`.
 *
 * Furthermore, this helper is aware of responsive prop values. For instance, if you provide the
 * `width` prop above with the value `['narrow', 'wide']` this returns `['narrow', 'tablet-wide']`.
 * That is, it returns an array of class names, following the same convention above, but also
 * prefixing by the viewport width variant (`tablet-` or `desktop-`).
 *
 * @param styles the class names mapping imported from a css module
 * @param property the prop name
 * @param value the given prop's value
 */
function getClassNames(
    styles: Record<string, string>,
    property: string,
    value: ResponsiveProp<string> | null | undefined,
): string[] | null {
    if (!value) {
        return null
    }

    const classList: string[] = []

    if (typeof value === 'string') {
        classList.push(styles[`${property}-${value}`])
    } else {
        if (value.mobile) classList.push(styles[`${property}-${value.mobile}`])
        if (value.tablet) classList.push(styles[`tablet-${property}-${value.tablet}`])
        if (value.desktop) classList.push(styles[`desktop-${property}-${value.desktop}`])
    }

    if (DEBUG && !classList.every(Boolean)) {
        // eslint-disable-next-line no-console
        console.warn('Not all generated class names were found', { property, value, classList })
    }

    return classList
}

/**
 * A mapping over a responsive prop value.
 *
 * Since response values can be an object but also a scalar value, this helper makes it easier to
 * to map the values when it's an object but keeps it consistent for the case when it is a scalar
 * value as well.
 *
 * @param fromValue the responsive prop value
 * @param mapper the mapping function
 */
function mapResponsiveProp<From extends Atom, To extends Atom>(
    fromValue: ResponsiveProp<From> | undefined,
    mapper: (from: From) => To,
): ResponsiveProp<To> | undefined {
    if (!fromValue) {
        return undefined
    }

    if (typeof fromValue !== 'object') {
        return mapper(fromValue)
    }

    return {
        mobile: fromValue.mobile ? mapper(fromValue.mobile) : undefined,
        tablet: fromValue.tablet ? mapper(fromValue.tablet) : undefined,
        desktop: fromValue.desktop ? mapper(fromValue.desktop) : undefined,
    }
}

export type { ResponsiveProp, ResponsiveBreakpoints }
export { getClassNames, mapResponsiveProp }
