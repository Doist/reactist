import * as React from 'react'
import { Box } from '../box'
import { Columns, Column } from '../columns'

import styles from './banner.module.css'

export type BannerTone = 'info' | 'promotion'

type BannerProps = {
    id?: string
    /**
     * The tone of the Banner. Affects the background color and the outline.
     */
    tone: BannerTone
    /**
     * The icon that should be added inside the Banner.
     */
    icon: React.ReactChild
    /**
     * The title to be displayed at the top of the Banner.
     */
    title: React.ReactNode
    /**
     * An optional description to be displayed inside the Banner.
     */
    description?: React.ReactNode
    /**
     * An optional action to displayed inside the Banner.
     */
    action?: React.ReactChild
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(function Banner(
    { id, tone, icon, title, description, action, ...props }: BannerProps,
    ref,
) {
    return (
        <Box
            {...props}
            ref={ref}
            id={id}
            role="note"
            aria-live="polite"
            borderRadius="standard"
            className={[styles.banner, styles[`banner-${tone}`]]}
        >
            <Columns space="medium" alignY="center">
                <Column width="content" aria-hidden>
                    {icon}
                </Column>
                <Column>
                    <Box paddingY="xsmall">
                        {description ? (
                            <Box className={[styles.title, styles[`title-${tone}`]]}>{title}</Box>
                        ) : (
                            <Box
                                className={[
                                    styles.title,
                                    // If the banner does not have a description, we need to slightly tweak
                                    // the styling of the title applying an extra css class
                                    styles[`title-without-description`],
                                    styles[`title-${tone}`],
                                ]}
                            >
                                {title}
                            </Box>
                        )}
                        {description ? (
                            <Box className={[styles.description, styles[`description-${tone}`]]}>
                                {description}
                            </Box>
                        ) : null}
                    </Box>
                </Column>
                {action ? <Column width="content">{action}</Column> : null}
            </Columns>
        </Box>
    )
})

export { Banner }
export type { BannerProps }
