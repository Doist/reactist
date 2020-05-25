import './styles/avatar.less'

import React from 'react'
import classNames from 'classnames'

import { getInitials, emailToIndex } from './utils/TextUtils'

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

const AVATAR_SIZES: AvatarSize[] = [
    'xxs',
    'xs',
    's',
    'm',
    'l',
    'xl',
    'xxl',
    'xxxl',
]

interface Props {
    className?: string
    colorList?: string[]
    size?: AvatarSize
    avatarUrl?: string
    user: { name?: string; email?: string }
}

const Avatar: React.FC<Props> = ({
    user,
    avatarUrl,
    size = 'l',
    className,
    colorList = AVATAR_COLORS,
}) => {
    const userInitials = getInitials(user.name) || getInitials(user.email)
    const avatarSize = size && AVATAR_SIZES.includes(size) ? size : 'l'
    const avatarClass = classNames(
        `reactist_avatar reactist_avatar_size--${avatarSize}`,
        className
    )

    const style = avatarUrl
        ? {
              backgroundImage: `url(${avatarUrl})`,
              textIndent: '-9999px', // hide the initials
          }
        : {
              backgroundColor:
                  colorList[emailToIndex(user.email, colorList.length)],
          }

    return (
        <div className={avatarClass} style={style}>
            {userInitials}
        </div>
    )
}
Avatar.displayName = 'Avatar'

export { Props }
export default Avatar
