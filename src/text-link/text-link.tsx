import * as React from 'react'

import { Box } from '../box'
import { polymorphicComponent } from '../utils/polymorphism'

import styles from './text-link.module.css'

import type { OpenInNewTab } from '../utils/common-types'

type TextLinkColors = 'default' | 'inherit'

type TextLinkProps = OpenInNewTab & {
    color?: TextLinkColors
    underline?: boolean
}

const TextLink = polymorphicComponent<'a', TextLinkProps>(function TextLink(
    {
        as = 'a',
        openInNewTab = false,
        exceptionallySetClassName,
        color = 'default',
        underline = true,
        ...props
    },
    ref,
) {
    return (
        <Box
            {...props}
            as={as}
            display="inline"
            className={[
                exceptionallySetClassName,
                styles.container,
                styles[color],
                underline ? styles.underline : styles['no-underline'],
            ]}
            ref={ref}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
        />
    )
})

export { TextLink }
export type { TextLinkProps }
