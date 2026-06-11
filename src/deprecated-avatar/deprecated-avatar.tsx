import * as React from 'react'

import { Box } from '../box'
import { getClassNames } from '../utils/responsive-props'

import { emailToIndex, getInitials } from './utils'

import styles from './deprecated-avatar.module.css'

import type { ObfuscatedClassName } from '../utils/common-types'
import type { ResponsiveProp } from '../utils/responsive-props'

const AVATAR_COLORS = [
    '#fcc652',
    '#e9952c',
    '#e16b2d',
    '#d84b40',
    '#e8435a',
    '#e5198a',
    '#ad3889',
    '#86389c',
    '#a8a8a8',
    '#98be2f',
    '#5d9d50',
    '#5f9f85',
    '#5bbcb6',
    '#32a3bf',
    '#2bafeb',
    '#2d88c3',
    '#3863cc',
    '#5e5e5e',
]

type DeprecatedAvatarSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'

type DeprecatedAvatarProps = ObfuscatedClassName & {
    /** @deprecated Please use `exceptionallySetClassName` */
    className?: string
    /** @deprecated */
    colorList?: string[]
    size?: ResponsiveProp<DeprecatedAvatarSize>
    avatarUrl?: string
    user: { name?: string; email: string }
}

/**
 * @deprecated Use `Avatar` instead.
 */
function DeprecatedAvatar({
    user,
    avatarUrl,
    size = 'l',
    className,
    colorList = AVATAR_COLORS,
    exceptionallySetClassName,
    ...props
}: DeprecatedAvatarProps) {
    const userInitials = getInitials(user.name) || getInitials(user.email)
    const avatarSize = size ? size : 'l'

    const style = avatarUrl
        ? {
              backgroundImage: `url(${avatarUrl})`,
              textIndent: '-9999px', // hide the initials
          }
        : {
              backgroundColor: colorList[emailToIndex(user.email, colorList.length)],
          }

    const sizeClassName = getClassNames(styles, 'deprecated-size', avatarSize)

    return (
        <Box
            className={[
                className,
                styles['deprecated-avatar'],
                sizeClassName,
                exceptionallySetClassName,
            ]}
            style={style}
            {...props}
        >
            {userInitials}
        </Box>
    )
}
DeprecatedAvatar.displayName = 'DeprecatedAvatar'

export { DeprecatedAvatar }
export type { DeprecatedAvatarProps, DeprecatedAvatarSize }
