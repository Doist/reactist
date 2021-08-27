import * as React from 'react'
import { BaseButton } from '../base-button'
import type { BaseButtonProps } from '../base-button'

type ButtonProps = BaseButtonProps &
    Omit<JSX.IntrinsicElements['button'], 'aria-disabled' | 'className'> & {
        exceptionallySetClassName?: string
    }

/**
 * A semantic button that also looks like a button, and provides all the necessary visual variants.
 * It follows the [WAI-ARIA Button Pattern](https://www.w3.org/TR/wai-aria-practices/#button).
 *
 * 🎨 [Figma](https://www.figma.com/file/LYlWNzvhMDh907l07mPPQk/Product-Web?node-id=4693%3A175143)
 *
 * @see ButtonLink
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    {
        variant,
        tone = 'normal',
        size = 'normal',
        type = 'button',
        disabled = false,
        exceptionallySetClassName,
        ...props
    },
    ref,
) {
    return (
        <BaseButton
            {...props}
            as="button"
            ref={ref}
            variant={variant}
            tone={tone}
            size={size}
            type={type}
            disabled={disabled}
            exceptionallySetClassName={exceptionallySetClassName}
        />
    )
})

export { Button }
export type { ButtonProps }
