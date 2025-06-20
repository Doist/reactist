import * as React from 'react'
import classNames from 'classnames'
import { Role, RoleProps } from '@ariakit/react'

import { Box, getBoxClassNames } from '../box'
import { Spinner } from '../spinner'
import { Tooltip, TooltipProps } from '../tooltip'

import styles from './button.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'

function preventDefault(event: React.SyntheticEvent) {
    event.preventDefault()
}

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
type ButtonTone = 'normal' | 'destructive'
type ButtonSize = 'small' | 'normal' | 'large'
type IconElement = React.ReactElement | string

interface CommonButtonProps
    extends ObfuscatedClassName,
        Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>,
        Pick<RoleProps, 'render'> {
    /**
     * The button's variant.
     */
    variant: ButtonVariant

    /**
     * The button's tone.
     *
     * @default 'normal'
     */
    tone?: ButtonTone

    /**
     * The button's size.
     *
     * @default 'normal'
     */
    size?: ButtonSize

    /**
     * Controls the shape of the button.
     *
     * Specifically, it allows to make it have slightly curved corners (the default) vs. having them
     * fully curved to the point that they are as round as possible.
     *
     * In icon-only buttons this allows to have the button be circular.
     *
     * @default 'normal'
     */
    shape?: 'normal' | 'rounded'

    /**
     * Whether the button is disabled or not.
     *
     * Buttons are disabled using aria-disabled, rather than the HTML disabled attribute. This
     * allows the buttons to be focusable, which can aid discoverability. This way, users can tab to
     * the button and read its label, even if they can't activate it.
     *
     * It is also convenient when buttons are rendered as a link. Links cannot normally be disabled,
     * but by using aria-disabled, we can make them behave as if they were.
     *
     * The `onClick` handler is automatically prevented when the button is disabled in this way, to
     * mimic the behavior of a native disabled attribute.
     *
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
     * The type of the button.
     *
     * @default 'button'
     */
    type?: 'button' | 'submit' | 'reset'
}

interface ButtonProps extends CommonButtonProps {
    /**
     * The button label content.
     */
    children?: React.ReactNode

    /**
     * The icon to display at the start of the button (before the label).
     */
    startIcon?: IconElement

    /**
     * The icon to display at the end of the button (after the label).
     */
    endIcon?: IconElement

    /**
     * The width of the button.
     *
     * - `'auto'`: The button will be as wide as its content.
     * - `'full'`: The button will be as wide as its container.
     *
     * @default 'auto'
     */
    width?: 'auto' | 'full'

    /**
     * The alignment of the button label inside the button.
     *
     * @default 'center'
     */
    align?: 'start' | 'center' | 'end'
}

/**
 * A button element that displays a text label and optionally a start or end icon. It follows the
 * [WAI-ARIA Button Pattern](https://www.w3.org/TR/wai-aria-practices/#button).
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
        variant,
        tone = 'normal',
        size = 'normal',
        shape = 'normal',
        type = 'button',
        disabled = false,
        loading = false,
        tooltip,
        render,
        onClick,
        exceptionallySetClassName,
        children,
        startIcon,
        endIcon,
        width = 'auto',
        align = 'center',
        ...props
    },
    ref,
) {
    const isDisabled = loading || disabled
    const buttonElement = (
        <Role.button
            {...props}
            render={render}
            type={render != null ? undefined : type}
            ref={ref}
            aria-disabled={isDisabled}
            onClick={isDisabled ? preventDefault : onClick}
            className={classNames([
                getBoxClassNames({ width }),
                exceptionallySetClassName,
                styles.baseButton,
                'reactist_focus_ring',
                'reactist_focus_ring__inset_1px',
                styles[`variant-${variant}`],
                styles[`tone-${tone}`],
                styles[`size-${size}`],
                shape === 'rounded' ? styles['shape-rounded'] : null,
                disabled ? styles.disabled : null,
            ])}
        >
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
        </Role.button>
    )

    return tooltip ? <Tooltip content={tooltip}>{buttonElement}</Tooltip> : buttonElement
})

interface IconButtonProps extends CommonButtonProps {
    /**
     * The icon to display inside the button.
     */
    icon: IconElement

    /**
     * The button label.
     *
     * It is used for assistive technologies, and it is also shown as a tooltip (if not tooltip is
     * provided explicitly).
     */
    'aria-label': string
}

/**
 * A button element that displays an icon only, visually, though it is semantically labelled. It
 * also makes sure to always show a tooltip with its label. It follows the
 * [WAI-ARIA Button Pattern](https://www.w3.org/TR/wai-aria-practices/#button).
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
    {
        variant,
        tone = 'normal',
        size = 'normal',
        shape = 'normal',
        type = 'button',
        disabled = false,
        loading = false,
        tooltip,
        render,
        onClick,
        exceptionallySetClassName,
        children,
        icon,
        ...props
    },
    ref,
) {
    const isDisabled = loading || disabled
    const buttonElement = (
        <Role.button
            {...props}
            render={render}
            type={render != null ? undefined : type}
            ref={ref}
            aria-disabled={isDisabled}
            onClick={isDisabled ? preventDefault : onClick}
            className={classNames([
                exceptionallySetClassName,
                styles.baseButton,
                'reactist_focus_ring',
                'reactist_focus_ring__inset_1px',
                styles[`variant-${variant}`],
                styles[`tone-${tone}`],
                styles[`size-${size}`],
                shape === 'rounded' ? styles['shape-rounded'] : null,
                styles.iconButton,
                disabled ? styles.disabled : null,
            ])}
        >
            {(loading && <Spinner />) || icon}
        </Role.button>
    )

    const tooltipContent = tooltip === undefined ? props['aria-label'] : tooltip
    return tooltipContent ? (
        <Tooltip content={tooltipContent}>{buttonElement}</Tooltip>
    ) : (
        buttonElement
    )
})

export type { ButtonProps, IconButtonProps, ButtonVariant, ButtonTone }
export { Button, IconButton }
