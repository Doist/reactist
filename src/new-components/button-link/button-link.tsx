import * as React from 'react'
import { polymorphicComponent } from '../../utils/polymorphism'
import { BaseButton } from '../base-button'
import type { BaseButtonProps } from '../base-button'
import type { OpenInNewTab } from '../common-types'

type ButtonLinkProps = BaseButtonProps &
    OpenInNewTab &
    Omit<JSX.IntrinsicElements['a'], 'aria-disabled' | 'target' | 'rel' | 'className'>

/**
 * A semantic link that looks like a button, exactly matching the `Button` component in all visual
 * aspects.
 *
 *🎨 [Figma](https://www.figma.com/file/LYlWNzvhMDh907l07mPPQk/Product-Web?node-id=4693%3A175143)
 *
 * @see Button
 */
const ButtonLink = polymorphicComponent<'a', ButtonLinkProps>(function ButtonLink(
    {
        as = 'a',
        variant,
        tone = 'normal',
        size = 'normal',
        disabled = false,
        exceptionallySetClassName,
        openInNewTab = false,
        ...props
    },
    ref,
) {
    return (
        <BaseButton
            {...props}
            as={as}
            ref={ref}
            variant={variant}
            tone={tone}
            size={size}
            disabled={disabled}
            exceptionallySetClassName={exceptionallySetClassName}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
        />
    )
})

export { ButtonLink }
export type { ButtonLinkProps }
