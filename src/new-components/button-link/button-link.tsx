import * as React from 'react'
import { Box } from '../box'
import { forwardRefComponent } from '../../utils/polymorphism'
import type { OpenInNewTab } from '../common-types'

import styles from './button-link.module.css'

interface ButtonLinkProps extends OpenInNewTab {
    variant: 'primary' | 'secondary' | 'danger'
    size?: 'default' | 'small' | 'large'
}

const ButtonLink = forwardRefComponent<'a', ButtonLinkProps>(function ButtonLink(
    { as = 'a', variant, size = 'default', openInNewTab = false, className, ...props },
    ref,
) {
    return (
        <Box
            {...props}
            as={as}
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
