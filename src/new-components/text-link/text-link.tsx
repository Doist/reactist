import * as React from 'react'
import { Box } from '../box'
import { polymorphicComponent } from '../../utils/polymorphism'
import styles from './text-link.module.css'
import type { OpenInNewTab } from '../common-types'

type TextLinkProps = OpenInNewTab

const TextLink = polymorphicComponent<'a', TextLinkProps>(function TextLink(
    { as = 'a', openInNewTab = false, exceptionallySetClassName, ...props },
    ref,
) {
    return (
        <Box
            {...props}
            as={as}
            display="inline"
            className={[exceptionallySetClassName, styles.container]}
            ref={ref}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
        />
    )
})

export { TextLink }
export type { TextLinkProps }
