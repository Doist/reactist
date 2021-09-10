import * as React from 'react'
import { ButtonLink, ButtonLinkProps } from './button-link'

function ButtonLinkStoryWrapper(props: ButtonLinkProps) {
    return (
        <ButtonLink
            {...props}
            onClick={(event) => {
                event.preventDefault()
                props.onClick?.(event)
            }}
            href="https://doist.com"
        />
    )
}

ButtonLinkStoryWrapper.displayName = 'ButtonLink'

export { ButtonLinkStoryWrapper as ButtonLink }
