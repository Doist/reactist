type ResponsiveBreakpoints = 'tablet' | 'desktop'

type Atom = string | number | boolean

/**
 * A responsive prop supports receiving values of its given base type, or tuples (arrays) of 2 or 3
 * different values from its base type.
 *
 * This is interpreted as follows:
 *
 * - A value `'x'` means the prop should behave according to that value for any viewport size.
 * - A value `['x', 'y']` means the prop should behave according to the `'x'` value in mobile
 *   devices and according to the `'y'` value for any viewport size larger than mobile screens.
 * - A value `['x', 'y', 'z']` means the prop should behave according to the `'x'` value in mobile
 *   devices, according to the `'y'` value in tablet-like viewport sizes, and as `'z'` for any
 *   viewport size larger than mobile screens.
 */
type ResponsiveProp<AtomType extends Atom> =
    | AtomType
    | Readonly<[AtomType, AtomType]>
    | Readonly<[AtomType, AtomType, AtomType]>

const prefix = ['', 'tablet-', 'desktop-']
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
): string[] | string | null {
    if (!value) {
        return null
    }
    const classList =
        typeof value === 'string'
            ? [styles[`${property}-${value}`]]
            : value.map((s, i) => styles[`${prefix[i]}${property}-${s}`])
    if (DEBUG && !classList.every(Boolean)) {
        console.warn('Not all generated class names were found', { property, value, classList })
    }
    return classList
}

/**
 * A mapping over a responsive prop value.
 *
 * Since response values can be a tuple (array) but also a scalar value, this helper makes it easier
 * to .map over this "array" but keeps it consistent for the case when it is a scalar value as well.
 *
 * @param fromValue the responsive prop value
 * @param mapper the mapping function
 */
function mapResponsiveProp<From extends Atom, To extends Atom>(
    fromValue: ResponsiveProp<From> | undefined,
    mapper: (from: From) => To,
): ResponsiveProp<To> | undefined {
    if (
        typeof fromValue === 'string' ||
        typeof fromValue === 'number' ||
        typeof fromValue === 'boolean'
    ) {
        return mapper(fromValue)
    }
    if (Array.isArray(fromValue)) {
        return (fromValue.map(mapper) as unknown) as ResponsiveProp<To>
    }
    return undefined
}

export type { ResponsiveProp, ResponsiveBreakpoints }
export { getClassNames, mapResponsiveProp }
