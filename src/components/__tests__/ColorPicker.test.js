import React from 'react'
import { shallow } from 'enzyme'

import ColorPicker, { ColorItem } from '../ColorPicker'

describe('ColorPicker', () => {
    it('renders without crashing', () => {
        const colorPicker = shallow(getColorPicker())
        expect(colorPicker).toMatchSnapshot()
    })

    it('renders with custom colorList', () => {
        const colorPicker = shallow(
            getColorPicker({ colorList: ['red', 'green', '#0000FF'] })
        )
        expect(colorPicker).toMatchSnapshot()
    })

    it('renders all colors except the selected one', () => {
        const colorPicker = shallow(getColorPicker({ color: 3 }))

        const colorOptions = colorPicker.find('.color_options')
        const selectedColorItem = colorOptions.find('ColorItem[colorIndex=3]')
        expect(selectedColorItem).toHaveLength(0)
    })

    describe('ColorItem', () => {
        it('renders given color and does nothing when clicked without specified onClick handler', () => {
            const colorItem = shallow(getColorItem())
            colorItem.simulate('click')
            expect(colorItem).toMatchSnapshot()
        })

        it('calls onClick after clicking it', () => {
            const onClickSpy = jest.fn()
            const colorItem = shallow(
                getColorItem({ colorIndex: 5, onClick: onClickSpy })
            )
            colorItem.simulate('click')
            expect(onClickSpy).toHaveBeenLastCalledWith(5)
        })
    })

    // Helpers ================================================================
    const getColorPicker = props => <ColorPicker {...props} />
    const getColorItem = props => (
        <ColorItem color="#606060" colorIndex={0} {...props} />
    )
})
