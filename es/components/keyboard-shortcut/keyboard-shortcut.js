import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import classNames from 'classnames'

const _excluded = ['children', 'className', 'translateKey', 'isMac']
// Support for setting up how to translate modifiers globally.
//

let globalTranslateKey = (key) => key

KeyboardShortcut.setTranslateKey = (tr) => {
    globalTranslateKey = tr
}

function translateKeyMac(key) {
    switch (key.toLowerCase()) {
        case 'cmd':
        case 'mod':
            return '⌘'

        case 'control':
        case 'ctrl':
            return '⌃'

        case 'alt':
            return '⌥'

        case 'shift':
            return '⇧'

        case 'space':
            return '␣'

        default:
            return key
    }
} //
// Some helpers
//

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function hasModifiers(str) {
    return /\b(mod|cmd|ctrl|control|alt|shift)\b/i.test(str)
}

function isSpecialKey(str) {
    return /^(mod|cmd|ctrl|control|alt|shift|space|super)$/i.test(str)
}

function parseKeys(shortcut, isMac, translateKey) {
    const t = isMac ? translateKeyMac : translateKey

    const _hasModifiers = hasModifiers(shortcut)

    function mapIndividualKey(str) {
        if (isSpecialKey(str)) {
            return capitalize(t(str))
        }

        if (_hasModifiers && str.length === 1) {
            return str.toUpperCase()
        }

        return str
    }

    if (!isMac) {
        shortcut = shortcut.replace(/\b(mod|cmd)\b/i, 'ctrl')
    }

    return shortcut.split(/\s*\+\s*/).map(mapIndividualKey)
}

function KeyboardShortcut(_ref) {
    var _navigator$platform$t, _navigator$platform

    let {
            children,
            className,
            translateKey = globalTranslateKey,
            isMac = (_navigator$platform$t =
                (_navigator$platform = navigator.platform) == null
                    ? void 0
                    : _navigator$platform.toUpperCase().includes('MAC')) != null
                ? _navigator$platform$t
                : false,
        } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const shortcuts = typeof children === 'string' ? [children] : children
    return /*#__PURE__*/ React.createElement(
        'span',
        _objectSpread2(
            {
                className: classNames('reactist_keyboard_shortcut', className, {
                    'reactist_keyboard_shortcut--macos': isMac,
                }),
            },
            props,
        ),
        shortcuts.map((shortcut, i) =>
            /*#__PURE__*/ React.createElement(
                React.Fragment,
                {
                    key: i,
                },
                i === 0 ? null : ', ',
                /*#__PURE__*/ React.createElement(
                    'kbd',
                    null,
                    parseKeys(shortcut, isMac, translateKey).map((key, j) =>
                        /*#__PURE__*/ React.createElement(
                            'kbd',
                            {
                                key: j,
                            },
                            key,
                        ),
                    ),
                ),
            ),
        ),
    )
}

export { KeyboardShortcut }
//# sourceMappingURL=keyboard-shortcut.js.map
