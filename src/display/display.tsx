import * as React from 'react'

import { Role } from '@ariakit/react'

import { getTypographyClassName } from '../typography/typography'

import styles from './display.module.css'

import type { RoleProps } from '@ariakit/react'
import type { TypographyStyleProps } from '../typography/typography'

type DisplayVariant = 'display-1' | 'display-2' | 'display-3' | 'display-4' | 'display-5'

type DisplayProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'> &
    TypographyStyleProps & {
        /** Large display text content. */
        children: React.ReactNode
        /** Visual display style. */
        variant: DisplayVariant
        /** Custom element rendered with display typography; defaults to a div. */
        render?: RoleProps['render']
    }

const Display = React.forwardRef<HTMLDivElement, DisplayProps>(function Display(
    {
        variant,
        tone = 'normal',
        align,
        lineClamp,
        exceptionallySetClassName,
        render,
        children,
        ...props
    },
    ref,
) {
    return (
        <Role.div
            {...props}
            render={render}
            className={getTypographyClassName({
                variantClassName: styles['variant-' + variant]!,
                fontFamilyClassName: styles['font-family-sf-for-web']!,
                modifierClassNames: [styles.display],
                tone,
                align,
                lineClamp,
                exceptionallySetClassName,
            })}
            ref={ref}
        >
            {children}
        </Role.div>
    )
})

Display.displayName = 'Display'

export type { DisplayProps, DisplayVariant }
export { Display }
