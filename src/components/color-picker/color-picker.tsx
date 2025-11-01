import './color-picker.less'

import classnames from 'classnames'

import { Tooltip } from '../../tooltip'
import DeprecatedDropdown from '../deprecated-dropdown'

import type { ReactNode } from 'react'

type NamedColor = { name: string; color: string }

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

const _isNamedColor = (color: string | NamedColor | undefined): color is NamedColor =>
    typeof color !== 'string'

const _getColor = (colorList: (string | NamedColor)[], colorIndex: number) => {
    const index = colorIndex >= colorList.length ? 0 : colorIndex
    return colorList[index]
}

type Props = {
    small?: boolean
    color?: number
    onChange?: (color: number) => void
    colorList?: (string | NamedColor)[]
}

function ColorPicker({ color = 0, small, onChange, colorList = COLORS }: Props) {
    return (
        <DeprecatedDropdown.Box right className="reactist_color_picker">
            <DeprecatedDropdown.Trigger>
                {(() => {
                    const backgroundColor = _getColor(colorList, color)

                    return (
                        <span
                            className={classnames('color_trigger', { small })}
                            style={{
                                backgroundColor: _isNamedColor(backgroundColor)
                                    ? backgroundColor.color
                                    : backgroundColor,
                            }}
                        >
                            <span className="color_trigger--inner_ring" />
                        </span>
                    )
                })()}
            </DeprecatedDropdown.Trigger>
            <DeprecatedDropdown.Body>
                <div className="color_options">
                    {colorList.reduce<ReactNode[]>((items, currentColor, currentIndex) => {
                        items.push(
                            <ColorItem
                                isActive={
                                    color >= colorList.length
                                        ? currentIndex === 0
                                        : currentIndex === color
                                }
                                key={currentIndex}
                                color={
                                    _isNamedColor(currentColor) ? currentColor.color : currentColor
                                }
                                colorIndex={currentIndex}
                                onClick={onChange}
                                tooltip={_isNamedColor(currentColor) ? currentColor.name : null}
                            />,
                        )
                        return items
                    }, [])}
                </div>
            </DeprecatedDropdown.Body>
        </DeprecatedDropdown.Box>
    )
}
ColorPicker.displayName = 'ColorPicker'

type ColorItemProps = {
    color: string
    colorIndex: number
    isActive?: boolean
    onClick?: (colorIndex: number) => void
    tooltip?: ReactNode
}

function ColorItem({ color, colorIndex, isActive, onClick, tooltip }: ColorItemProps) {
    const item = (
        <span
            data-testid="reactist-color-item"
            className={'reactist color_item' + (isActive ? ' active' : '')}
            style={{ backgroundColor: color }}
            onClick={() => onClick?.(colorIndex)}
        >
            <span className="color_item--inner_ring" />
        </span>
    )

    return tooltip ? <Tooltip content={tooltip}>{item}</Tooltip> : item
}
ColorItem.displayName = 'ColorItem'

export { ColorItem, ColorPicker, COLORS }
