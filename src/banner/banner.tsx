import * as React from 'react'
import { Box } from '../box'
import { useId } from '../utils/common-helpers'

import styles from './banner.module.css'
import { Button, ButtonProps, IconButton } from '../button'
import { CloseIcon } from '../icons/close-icon'
import { BannerIcon } from '../icons/banner-icon'
import { TextLink } from '../text-link'

/**
 * Represents the type of a banner.
 * 'neutral' accepts a custom icon, the rest do not.
 * @default 'neutral'
 */
export type BannerType = 'neutral' | SystemBannerType

/**
 * Predefined system types for banners.
 * Each type has its own preset icon.
 */
export type SystemBannerType = 'info' | 'upgrade' | 'experiment' | 'warning' | 'error' | 'success'

type BaseAction = {
    variant: 'primary' | 'tertiary'
    label: string
} & Pick<ButtonProps, 'loading' | 'disabled'>
type ActionButton = BaseAction & { type: 'button' } & Omit<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        'className'
    >
type ActionLink = BaseAction & { type: 'link' } & Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        'className'
    >
/**
 * Represents an action that can be taken from the banner.
 * Can be either a button or a link, sharing common properties from BaseAction.
 */
type Action = ActionButton | ActionLink

/**
 * Configuration for inline links within the banner description.
 * Extends TextLink component props with a required label.
 */
type InlineLink = { label: string } & React.ComponentProps<typeof TextLink>

type WithCloseButton = {
    closeLabel?: string
    onClose: () => void
}
type WithoutCloseButton = {
    closeLabel?: never
    onClose?: never
}
/**
 * Controls the close button behavior.
 * If none is provided, the banner will not have a close button.
 */
type CloseButton = WithCloseButton | WithoutCloseButton

type BaseBanner = {
    id?: string
    title?: React.ReactNode
    description: Exclude<React.ReactNode, null | undefined | boolean>
    action?: Action
    inlineLinks?: InlineLink[]
} & CloseButton

/**
 * Configuration for neutral banners.
 * Can include either an image, an icon, or neither, but never both.
 */
type NeutralBanner = BaseBanner & {
    type: Extract<BannerType, 'neutral'>
} & (
        | { image: React.ReactElement; icon?: never }
        | { icon: React.ReactElement; image?: never }
        | { image?: never; icon?: never }
    )

/**
 * Configuration for system banners.
 * Cannot include custom images or icons as they use preset ones.
 */
type SystemBanner = BaseBanner & {
    type: SystemBannerType
    image?: never
    icon?: never
}

type BannerProps = NeutralBanner | SystemBanner

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(function Banner(
    {
        id,
        type,
        title,
        description,
        action,
        icon,
        image,
        inlineLinks,
        closeLabel,
        onClose,
        ...props
    }: BannerProps,
    ref,
) {
    const titleId = useId()
    const descriptionId = useId()

    const closeButton = onClose ? (
        <IconButton
            exceptionallySetClassName={styles.closeButton}
            variant="quaternary"
            onClick={onClose}
            icon={<CloseIcon />}
            aria-label={closeLabel ?? 'Close banner'}
        />
    ) : null

    return (
        <Box
            {...props}
            ref={ref}
            id={id}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            role="status"
            aria-labelledby={title ? titleId : descriptionId}
            aria-describedby={title ? descriptionId : undefined}
            aria-live="polite"
            tabIndex={0}
            borderRadius="full"
            className={[
                styles.banner,
                'reactist_focus_ring',
                'reactist_focus_ring__border_radius_large',
                'reactist_focus_ring__inset_1px',
            ]}
        >
            {image ? <Box className={styles.image}>{image}</Box> : null}

            <Box className={styles.content} display="flex" gap="small" alignItems="center">
                <Box className={styles.staticContent} display="flex" gap="small" flexGrow={1}>
                    <Box className={styles.icon}>
                        {type === 'neutral' ? icon : <BannerIcon type={type} />}
                        {closeButton}
                    </Box>

                    <Box className={styles.copy} display="flex" flexDirection="column">
                        {title ? (
                            <Box id={titleId} className={styles.title}>
                                {title}
                            </Box>
                        ) : null}
                        <Box
                            id={descriptionId}
                            className={[styles.description, title ? styles.secondary : null]}
                        >
                            {description}
                            {inlineLinks?.map(({ label, ...props }, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <TextLink
                                            {...props}
                                            exceptionallySetClassName={styles.inlineLink}
                                        >
                                            {label}
                                        </TextLink>
                                        {index < inlineLinks.length - 1 ? <span> · </span> : ''}
                                    </React.Fragment>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>

                {action || closeButton ? (
                    <Box className={styles.actions} display="flex" gap="small">
                        {action?.type === 'button' ? <ActionButton {...action} /> : null}
                        {action?.type === 'link' ? <ActionLink {...action} /> : null}
                        {closeButton}
                    </Box>
                ) : null}
            </Box>
        </Box>
    )
})

function ActionButton({ type, label, ...props }: ActionButton) {
    return <Button {...props}>{label}</Button>
}

function ActionLink({ type, label, variant, ...props }: ActionLink) {
    return (
        <Button
            variant={variant}
            render={<a rel="noopener noreferrer" target="_blank" {...props} />}
        >
            {label}
        </Button>
    )
}

export { Banner }
export type { BannerProps }
