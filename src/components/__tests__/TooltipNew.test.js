import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import TooltipNew from '../TooltipNew'

beforeAll(() => {
    // jsdom does not support some of the browser API
    // which popper.js needs. So here we are mocking
    // some of the API
    // https://github.com/popperjs/popper-core/issues/478
    if (global.document) {
        document.createRange = () => ({
            setStart: () => {},
            setEnd: () => {},
            commonAncestorContainer: {
                nodeName: 'BODY',
                ownerDocument: document
            }
        })
    }
})

describe('TooltipNew', () => {
    test('should show when mouseover and hide when mouseleave', () => {
        const { queryByText } = render(
            <TooltipNew title="tooltip_content">
                <div>foo</div>
            </TooltipNew>
        )

        const target = queryByText('foo')

        expect(target).not.toBeNull()
        expect(queryByText('tooltip_content')).toBeNull()

        fireEvent.mouseOver(target)
        expect(queryByText('tooltip_content')).not.toBeNull()

        fireEvent.mouseLeave(target)
        expect(queryByText('tooltip_content')).toBeNull()
    })

    test('should show when focus and hide when blur', () => {
        const { queryByText } = render(
            <TooltipNew title="tooltip_content">
                <div>foo</div>
            </TooltipNew>
        )

        const target = queryByText('foo')

        expect(target).not.toBeNull()
        expect(queryByText('tooltip_content')).toBeNull()

        fireEvent.focus(target)
        expect(queryByText('tooltip_content')).not.toBeNull()

        fireEvent.blur(target)
        expect(queryByText('tooltip_content')).toBeNull()
    })

    test('children component mouse event handler should not be affected by the tooltip', () => {
        const onMouseOver = jest.fn()
        const onMouseLeave = jest.fn()

        const { queryByText } = render(
            <TooltipNew title="tooltip_content">
                <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
                    foo
                </div>
            </TooltipNew>
        )

        const target = queryByText('foo')
        fireEvent.mouseOver(target)
        expect(onMouseOver).toHaveBeenCalled()

        fireEvent.mouseLeave(target)
        expect(onMouseLeave).toHaveBeenCalled()
    })

    test('children props.ref should still receive element instance correctly', () => {
        const ref = { current: null }

        const { queryByText } = render(
            <TooltipNew title="tooltip_content">
                <div ref={ref}>foo</div>
            </TooltipNew>
        )

        expect(ref.current).toBe(queryByText('foo'))
    })
})
