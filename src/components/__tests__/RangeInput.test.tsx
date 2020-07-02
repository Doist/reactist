import React from 'react'
import { shallow } from 'enzyme'

import RangeInput from '../RangeInput'

describe('RangeInput', () => {
    it('renders without crashing', () => {
        const rangeInput = shallow(getRangeInput())
        expect(rangeInput).toMatchSnapshot()
    })

    it('calls onChange when value of range input changes', () => {
        const onChangeSpy = jest.fn()
        const rangeInput = shallow(getRangeInput({ onChange: onChangeSpy }))

        rangeInput.find('.range_slider').simulate('change', { target: { value: '60' } })
        expect(onChangeSpy).toHaveBeenLastCalledWith(60)
    })

    it('calls only onMinus when clicking on minus button', () => {
        const onMinusSpy = jest.fn()
        const onChangeSpy = jest.fn()
        const rangeInput = shallow(getRangeInput({ onMinus: onMinusSpy, onChange: onChangeSpy }))

        rangeInput.find('.range_btn.minus').simulate('click')
        expect(onMinusSpy).toHaveBeenLastCalledWith(49)
        expect(onChangeSpy).not.toHaveBeenCalled()
    })

    it('calls only onPlus when clicking on plus button', () => {
        const onPlusSpy = jest.fn()
        const onChangeSpy = jest.fn()
        const rangeInput = shallow(getRangeInput({ onPlus: onPlusSpy, onChange: onChangeSpy }))

        rangeInput.find('.range_btn.plus').simulate('click')
        expect(onPlusSpy).toHaveBeenLastCalledWith(51)
        expect(onChangeSpy).not.toHaveBeenCalled()
    })

    it('calls onChange if onMinus is not supplied when clicking on minus button', () => {
        const onChangeSpy = jest.fn()
        const rangeInput = shallow(getRangeInput({ onChange: onChangeSpy }))

        rangeInput.find('.range_btn.minus').simulate('click')
        expect(onChangeSpy).toHaveBeenLastCalledWith(49)
    })

    it('calls onChange if onPlus is not supplied when clicking on plus button', () => {
        const onChangeSpy = jest.fn()
        const rangeInput = shallow(getRangeInput({ onChange: onChangeSpy }))

        rangeInput.find('.range_btn.plus').simulate('click')
        expect(onChangeSpy).toHaveBeenLastCalledWith(51)
    })

    it('does not call onPlus if the value is at the maximum', () => {
        const onPlusSpy = jest.fn()
        const rangeInput = shallow(getRangeInput({ onPlus: onPlusSpy, value: 100 }))

        rangeInput.find('.range_btn.plus').simulate('click')
        expect(onPlusSpy).not.toHaveBeenCalled()
    })

    it('does not call onMinus if the value is at the minimum', () => {
        const onMinusSpy = jest.fn()
        const rangeInput = shallow(getRangeInput({ onMinus: onMinusSpy, value: 0 }))

        rangeInput.find('.range_btn.minus').simulate('click')
        expect(onMinusSpy).not.toHaveBeenCalled()
    })

    // helpers ================================================================
    const getRangeInput = (props: React.ComponentProps<typeof RangeInput> = {}) => (
        <RangeInput value={50} onChange={jest.fn()} {...props} />
    )
})
