import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import { Box } from '../box/box.js'
import { Columns, Column } from '../columns/columns.js'
import { useId } from '../utils/common-helpers.js'
import modules_afa80466 from './banner.module.css.js'

const _excluded = ['id', 'tone', 'icon', 'title', 'description', 'action']
const Banner = /*#__PURE__*/ React.forwardRef(function Banner(_ref, ref) {
    let { id, tone, icon, title, description, action } = _ref,
        props = _objectWithoutProperties(_ref, _excluded)

    const titleId = useId()
    const descriptionId = useId()
    return /*#__PURE__*/ React.createElement(
        Box,
        _objectSpread2(
            _objectSpread2({}, props),
            {},
            {
                ref: ref,
                id: id,
                role: 'status',
                'aria-labelledby': titleId,
                'aria-describedby': descriptionId,
                'aria-live': 'polite',
                tabIndex: 0,
                borderRadius: 'standard',
                className: [modules_afa80466.banner, modules_afa80466['banner-' + tone]],
            },
        ),
        /*#__PURE__*/ React.createElement(
            Columns,
            {
                space: 'medium',
                alignY: 'center',
            },
            /*#__PURE__*/ React.createElement(
                Column,
                {
                    width: 'content',
                    'aria-hidden': true,
                    style: {
                        /* Make sure the icon is centered vertically */
                        lineHeight: 0,
                    },
                },
                icon,
            ),
            /*#__PURE__*/ React.createElement(
                Column,
                null,
                /*#__PURE__*/ React.createElement(
                    Box,
                    {
                        paddingY: 'xsmall',
                    },
                    description
                        ? /*#__PURE__*/ React.createElement(
                              Box,
                              {
                                  id: titleId,
                                  className: [
                                      modules_afa80466.title,
                                      modules_afa80466['title-' + tone],
                                  ],
                              },
                              title,
                          )
                        : /*#__PURE__*/ React.createElement(
                              Box,
                              {
                                  id: titleId,
                                  className: [
                                      modules_afa80466.title, // If the banner does not have a description, we need to slightly tweak
                                      // the styling of the title applying an extra css class
                                      modules_afa80466['title-without-description'],
                                      modules_afa80466['title-' + tone],
                                  ],
                              },
                              title,
                          ),
                    description
                        ? /*#__PURE__*/ React.createElement(
                              Box,
                              {
                                  id: descriptionId,
                                  className: [
                                      modules_afa80466.description,
                                      modules_afa80466['description-' + tone],
                                  ],
                              },
                              description,
                          )
                        : null,
                ),
            ),
            action
                ? /*#__PURE__*/ React.createElement(
                      Column,
                      {
                          width: 'content',
                      },
                      action,
                  )
                : null,
        ),
    )
})

export { Banner }
//# sourceMappingURL=banner.js.map
