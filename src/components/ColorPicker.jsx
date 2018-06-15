import './styles/color_picker.less'

import React from 'react'
import PropTypes from 'prop-types'

import Dropdown from './Dropdown'
import Tooltip from './Tooltip'

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
    '#CCCCCC'
]

const _isNamedColor = color => typeof color !== 'string'
const _getColor = (colorList, colorIndex) => {
    const index = colorIndex >= colorList.length ? 0 : colorIndex
    return colorList[index]
}

const ColorPicker = ({ color, onChange, colorList = COLORS }) => (
    <Dropdown.Box right className="reactist color_picker">
        <Dropdown.Trigger>
            <span
                className="color_trigger"
                style={{
                    backgroundColor: _isNamedColor(colorList[color])
                        ? _getColor(colorList, color).color
                        : _getColor(colorList, color)
                }}
            >
                <span className="color_trigger--inner_ring" />
            </span>
        </Dropdown.Trigger>
        <Dropdown.Body>
            <div className="color_options">
                {colorList.reduce((items, currentColor, currentIndex) => {
                    const isNamed = _isNamedColor(currentColor)
                    items.push(
                        <ColorItem
                            key={currentIndex}
                            color={isNamed ? currentColor.color : currentColor}
                            colorIndex={currentIndex}
                            onClick={onChange}
                            tooltip={isNamed ? currentColor.name : null}
                        />
                    )
                    return items
                }, [])}
            </div>
        </Dropdown.Body>
    </Dropdown.Box>
)
ColorPicker.displayName = 'ColorPicker'
ColorPicker.defaultProps = {
    color: 0
}
ColorPicker.propTypes = {
    /** Currently selected color. Needs to be the index of the COLORS array. */
    color: PropTypes.number.isRequired,
    /** Callback that is invoked when a color has been selected. Is called with the index of the COLORS array. */
    onChange: PropTypes.func,
    /** Optional list of color codes. Either as an array of strings or an array of objects with the color name. Defaults to COLORS array without names. */
    colorList: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({ color: PropTypes.string, name: PropTypes.string })
        ])
    )
}

const ColorItem = ({ color, colorIndex, onClick, tooltip }) => {
    const item = (
        <span
            className="reactist color_item"
            style={{ backgroundColor: color }}
            onClick={() => onClick && onClick(colorIndex)}
        >
            <span className="color_item--inner_ring" />
        </span>
    )

    return tooltip ? <Tooltip text={tooltip}>{item}</Tooltip> : item
}
ColorItem.displayName = 'ColorItem'
ColorItem.propTypes = {
    /** The color of the ColorItem as string. */
    color: PropTypes.string.isRequired,
    /** Index of the color to display. Is based upon the colorList array. */
    colorIndex: PropTypes.number.isRequired,
    /** Optional callback that is called when the item is clicked. */
    onClick: PropTypes.func,
    /** Optional tooltip to be shown when hovering the item. */
    tooltip: PropTypes.string
}

export default ColorPicker
export { ColorItem, COLORS }
