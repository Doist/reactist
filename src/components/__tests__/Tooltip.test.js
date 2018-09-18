import React from 'react'
import { shallow, mount } from 'enzyme'

import Tooltip from '../Tooltip'
import * as PositioningUtils from '../utils/PositioningUtils'

describe('Tooltip', () => {
    // Setup ==================================================================
    beforeEach(() => {
        jest.useFakeTimers()
    })
    afterEach(() => {
        jest.useRealTimers()
    })

    it('renders without crashing', () => {
        const tooltip = shallow(getTooltip())
        expect(tooltip).toMatchSnapshot()
    })

    it('renders only children if text prop is not defined', () => {
        // eslint-disable-next-line
        console.error = jest.fn() // silence errors caused by unsupplied required prop
        const tooltip = shallow(getTooltip({ text: null }))
        expect(tooltip).toMatchSnapshot()
    })

    it('gets visible on hovering and hides on unhovering', () => {
        const tooltip = shallow(getTooltip())

        tooltip.simulate('mouseEnter')
        jest.runAllTimers()
        expect(tooltip.state().visible).toBe(true)

        tooltip.simulate('mouseLeave')
        jest.runAllTimers()
        expect(tooltip.state().visible).toBe(false)
    })

    describe('Arrow Placement', () => {
        it('draws a bottom arrow when rendering to the top', () => {
            const tooltip = shallow(getTooltip({ position: 'top' }))
            tooltip.simulate('mouseEnter')
            jest.runAllTimers()

            expect(tooltip.find('.arrow_bottom')).toBeTruthy()
        })

        it('draws a left arrow when rendering to the right', () => {
            const tooltip = shallow(getTooltip({ position: 'right' }))
            tooltip.simulate('mouseEnter')
            jest.runAllTimers()

            expect(tooltip.find('.arrow_left')).toBeTruthy()
        })

        it('draws a top arrow when rendering to the bottom', () => {
            const tooltip = shallow(getTooltip({ position: 'bottom' }))
            tooltip.simulate('mouseEnter')
            jest.runAllTimers()

            expect(tooltip.find('.arrow_top')).toBeTruthy()
        })

        it('draws a right arrow when rendering to the left', () => {
            const tooltip = shallow(getTooltip({ position: 'left' }))
            tooltip.simulate('mouseEnter')
            jest.runAllTimers()

            expect(tooltip.find('.arrow_right')).toBeTruthy()
        })
    })

    describe('Scroll Listener', () => {
        it('adds a capturing scrolllistener when becoming visible and when hideOnScroll is true', () => {
            document.addEventListener = jest.fn()
            const tooltip = shallow(getTooltip({ hideOnScroll: true }))

            tooltip.simulate('mouseEnter')
            jest.runAllTimers()
            const callArgs = document.addEventListener.mock.calls[0]
            expect(callArgs[0]).toBe('scroll')
            expect(callArgs[2]).toBe(true)
        })

        it('does not add a scrolllistener when becoming visible and when hideOnScroll is false', () => {
            document.addEventListener = jest.fn()
            const tooltip = shallow(getTooltip({ hideOnScroll: false }))

            tooltip.simulate('mouseEnter')
            jest.runAllTimers()
            expect(document.addEventListener).not.toHaveBeenCalled()
        })

        it('removes a capturing scrolllistener when hiding and when hideOnScroll is true', () => {
            document.removeEventListener = jest.fn()
            const tooltip = shallow(getTooltip({ hideOnScroll: true }))

            tooltip.simulate('mouseLeave')
            jest.runAllTimers()
            const callArgs = document.removeEventListener.mock.calls[0]
            expect(callArgs[0]).toBe('scroll')
            expect(callArgs[2]).toBe(true)
        })

        it('does not remove a scrolllistener when hiding and when hideOnScroll is false', () => {
            document.removeEventListener = jest.fn()
            const tooltip = shallow(getTooltip({ hideOnScroll: false }))

            tooltip.simulate('mouseLeave')
            jest.runAllTimers()
            expect(document.removeEventListener).not.toHaveBeenCalled()
        })

        it('removes scroll listener on unmount', () => {
            document.removeEventListener = jest.fn()
            const tooltip = shallow(getTooltip()).instance()

            tooltip.componentWillUnmount()
            expect(document.removeEventListener).toHaveBeenCalled()
        })
    })

    describe('Position Calculation', () => {
        it('calculates tooltip position after becoming visible', () => {
            const updateTooltipPositionSpy = jest.fn()
            const tooltip = mount(getTooltip()).instance()
            tooltip._updateTooltipPosition = updateTooltipPositionSpy

            tooltip.setState({ visible: true })
            expect(updateTooltipPositionSpy).toHaveBeenCalled()
        })

        it('sets the tooltip to the given position if it is not set to `auto`', () => {
            PositioningUtils.hasEnoughSpace = jest.fn(() => true)
            jest.spyOn(
                PositioningUtils,
                'calculatePosition'
            ).mockImplementationOnce(() => ({
                x: 23,
                y: 42
            }))

            const tooltip = mount(getTooltip({ position: 'right' })).instance()
            tooltip.setState({ visible: true }) // triggers update positions

            expect(tooltip.tooltip.style.getPropertyValue('top')).toBe('42px')
            expect(tooltip.tooltip.style.getPropertyValue('left')).toBe('23px')
        })

        it('allows vague positioning to avoid cut offs', () => {
            PositioningUtils.hasEnoughSpace = jest.fn(() => true)
            jest.spyOn(
                PositioningUtils,
                'calculatePosition'
            ).mockImplementationOnce(() => ({
                x: -23,
                y: 42
            }))

            const tooltip = mount(
                getTooltip({ allowVaguePositioning: true })
            ).instance()
            tooltip.setState({ visible: true }) // triggers update positions

            expect(tooltip.tooltip.style.getPropertyValue('top')).toBe('42px')
            expect(tooltip.tooltip.style.getPropertyValue('left')).toBe('10px')
        })

        it('sets the tooltip to the first position that has enough space when `auto` is supplied', () => {
            PositioningUtils.hasEnoughSpace = jest
                .fn()
                .mockReturnValueOnce(false) // top
                .mockReturnValueOnce(false) // right
                .mockReturnValueOnce(false) // bottom
                .mockReturnValueOnce(true) // left
            jest.spyOn(
                PositioningUtils,
                'calculatePosition'
            ).mockImplementationOnce(() => ({
                x: 23,
                y: 42
            }))
            const tooltip = mount(getTooltip({ position: 'auto' })).instance()
            tooltip.setState({ visible: true }) // triggers update positions

            expect(tooltip.tooltip.style.getPropertyValue('top')).toBe('42px')
            expect(tooltip.tooltip.style.getPropertyValue('left')).toBe('23px')
            expect(tooltip.tooltip.className).toContain('arrow_right')
        })

        it('sets the tooltip to the correct position when changing the gap size', () => {
            PositioningUtils.hasEnoughSpace = jest.fn(() => true)

            const wrapper = mount(getTooltip({ position: 'top' }))
            const instance = wrapper.instance()

            instance.wrapper.getBoundingClientRect = jest.fn(() => ({
                left: 500,
                top: 500,
                width: 70,
                height: 20
            }))

            instance.tooltip.getBoundingClientRect = jest.fn(() => ({
                width: 70,
                height: 20
            }))

            instance.setState({ visible: true }) // triggers update positions

            expect(instance.tooltip.style.getPropertyValue('top')).toBe('475px')

            wrapper.setProps({ gapSize: 20 })

            expect(instance.tooltip.style.getPropertyValue('top')).toBe('460px')
        })
    })

    describe('Component Updates', () => {
        it('updates when the state changes', () => {
            const tooltip = shallow(getTooltip()).instance()

            const currentProps = tooltip.props
            const shouldUpdate = tooltip.shouldComponentUpdate(currentProps, {
                visible: true
            })
            expect(shouldUpdate).toBe(true)
        })

        it('updates when any property changes', () => {
            const tooltip = shallow(getTooltip()).instance()
            const currentState = tooltip.state
            const currentProps = tooltip.props

            const shouldUpdateAfterPositionChange = tooltip.shouldComponentUpdate(
                { ...currentProps, position: 'bottom' },
                currentState
            )
            expect(shouldUpdateAfterPositionChange).toBe(true)

            const shouldUpdateAfterTextChange = tooltip.shouldComponentUpdate(
                { ...currentProps, text: 'new tip' },
                currentState
            )
            expect(shouldUpdateAfterTextChange).toBe(true)

            const shouldUpdateAfterHideOnScrollChange = tooltip.shouldComponentUpdate(
                { ...currentProps, hideOnScroll: false },
                currentState
            )
            expect(shouldUpdateAfterHideOnScrollChange).toBe(true)

            const shouldUpdateAfterDelayShowChange = tooltip.shouldComponentUpdate(
                { ...currentProps, delayShow: 2342 },
                currentState
            )
            expect(shouldUpdateAfterDelayShowChange).toBe(true)

            const shouldUpdateAfterDelayHideChange = tooltip.shouldComponentUpdate(
                { ...currentProps, delayHide: 2342 },
                currentState
            )
            expect(shouldUpdateAfterDelayHideChange).toBe(true)

            const shouldUpdateAfterGapSizeChange = tooltip.shouldComponentUpdate(
                { ...currentProps, gapSize: 10 },
                currentState
            )
            expect(shouldUpdateAfterGapSizeChange).toBe(true)

            const shouldUpdateAfterChildrenChange = tooltip.shouldComponentUpdate(
                { ...currentProps, children: <span>New Content</span> },
                currentState
            )
            expect(shouldUpdateAfterChildrenChange).toBe(true)
        })

        it('does not update when state and properties did not change', () => {
            const tooltip = shallow(getTooltip()).instance()

            const currentState = tooltip.state
            const currentProps = tooltip.props
            const shouldUpdate = tooltip.shouldComponentUpdate(
                currentProps,
                currentState
            )
            expect(shouldUpdate).toBe(false)
        })
    })

    it('sets ref of tooltip and wrapper after mounting', () => {
        const tooltip = mount(getTooltip()).instance()

        expect(tooltip.wrapper).toBeTruthy()
        expect(tooltip.tooltip).toBeTruthy()
    })

    // Helpers ================================================================
    const getTooltip = (props = {}) => (
        <Tooltip text="tip" {...props}>
            <span>Wrapped Content</span>
        </Tooltip>
    )
})
