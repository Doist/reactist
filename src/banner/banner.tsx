import { forwardRef, Fragment } from 'react'

import { Box } from '../box'
import { Button, ButtonProps, IconButton } from '../button'
import { BannerIcon } from '../icons/banner-icon'
import { CloseIcon } from '../icons/close-icon'
import { TextLink } from '../text-link'
import { useId } from '../utils/common-helpers'

import styles from './banner.module.css'

import type {
    AnchorHTMLAttributes,
    ButtonHTMLAttributes,
    ComponentProps,
    ReactElement,
    ReactNode,
} from 'react'

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
        ButtonHTMLAttributes<HTMLButtonElement>,
        'className'
    >
type ActionLink = BaseAction & { type: 'link' } & Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
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
type InlineLink = { label: string } & ComponentProps<typeof TextLink>

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
    title?: ReactNode
    description: Exclude<ReactNode, null | undefined | boolean>
    action?: Action | ReactNode
    inlineLinks?: InlineLink[]
} & CloseButton

/**
 * Configuration for neutral banners.
 * Can include either an image, an icon, or neither, but never both.
 */
type NeutralBanner = BaseBanner & {
    type: Extract<BannerType, 'neutral'>
} & (
        | { image: ReactElement; icon?: never }
        | { icon: ReactElement; image?: never }
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

/**
 * Type guard to check if the action is an Action object (button or link)
 */
function isActionObject(action: Action | ReactNode): action is Action {
    return (
        typeof action === 'object' &&
        action !== null &&
        'type' in action &&
        (action.type === 'button' || action.type === 'link')
    )
}

const Banner = forwardRef<HTMLDivElement, BannerProps>(function Banner(
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
            className={styles.banner}
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
                                    <Fragment key={index}>
                                        <TextLink
                                            {...props}
                                            exceptionallySetClassName={styles.inlineLink}
                                        >
                                            {label}
                                        </TextLink>
                                        {index < inlineLinks.length - 1 ? <span> · </span> : ''}
                                    </Fragment>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>

                {action || closeButton ? (
                    <Box className={styles.actions} display="flex" gap="small">
                        {action ? (
                            isActionObject(action) ? (
                                action.type === 'button' ? (
                                    <ActionButton {...action} />
                                ) : (
                                    <ActionLink {...action} />
                                )
                            ) : (
                                action
                            )
                        ) : null}
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
