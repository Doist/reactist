import React from 'react'
import { mount } from 'enzyme'

import Popover from '../Popover'
import * as PositioningUtils from '../utils/PositioningUtils'

describe('Popover', () => {
    it('renders without crashing', () => {
        const popover = mount(getPopover())
        expect(popover).toMatchSnapshot()
    })

    it('adds arrow class when prop is set', () => {
        const popover = mount(getPopover({ withArrow: true }))
        expect(popover).toMatchSnapshot()
    })

    describe('Position Calculation', () => {
        it('calculates tooltip position after becoming visible', () => {
            const updatePopoverPositionSpy = jest.fn()
            const popover = mount(getPopover({ visible: false }))
            ;(popover.instance() as Popover)._updatePopoverPosition = updatePopoverPositionSpy
            popover.setProps({ visible: true })

            expect(updatePopoverPositionSpy).toHaveBeenCalled()
        })

        it('sets the tooltip to the given position if it is not set to `auto`', () => {
            ;(PositioningUtils.hasEnoughSpace as jest.Mock<boolean>) = jest.fn(() => true)
            jest.spyOn(PositioningUtils, 'calculatePosition').mockImplementationOnce(() => ({
                x: 23,
                y: 42,
            }))

            const popover = mount(getPopover({ position: 'right' })).instance() as Popover

            expect(popover.popover.style.getPropertyValue('top')).toBe('42px')
            expect(popover.popover.style.getPropertyValue('left')).toBe('23px')
        })

        it('allows vague positioning to avoid cut offs', () => {
            ;(PositioningUtils.hasEnoughSpace as jest.Mock<boolean>) = jest.fn(() => true)
            jest.spyOn(PositioningUtils, 'calculatePosition').mockImplementationOnce(() => ({
                x: -23,
                y: 42,
            }))

            const popover = mount(getPopover({ allowVaguePositioning: true })).instance() as Popover

            expect(popover.popover.style.getPropertyValue('top')).toBe('-10px')
            expect(popover.popover.style.getPropertyValue('left')).toBe('10px')
        })

        it('sets the tooltip to the first position that has enough space when `auto` is supplied', () => {
            ;(PositioningUtils.hasEnoughSpace as jest.Mock<boolean>) = jest
                .fn()
                .mockReturnValueOnce(false) // top
                .mockReturnValueOnce(false) // right
                .mockReturnValueOnce(false) // bottom
                .mockReturnValueOnce(true) // left
            jest.spyOn(PositioningUtils, 'calculatePosition').mockImplementationOnce(() => ({
                x: 23,
                y: 42,
            }))
            const popover = mount(
                getPopover({ position: 'auto', withArrow: true }),
            ).instance() as Popover

            expect(popover.popover.style.getPropertyValue('top')).toBe('42px')
            expect(popover.popover.style.getPropertyValue('left')).toBe('23px')
            expect(popover.popover.className).toContain('arrow_right')
        })

        it('sets the tooltip to the correct position when changing the gap size', () => {
            ;(PositioningUtils.hasEnoughSpace as jest.Mock<boolean>) = jest.fn(() => true)

            const popover = mount(getPopover({ position: 'top', visible: false }))
            const instance = popover.instance() as Popover

            instance.wrapper.getBoundingClientRect = jest.fn(() => ({
                left: 500,
                top: 500,
                width: 70,
                height: 20,
                x: 0,
                y: 0,
                bottom: 0,
                right: 0,
                toJSON: jest.fn(),
            }))

            instance.popover.getBoundingClientRect = jest.fn(() => ({
                width: 70,
                height: 20,
                left: 0,
                top: 0,
                x: 0,
                y: 0,
                bottom: 0,
                right: 0,
                toJSON: jest.fn(),
            }))

            popover.setProps({ visible: true })

            expect(instance.popover.style.getPropertyValue('top')).toBe('475px')

            popover.setProps({ gapSize: 20 })

            expect(instance.popover.style.getPropertyValue('top')).toBe('460px')
        })

        it('updates position when props change', () => {
            const updatePositionSpy = jest.fn()
            const popover = mount(
                getPopover({
                    position: 'top',
                    allowVaguePosition: false,
                    withArrow: false,
                    gapSize: 10,
                    content: 'First content',
                    visible: false,
                }),
            )
            const instance = popover.instance() as Popover
            instance._updatePopoverPosition = updatePositionSpy
            expect(updatePositionSpy).toHaveBeenCalledTimes(0)

            popover.setProps({ visible: true })
            expect(updatePositionSpy).toHaveBeenCalledTimes(1)

            popover.setProps({ position: 'bottom' })
            expect(updatePositionSpy).toHaveBeenCalledTimes(2)

            popover.setProps({ allowVaguePositioning: true })
            expect(updatePositionSpy).toHaveBeenCalledTimes(3)

            popover.setProps({ withArrow: true })
            expect(updatePositionSpy).toHaveBeenCalledTimes(4)

            popover.setProps({ gapSize: 400 })
            expect(updatePositionSpy).toHaveBeenCalledTimes(5)

            popover.setProps({ content: 'New Content' })
            expect(updatePositionSpy).toHaveBeenCalledTimes(6)

            popover.setProps({ trigger: 'New Trigger' })
            expect(updatePositionSpy).toHaveBeenCalledTimes(6)
        })
    })

    it('updates refs', () => {
        const popoverRefSpy = jest.fn()
        const wrapperRefSpy = jest.fn()
        mount(getPopover({ popoverRef: popoverRefSpy, wrapperRef: wrapperRefSpy }))

        expect(popoverRefSpy).toHaveBeenCalled()
        expect(wrapperRefSpy).toHaveBeenCalled()
    })

    // Helpers ================================================================
    const getPopover = (props = {}) => (
        <Popover
            trigger={<span>Trigger Content</span>}
            content="Popover Content"
            visible
            {...props}
        />
    )
})
