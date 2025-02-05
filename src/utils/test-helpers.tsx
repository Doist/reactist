/* eslint-disable jest/no-export */
/* eslint-disable jest/valid-title */
import * as React from 'react'
import { act, render, screen } from '@testing-library/react'
import type { ResponsiveProp } from './responsive-props'
import type { Space } from './common-types'

type PropsWithSpace = { space?: ResponsiveProp<Space>; 'data-testid'?: string }

const spaceValues: Array<Space> = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']
const testCases = spaceValues.map((space) => [space])

function getSpaceClassNames(element: HTMLElement) {
    return Array.from(element.classList).filter((className) => className.includes('gap-'))
}

function runSpaceTests<Props extends PropsWithSpace>(Component: React.ComponentType<Props>) {
    function renderTestCase(space: ResponsiveProp<Space>) {
        // @ts-expect-error not sure how to properly type the Component argument above
        render(<Component data-testid="subject" space={space} />)
        return screen.getByTestId('subject')
    }

    describe('space', () => {
        test.each(testCases)('it applies the styles needed for space="%s"', (space) => {
            const subject = renderTestCase(space)
            expect(getSpaceClassNames(subject)).toEqual([`gap-${space}`])
        })

        it('allows to specify different spacing rules for different screen sizes', () => {
            const subject = renderTestCase({ mobile: 'small', tablet: 'medium', desktop: 'large' })
            expect(getSpaceClassNames(subject)).toEqual([
                'gap-small',
                'tablet-gap-medium',
                'desktop-gap-large',
            ])
        })
    })
}

/**
 * Solves some issues with unwanted warnings in tests of ariakit components due to its internal
 * usage of the event queue for asynchronous side-effects.
 *
 * Think of it as a special version of `act` that we need to call to make sure some async (but
 * immediate) actions are taken care of. Mostly around the ariakit popover and combobox elements'
 * state management.
 *
 * @see https://twitter.com/diegohaz/status/1560525455383461888
 * @see https://github.com/ariakit/ariakit/issues/1800#issuecomment-1227862399
 */
function flushMicrotasks() {
    return act(() => Promise.resolve())
}

function TestIcon() {
    return (
        <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            data-testid="test-icon"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-1a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1.18-11.84a.84.84 0 1 1-1.68 0 .84.84 0 0 1 1.68 0zM12.5 10a.5.5 0 0 1 .5.5V15h1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h1v-4h-1a.5.5 0 0 1 0-1h1.5z"
                fill="currentColor"
            />
        </svg>
    )
}

export { runSpaceTests, flushMicrotasks, TestIcon }
