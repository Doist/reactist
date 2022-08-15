import * as React from 'react'
import { Tooltip, TooltipProps } from '../../components/tooltip'
import { polymorphicComponent } from '../../utils/polymorphism'
import { Box } from '../box'
import { Spinner } from '../spinner'
import styles from './base-button.module.css'

function preventDefault(event: React.SyntheticEvent) {
    event.preventDefault()
}

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
type ButtonTone = 'normal' | 'destructive'
type ButtonSize = 'small' | 'normal' | 'large'
type IconElement = React.ReactChild

type CommonProps = {
    /**
     * The button's variant.
     */
    variant: ButtonVariant

    /**
     * The button's tone.
     * @default 'normal'
     */
    tone?: ButtonTone

    /**
     * The button's size.
     * @default 'normal'
     */
    size?: ButtonSize

    /**
     * Controls the shape of the button. Specifically, it allows to make it have slightly curved
     * corners (the default) vs. having them fully curved to the point that they are as round as
     * possible. In icon-only buttons this allows to have the button be circular.
     * @default 'normal'
     */
    shape?: 'normal' | 'rounded'

    /**
     * Whether the button is disabled or not.
     * @default false
     */
    disabled?: boolean

    /**
     * Whether the button is busy/loading.
     *
     * A button in this state is functionally and semantically disabled. Visually is does not look
     * dimmed (as disabled buttons normally do), but it shows a loading spinner instead.
     *
     * @default false
     */
    loading?: boolean

    /**
     * A tooltip linked to the button element.
     */
    tooltip?: TooltipProps['content']

    /**
     * The distance between the button element and the linked tooltip.
     */
    tooltipGapSize?: TooltipProps['gapSize']
}

type AlignmentProps = {
    width: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full'
    align?: 'start' | 'center' | 'end'
}

type AutoWidthProps = {
    width?: 'auto'
    align?: never
}

type IconButtonProps = {
    icon: IconElement
    'aria-label': string
    children?: never
    startIcon?: never
    endIcon?: never
    width?: never
    align?: never
}

type LabelledButtonProps = {
    children: NonNullable<React.ReactNode>
    startIcon?: IconElement
    endIcon?: IconElement
    icon?: never
} & (AutoWidthProps | AlignmentProps)

export type BaseButtonProps = CommonProps & (IconButtonProps | LabelledButtonProps)

/**
 * The component that powers `Button` and `ButtonLink`, where the button styling logic and some
 * common functionality resides. This component is internal to Reactist.
 *
 * @see Button
 * @see ButtonLink
 */
export const BaseButton = polymorphicComponent<'div', BaseButtonProps>(function BaseButton(
    {
        as = 'div',
        variant,
        tone = 'normal',
        size = 'normal',
        shape = 'normal',
        disabled = false,
        loading = false,
        tooltip,
        tooltipGapSize,
        onClick,
        exceptionallySetClassName,
        children,
        startIcon,
        endIcon,
        icon,
        width = 'auto',
        align = 'center',
        ...props
    },
    ref,
) {
    const isDisabled = loading || disabled
    const buttonElement = (
        <Box
            {...props}
            as={as}
            ref={ref}
            aria-disabled={isDisabled}
            onClick={isDisabled ? preventDefault : onClick}
            width={icon ? undefined : width}
            className={[
                exceptionallySetClassName,
                styles.baseButton,
                styles[`variant-${variant}`],
                styles[`tone-${tone}`],
                styles[`size-${size}`],
                shape === 'rounded' ? styles['shape-rounded'] : null,
                icon ? styles.iconButton : null,
                disabled ? styles.disabled : null,
            ]}
        >
            {icon ? (
                (loading && <Spinner />) || icon
            ) : (
                <>
                    {startIcon ? (
                        <Box display="flex" className={styles.startIcon} aria-hidden>
                            {loading && !endIcon ? <Spinner /> : startIcon}
                        </Box>
                    ) : null}
                    {children ? (
                        <Box
                            as="span"
                            className={styles.label}
                            overflow="hidden"
                            width={width === 'full' ? 'full' : undefined}
                            textAlign={width === 'auto' ? 'center' : align}
                        >
                            {children}
                        </Box>
                    ) : null}
                    {endIcon || (loading && !startIcon) ? (
                        <Box display="flex" className={styles.endIcon} aria-hidden>
                            {loading ? <Spinner /> : endIcon}
                        </Box>
                    ) : null}
                </>
            )}
        </Box>
    )

    // If it's an icon-only button, make sure it uses the aria-label as tooltip if no tooltip was provided
    const tooltipContent = icon ? tooltip ?? props['aria-label'] : tooltip
    return tooltipContent ? (
        <Tooltip content={tooltipContent} gapSize={tooltipGapSize}>
            {buttonElement}
        </Tooltip>
    ) : (
        buttonElement
    )
})
