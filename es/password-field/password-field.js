import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { PasswordVisibleIcon } from '../icons/password-visible-icon.js'
import { PasswordHiddenIcon } from '../icons/password-hidden-icon.js'
import { TextField } from '../text-field/text-field.js'
import { IconButton } from '../button/button.js'

const _excluded = ['togglePasswordLabel', 'endSlot']
const PasswordField = /*#__PURE__*/ React.forwardRef(function PasswordField(_ref, ref) {
    let { togglePasswordLabel = 'Toggle password visibility', endSlot } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const [isPasswordVisible, setPasswordVisible] = React.useState(false)
    const Icon = isPasswordVisible ? PasswordVisibleIcon : PasswordHiddenIcon
    return /*#__PURE__*/ React.createElement(
        TextField,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                ref: ref,
                // @ts-expect-error TextField does not support type="password", so we override the type check here
                type: isPasswordVisible ? 'text' : 'password',
                endSlot: /*#__PURE__*/ React.createElement(
                    React.Fragment,
                    null,
                    endSlot,
                    /*#__PURE__*/ React.createElement(IconButton, {
                        variant: 'quaternary',
                        icon: /*#__PURE__*/ React.createElement(Icon, {
                            'aria-hidden': true,
                        }),
                        'aria-label': togglePasswordLabel,
                        onClick: () => setPasswordVisible((v) => !v),
                    }),
                ),
            },
        ),
    )
})

export { PasswordField }
//# sourceMappingURL=password-field.js.map
