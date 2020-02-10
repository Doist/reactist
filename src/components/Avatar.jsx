import './styles/avatar.less'

import React from 'react'
import PropTypes from 'prop-types'
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
    '#5e5e5e'
]
const AVATAR_SIZES = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl']

const Avatar = ({
    user,
    avatarUrl,
    size,
    className,
    colorList = AVATAR_COLORS
}) => {
    const userInitials = getInitials(user.name) || getInitials(user.email)
    const avatarSize = AVATAR_SIZES.includes(size) ? size : 'l'
    const avatarClass = classNames(
        `reactist_avatar reactist_avatar_size--${avatarSize}`,
        className
    )

    const style = avatarUrl
        ? {
              backgroundImage: `url(${avatarUrl})`,
              textIndent: '-9999px' // hide the initials
          }
        : {
              backgroundColor:
                  colorList[emailToIndex(user.email, colorList.length)]
          }

    return (
        <div className={avatarClass} style={style}>
            {userInitials}
        </div>
    )
}
Avatar.displayName = 'Avatar'
Avatar.defaultProps = {
    size: 'l'
}
Avatar.propTypes = {
    /** Minimal required user shape for the avatar. */
    user: PropTypes.shape({
        /** Name of the user. */
        name: PropTypes.string,
        /** Email of the user. Used to calculate avatar color and as fallback in case name is not set. */
        email: PropTypes.string
    }).isRequired,
    /** URL of the avatar image. In case nothing is set a colored circle with the user's initials is displayed. */
    avatarUrl: PropTypes.string,
    /** Size of the Avatar between XXS and XXXL. */
    size: PropTypes.oneOf(AVATAR_SIZES),
    /** Additional css class applied to the avatar. */
    className: PropTypes.string,
    /** Optional list of color codes used as fallback when image not available. Defaults to AVATAR_COLORS array. */
    colorList: PropTypes.arrayOf(PropTypes.string)
}

export default Avatar
