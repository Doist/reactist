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

    describe('ColorItem', () => {
        it('renders given color and does nothing when clicked without specified onClick handler', () => {
            const colorItem = shallow(getColorItem())
            colorItem.simulate('click')
            expect(colorItem).toMatchSnapshot()
        })

        it('adds active class when prop is supplied', () => {
            const colorItem = shallow(
                getColorItem({ isActive: true, colorIndex: 5, color: '#fff' })
            )
            expect(colorItem.hasClass('active')).toBe(true)
        })

        it('calls onClick after clicking it', () => {
            const onClickSpy = jest.fn()
            const colorItem = shallow(
                getColorItem({
                    colorIndex: 5,
                    onClick: onClickSpy,
                    color: '#fff',
                })
            )
            colorItem.simulate('click')
            expect(onClickSpy).toHaveBeenLastCalledWith(5)
        })
    })

    // Helpers ================================================================
    const getColorPicker = (
        props?: React.ComponentProps<typeof ColorPicker>
    ) => <ColorPicker {...props} />
    const getColorItem = (props?: React.ComponentProps<typeof ColorItem>) => (
        <ColorItem color="#606060" colorIndex={0} {...props} />
    )
})
