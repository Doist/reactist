import React from 'react'

import { getInitials, emailToIndex } from './utils'

import { getClassNames, ResponsiveProp } from '../responsive-props'
import styles from './avatar.module.css'
import { Box } from '../box'

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

type AvatarSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl'

type Props = {
    /** @deprecated Please use `exceptionallySetClassName` */
    className?: string
    exceptionallySetClassName?: string
    colorList?: string[]
    size?: ResponsiveProp<AvatarSize>
    avatarUrl?: string
    user: { name?: string; email: string }
}

function Avatar({ user, avatarUrl, size = 'l', className, exceptionallySetClassName }: Props) {
    const userInitials = getInitials(user.name) || getInitials(user.email)
    const avatarSize = size ? size : 'l'

    const style = avatarUrl
        ? {
              backgroundImage: `url(${avatarUrl})`,
              textIndent: '-9999px', // hide the initials
          }
        : {
              backgroundColor: AVATAR_COLORS[emailToIndex(user.email, AVATAR_COLORS.length)],
          }

    const sizeClassName = getClassNames(styles, 'size', avatarSize)

    return (
        <Box
            className={[className, styles.avatar, sizeClassName, exceptionallySetClassName]}
            style={style}
        >
            {userInitials}
        </Box>
    )
}
Avatar.displayName = 'Avatar'

export { Avatar }
