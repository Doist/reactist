import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { Box } from '../box/box.js'
import modules_4689e97e from './hidden.module.css.js'
import { polymorphicComponent } from '../utils/polymorphism.js'

const _excluded = ['display', 'children', 'exceptionallySetClassName']
/**
 * A component that allows to specify how to hide itself on certain responsive screen sizes, or on
 * print media.
 *
 * @see HiddenProps
 * @see HiddenVisually for hiding content only visually, while keeping it available for assistive
 *   technologies.
 */

const Hidden = /*#__PURE__*/ polymorphicComponent(function Hidden(_ref, ref) {
    let { display = 'block', children, exceptionallySetClassName } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const hiddenOnPrint = 'print' in props && props.print
    const hiddenOnDesktop = 'above' in props
    const hiddenOnMobile = 'below' in props
    const hiddenOnTablet =
        ('below' in props && props.below === 'desktop') ||
        ('above' in props && props.above === 'mobile')

    if (hiddenOnDesktop && hiddenOnMobile) {
        // eslint-disable-next-line no-console
        console.warn('<Hidden /> should receive either above="…" or below="…" but not both')
    }

    if (!hiddenOnDesktop && !hiddenOnMobile && !hiddenOnPrint) {
        // eslint-disable-next-line no-console
        console.warn('<Hidden /> did not receive any criteria to hide itself')
    } // We need to delete these so they do not get forwarded to the Box

    if ('above' in props) delete props['above']
    if ('below' in props) delete props['below']
    if ('print' in props) delete props['print']
    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                ref: ref,
                className: [
                    exceptionallySetClassName,
                    hiddenOnPrint ? modules_4689e97e.hiddenOnPrint : null,
                ],
                display:
                    hiddenOnDesktop && hiddenOnMobile
                        ? 'none'
                        : {
                              mobile: hiddenOnMobile ? 'none' : display,
                              tablet: hiddenOnTablet ? 'none' : display,
                              desktop: hiddenOnDesktop ? 'none' : display,
                          },
            },
        ),
        children,
    )
})

export { Hidden }
//# sourceMappingURL=hidden.js.map
