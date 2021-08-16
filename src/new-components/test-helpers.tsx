/* eslint-disable jest/no-export */
/* eslint-disable jest/valid-title */
import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { ResponsiveProp } from './responsive-props'
import { Space } from './common-types'

type PropsWithSpace = { space?: ResponsiveProp<Space>; 'data-testid'?: string }

const spaceValues: Array<Space> = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge']
const testCases = spaceValues.map((space) => [space])

function getSpaceClassNames(element: HTMLElement) {
    return Array.from(element.classList).filter((className) => className.includes('space-'))
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
            expect(getSpaceClassNames(subject)).toEqual([`space-${space}`])
        })

        it('allows to specify different spacing rules for different screen sizes', () => {
            const subject = renderTestCase(['small', 'medium', 'large'])
            expect(getSpaceClassNames(subject)).toEqual([
                'space-small',
                'tablet-space-medium',
                'desktop-space-large',
            ])
        })
    })
}

export { runSpaceTests }
