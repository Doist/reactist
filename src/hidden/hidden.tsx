import { Box } from '../box'
import styles from './hidden.module.css'
import type { ResponsiveBreakpoints } from '../utils/responsive-props'
import { polymorphicComponent } from '../utils/polymorphism'

type AboveProp = {
    /**
     * Hides the element on viewport sizes equal or larger to the one given.
     *
     * It is not supported to pass it alongside `below`, and the resulting behavior is undefined
     * (most likely itʼll hide the element all the time to make it apparent that there's a problem).
     *
     * @see below
     */
    above: Exclude<ResponsiveBreakpoints, 'desktop'>
    below?: never
}

type BelowProp = {
    /**
     * Hides the element on viewport sizes equal or smaller to the one given.
     *
     * It is not supported to pass it alongside `above`, and the resulting behavior is undefined
     * (most likely itʼll hide the element all the time to make it apparent that there's a problem).
     *
     * @see above
     */
    below: Exclude<ResponsiveBreakpoints, 'mobile'>
    above?: never
}

type CommonProps = {
    children: React.ReactNode
    /**
     * hides the element when on print media.
     */
    print?: boolean
    /**
     * Useful if you want the element to be an inline element when it is visible.
     */
    display?: 'inline' | 'block'
}

type HiddenProps = CommonProps & (AboveProp | BelowProp | Required<Pick<CommonProps, 'print'>>)

/**
 * A component that allows to specify how to hide itself on certain responsive screen sizes, or on
 * print media.
 *
 * @see HiddenProps
 * @see HiddenVisually for hiding content only visually, while keeping it available for assistive
 *   technologies.
 */
const Hidden = polymorphicComponent<'div', HiddenProps>(function Hidden(
    { display = 'block', children, exceptionallySetClassName, ...props },
    ref,
) {
    const hiddenOnPrint = 'print' in props && props.print

    const hiddenOnDesktop = 'above' in props
    const hiddenOnMobile = 'below' in props
    const hiddenOnTablet =
        ('below' in props && props.below === 'desktop') ||
        ('above' in props && props.above === 'mobile')

    if (hiddenOnDesktop && hiddenOnMobile) {
        // eslint-disable-next-line no-console
        console.warn('<Hidden /> should receive either above="…" or below="…" but not both')
    }

    if (!hiddenOnDesktop && !hiddenOnMobile && !hiddenOnPrint) {
        // eslint-disable-next-line no-console
        console.warn('<Hidden /> did not receive any criteria to hide itself')
    }

    // We need to delete these so they do not get forwarded to the Box
    if ('above' in props) delete props['above']
    if ('below' in props) delete props['below']
    if ('print' in props) delete props['print']

    return (
        <Box
            {...props}
            ref={ref}
            className={[exceptionallySetClassName, hiddenOnPrint ? styles.hiddenOnPrint : null]}
            display={
                hiddenOnDesktop && hiddenOnMobile
                    ? 'none'
                    : {
                          mobile: hiddenOnMobile ? 'none' : display,
                          tablet: hiddenOnTablet ? 'none' : display,
                          desktop: hiddenOnDesktop ? 'none' : display,
                      }
            }
        >
            {children}
        </Box>
    )
})

export { Hidden }
export type { HiddenProps }
