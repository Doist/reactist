import './styles/color_picker.less'

import React from 'react'
import PropTypes from 'prop-types'

import Dropdown from './Dropdown'

const COLORS = [
    '#606060', '#4A90E2', '#03B3B2', '#008299',
    '#82BA00', '#D24726', '#AC193D', '#DC4FAD',
    '#3BD5FB', '#74E8D3', '#FFCC00', '#FB886E',
    '#CCCCCC'
]

const ColorPicker = ({ color, onChange }) => (
    <Dropdown.Box right className='reactist color_picker'>
        <Dropdown.Trigger>
            <ColorItem colorIndex={ color } />
        </Dropdown.Trigger>
        <Dropdown.Body>
            <div className='color_options'>
                { COLORS.reduce((items, currentColor, currentIndex) => {
                    if (currentIndex !== color) {
                        items.push(
                            <ColorItem
                                key={ currentIndex }
                                colorIndex={ currentIndex }
                                onClick={ onChange }
                            />
                        )
                    }
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
    onChange: PropTypes.func
}

const ColorItem = ({ colorIndex, onClick }) => (
    <span
        className='reactist color_item'
        style={{ backgroundColor: COLORS[colorIndex] }}
        onClick={ () => onClick && onClick(colorIndex) }
    />
)
ColorItem.displayName = 'ColorItem'
ColorItem.propTypes = {
    /** Index of the color to display. Is based upon the COLORS array. */
    colorIndex: PropTypes.number.isRequired,
    /** Optional callback that is called when the item is clicked. */
    onClick: PropTypes.func
}

export default ColorPicker
export { ColorItem, COLORS }
