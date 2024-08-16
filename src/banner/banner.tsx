import { forwardRef } from 'react'
import { Box } from '../box'
import { Columns, Column } from '../columns'
import { useId } from '../utils/common-helpers'

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
    icon: React.ReactElement | string | number

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
    action?: React.ReactElement | string | number
}

const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
    { id, tone, icon, title, description, action, ...props }: BannerProps,
    ref,
) {
    const titleId = useId()
    const descriptionId = useId()
    return (
        <Box
            {...props}
            ref={ref}
            id={id}
            role="status"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            aria-live="polite"
            tabIndex={0}
            borderRadius="standard"
            className={[styles.banner, styles[`banner-${tone}`]]}
        >
            <Columns space="medium" alignY="center">
                <Column
                    width="content"
                    aria-hidden
                    style={{
                        /* Make sure the icon is centered vertically */
                        lineHeight: 0,
                    }}
                >
                    {icon}
                </Column>
                <Column>
                    <Box paddingY="xsmall">
                        {description ? (
                            <Box id={titleId} className={[styles.title, styles[`title-${tone}`]]}>
                                {title}
                            </Box>
                        ) : (
                            <Box
                                id={titleId}
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
                            <Box
                                id={descriptionId}
                                className={[styles.description, styles[`description-${tone}`]]}
                            >
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
