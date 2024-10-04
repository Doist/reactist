import * as React from 'react'
import classNames from 'classnames'
import { Dropdown } from '../deprecated-dropdown/dropdown.js'
import { Tooltip } from '../../tooltip/tooltip.js'

const COLORS = [
    '#606060',
    '#4A90E2',
    '#03B3B2',
    '#008299',
    '#82BA00',
    '#D24726',
    '#AC193D',
    '#DC4FAD',
    '#3BD5FB',
    '#74E8D3',
    '#FFCC00',
    '#FB886E',
    '#CCCCCC',
]

const _isNamedColor = (color) => typeof color !== 'string'

const _getColor = (colorList, colorIndex) => {
    const index = colorIndex >= colorList.length ? 0 : colorIndex
    return colorList[index]
}

function ColorPicker({ color = 0, small, onChange, colorList = COLORS }) {
    return /*#__PURE__*/ React.createElement(
        Dropdown.Box,
        {
            right: true,
            className: 'reactist_color_picker',
        },
        /*#__PURE__*/ React.createElement(
            Dropdown.Trigger,
            null,
            (() => {
                const backgroundColor = _getColor(colorList, color)

                return /*#__PURE__*/ React.createElement(
                    'span',
                    {
                        className: classNames('color_trigger', {
                            small,
                        }),
                        style: {
                            backgroundColor: _isNamedColor(backgroundColor)
                                ? backgroundColor.color
                                : backgroundColor,
                        },
                    },
                    /*#__PURE__*/ React.createElement('span', {
                        className: 'color_trigger--inner_ring',
                    }),
                )
            })(),
        ),
        /*#__PURE__*/ React.createElement(
            Dropdown.Body,
            null,
            /*#__PURE__*/ React.createElement(
                'div',
                {
                    className: 'color_options',
                },
                colorList.reduce((items, currentColor, currentIndex) => {
                    items.push(
                        /*#__PURE__*/ React.createElement(ColorItem, {
                            isActive:
                                color >= colorList.length
                                    ? currentIndex === 0
                                    : currentIndex === color,
                            key: currentIndex,
                            color: _isNamedColor(currentColor) ? currentColor.color : currentColor,
                            colorIndex: currentIndex,
                            onClick: onChange,
                            tooltip: _isNamedColor(currentColor) ? currentColor.name : null,
                        }),
                    )
                    return items
                }, []),
            ),
        ),
    )
}

ColorPicker.displayName = 'ColorPicker'

function ColorItem({ color, colorIndex, isActive, onClick, tooltip }) {
    const item = /*#__PURE__*/ React.createElement(
        'span',
        {
            'data-testid': 'reactist-color-item',
            className: 'reactist color_item' + (isActive ? ' active' : ''),
            style: {
                backgroundColor: color,
            },
            onClick: () => (onClick == null ? void 0 : onClick(colorIndex)),
        },
        /*#__PURE__*/ React.createElement('span', {
            className: 'color_item--inner_ring',
        }),
    )
    return tooltip
        ? /*#__PURE__*/ React.createElement(
              Tooltip,
              {
                  content: tooltip,
              },
              item,
          )
        : item
}

ColorItem.displayName = 'ColorItem'

export { COLORS, ColorItem, ColorPicker }
//# sourceMappingURL=color-picker.js.map
