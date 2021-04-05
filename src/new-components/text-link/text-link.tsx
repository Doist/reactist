import * as React from 'react'
import { Box } from '../box'
import { forwardRefWithAs } from '../type-helpers'
import styles from './text-link.module.css'
import type { OpenInNewTab } from '../common-types'

type TextLinkProps = OpenInNewTab

const TextLink = forwardRefWithAs<TextLinkProps>(function TextLink(
    { component = 'a', tone = 'normal', openInNewTab = false, ...props },
    ref,
) {
    return (
        <Box
            {...props}
            component={component}
            display="inline"
            className={styles.container}
            ref={ref}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
        />
    )
})

export { TextLink }
export type { TextLinkProps }
