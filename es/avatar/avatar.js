import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { getInitials, emailToIndex } from './utils.js'
import { getClassNames } from '../utils/responsive-props.js'
import modules_08f3eeac from './avatar.module.css.js'
import { Box } from '../box/box.js'

const _excluded = [
    'user',
    'avatarUrl',
    'size',
    'className',
    'colorList',
    'exceptionallySetClassName',
]
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

function Avatar(_ref) {
    let {
            user,
            avatarUrl,
            size = 'l',
            className,
            colorList = AVATAR_COLORS,
            exceptionallySetClassName,
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const userInitials = getInitials(user.name) || getInitials(user.email)
    const avatarSize = size ? size : 'l'
    const style = avatarUrl
        ? {
              backgroundImage: 'url(' + avatarUrl + ')',
              textIndent: '-9999px', // hide the initials
          }
        : {
              backgroundColor: colorList[emailToIndex(user.email, colorList.length)],
          }
    const sizeClassName = getClassNames(modules_08f3eeac, 'size', avatarSize)
    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            {
                className: [
                    className,
                    modules_08f3eeac.avatar,
                    sizeClassName,
                    exceptionallySetClassName,
                ],
                style: style,
            },
            props,
        ),
        userInitials,
    )
}

Avatar.displayName = 'Avatar'

export { Avatar }
//# sourceMappingURL=avatar.js.map
