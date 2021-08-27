import * as React from 'react'
import { Tooltip, TooltipProps } from '../../components/tooltip'
import { polymorphicComponent } from '../../utils/polymorphism'
import { Box } from '../box'
import styles from './base-button.module.css'

function preventDefault(event: React.SyntheticEvent) {
    event.preventDefault()
}

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'
type ButtonTone = 'normal' | 'destructive'
type ButtonSize = 'small' | 'normal' | 'large'

type BaseButtonProps = {
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
     * @default false
     */
    disabled?: boolean
    /**
     * A tooltip linked to the button element.
     */
    tooltip?: TooltipProps['content']
}

/**
 * The component that powers `Button` and `ButtonLink`, where the button styling logic and some
 * common functionality resides. This component is internal to Reactist.
 *
 * 🎨 [Figma](https://www.figma.com/file/LYlWNzvhMDh907l07mPPQk/Product-Web?node-id=4693%3A175143)
 *
 * @see Button
 * @see ButtonLink
 */
const BaseButton = polymorphicComponent<'div', BaseButtonProps>(function BaseButton(
    {
        as = 'div',
        variant,
        tone = 'normal',
        size = 'normal',
        disabled = false,
        tooltip,
        onClick,
        exceptionallySetClassName,
        ...props
    },
    ref,
) {
    const buttonElement = (
        <Box
            {...props}
            as={as}
            ref={ref}
            aria-disabled={disabled}
            onClick={disabled ? preventDefault : onClick}
            className={[
                exceptionallySetClassName,
                styles.baseButton,
                styles[`variant-${variant}`],
                styles[`tone-${tone}`],
                styles[`size-${size}`],
            ]}
        />
    )

    return tooltip ? <Tooltip content={tooltip}>{buttonElement}</Tooltip> : buttonElement
})

export { BaseButton }
export type { BaseButtonProps }
