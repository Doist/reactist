import * as React from 'react'
import { Box } from '../box'
import { forwardRefWithAs } from '../type-helpers'
import type { OpenInNewTab } from '../common-types'

import styles from './button-link.module.css'

interface ButtonLinkProps extends OpenInNewTab {
    variant: 'primary' | 'secondary' | 'danger'
    size?: 'default' | 'small' | 'large'
}

const ButtonLink = forwardRefWithAs<ButtonLinkProps>(function ButtonLink(
    { component = 'a', variant, size = 'default', openInNewTab = false, ...props },
    ref,
) {
    const { className } = props
    return (
        <Box
            {...props}
            component={component}
            display="inlineFlex"
            alignItems="center"
            justifyContent="center"
            className={[
                className,
                styles.container,
                'reactist_button',
                variant ? `reactist_button--${variant}` : null,
                size !== 'default' ? `reactist_button--${size}` : null,
            ]}
            ref={ref}
            target={openInNewTab ? '_blank' : undefined}
            rel={openInNewTab ? 'noopener noreferrer' : undefined}
        />
    )
})

export { ButtonLink }
export type { ButtonLinkProps }
