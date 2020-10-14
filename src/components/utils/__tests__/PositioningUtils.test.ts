import {
    hasEnoughSpace,
    calculatePosition,
    calculateTopCenterPosition,
    calculateBottomCenterPosition,
    calculateRightCenterPosition,
    calculateLeftCenterPosition,
} from '../PositioningUtils'

describe('PositioningUtils', () => {
    const windowDimensions = { height: 100, width: 100 }
    const wrapperDimensions = { height: 20, width: 50 }
    const elementDimensions = { height: 20, width: 40 }
    const wrapperPosition = { x: 25, y: 40 } // centered in window
    const gap = 5

    describe('Position Calculations', () => {
        const topCenterPosition = { x: 30, y: 15 }
        const topCenterPositionWithoutGap = { x: 30, y: 20 }
        const bottomCenterPosition = { x: 30, y: 65 }
        const bottomCenterPositionWithoutGap = { x: 30, y: 60 }
        const rightCenterPosition = { x: 80, y: 40 }
        const rightCenterPositionWithoutGap = { x: 75, y: 40 }
        const leftCenterPosition = { x: -20, y: 40 }
        const leftCenterPositionWithoutGap = { x: -15, y: 40 }

        it('calculates the top center position correct', () => {
            const position = calculateTopCenterPosition(
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
                gap,
            )
            expect(position).toEqual(topCenterPosition)
        })
        it('calculates the top center position correct without gap', () => {
            const position = calculateTopCenterPosition(
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
            )
            expect(position).toEqual(topCenterPositionWithoutGap)
        })

        it('calculates the bottom center position correct', () => {
            const position = calculateBottomCenterPosition(
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
                gap,
            )
            expect(position).toEqual(bottomCenterPosition)
        })
        it('calculates the bottom center position correct without gap', () => {
            const position = calculateBottomCenterPosition(
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
            )
            expect(position).toEqual(bottomCenterPositionWithoutGap)
        })

        it('calculates the right center position correct', () => {
            const position = calculateRightCenterPosition(
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
                gap,
            )
            expect(position).toEqual(rightCenterPosition)
        })
        it('calculates the right center position correct without gap', () => {
            const position = calculateRightCenterPosition(
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
            )
            expect(position).toEqual(rightCenterPositionWithoutGap)
        })

        it('calculates the left center position correct', () => {
            const position = calculateLeftCenterPosition(
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
                gap,
            )
            expect(position).toEqual(leftCenterPosition)
        })
        it('calculates the left center position correct without gap', () => {
            const position = calculateLeftCenterPosition(
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
            )
            expect(position).toEqual(leftCenterPositionWithoutGap)
        })

        it('chooses correct calculation method based on given position', () => {
            const topPosition = calculatePosition(
                'top',
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
                gap,
            )
            const rightPosition = calculatePosition(
                'right',
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
                gap,
            )
            const bottomPosition = calculatePosition(
                'bottom',
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
                gap,
            )
            const leftPosition = calculatePosition(
                'left',
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
                gap,
            )

            expect(topPosition).toEqual(topCenterPosition)
            expect(rightPosition).toEqual(rightCenterPosition)
            expect(bottomPosition).toEqual(bottomCenterPosition)
            expect(leftPosition).toEqual(leftCenterPosition)
        })
        it('chooses correct calculation method based on given position without gap', () => {
            const topPosition = calculatePosition(
                'top',
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
            )
            const rightPosition = calculatePosition(
                'right',
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
            )
            const bottomPosition = calculatePosition(
                'bottom',
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
            )
            const leftPosition = calculatePosition(
                'left',
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
            )

            expect(topPosition).toEqual(topCenterPositionWithoutGap)
            expect(rightPosition).toEqual(rightCenterPositionWithoutGap)
            expect(bottomPosition).toEqual(bottomCenterPositionWithoutGap)
            expect(leftPosition).toEqual(leftCenterPositionWithoutGap)
        })
        it('returns the wrapper position if position for calculation is invalid', () => {
            const position = calculatePosition(
                // @ts-expect-error we are deliberately calling an invalid value.
                'invalid',
                wrapperDimensions,
                wrapperPosition,
                elementDimensions,
            )
            expect(position).toEqual(wrapperPosition)
        })
    })

    describe('Enough Space Calculations', () => {
        const getParams = (params: {
            wrapperPosition: { x: number; y: number }
            position: 'top' | 'right' | 'bottom' | 'left'
            gap?: number
            elementDimensions?: { height: number; width: number }
        }) => ({
            windowDimensions,
            wrapperDimensions,
            elementDimensions,
            gap: 5,
            ...params,
        })
        const getTestCase = (
            description: string,
            wrapperPosition: { x: number; y: number },
            position: 'top' | 'right' | 'bottom' | 'left',
            expectedResult: boolean,
        ) => ({
            description,
            params: getParams({ wrapperPosition, position }),
            expectedResult,
        })

        const testCases = [
            // TOP placement ==================================================
            getTestCase(
                'has NOT enough space for top placement when wrapper is at the top edge',
                { x: 0, y: 0 },
                'top',
                false,
            ),
            getTestCase(
                'has NOT enough space for top placement when wrapper is too close to top',
                { x: 0, y: 24 },
                'top',
                false,
            ),
            getTestCase(
                'has enough space for top placement as soon as element + gap fits',
                { x: 0, y: 25 },
                'top',
                true,
            ),
            // RIGHT placement ==================================================
            getTestCase(
                'has NOT enough space for right placement when wrapper is at the right edge',
                { x: 100, y: 50 },
                'right',
                false,
            ),
            getTestCase(
                'has NOT enough space for right placement when wrapper is too close to the right edge',
                { x: 6, y: 50 },
                'right',
                false,
            ),
            getTestCase(
                'has enough space for right placement as soon as element + gap fits',
                { x: 5, y: 50 },
                'right',
                true,
            ),
            // BOTTOM placement ==================================================
            getTestCase(
                'has NOT enough space for bottom placement when wrapper is at the bottom edge',
                { x: 0, y: 100 },
                'bottom',
                false,
            ),
            getTestCase(
                'has NOT enough space for bottom placement when wrapper is too close to the bottom',
                { x: 0, y: 56 },
                'bottom',
                false,
            ),
            getTestCase(
                'has enough space for bottom placement as soon as element + gap fits',
                { x: 0, y: 55 },
                'bottom',
                true,
            ),
            // LEFT placement ==================================================
            getTestCase(
                'has NOT enough space for left placement when wrapper is at the left edge',
                { x: 0, y: 50 },
                'left',
                false,
            ),
            getTestCase(
                'has NOT enough space for left placement when wrapper is too close to the left',
                { x: 44, y: 50 },
                'left',
                false,
            ),
            getTestCase(
                'has enough space for left placement as soon as element + gap fits',
                { x: 45, y: 50 },
                'left',
                true,
            ),
            // edge cases =====================================================
            {
                description: 'invalid position has never enough space',
                params: getParams({
                    wrapperPosition: { x: 50, y: 50 },
                    // @ts-expect-error deliberately passing in an error value
                    position: 'invalid',
                }),
                expectedResult: false,
            },
            {
                description: 'providing a gap value is optional',
                params: getParams({
                    wrapperPosition: { x: 0, y: 20 },
                    position: 'top',
                    gap: undefined,
                }),
                expectedResult: true,
            },
            {
                description: 'has NOT enough space for top placement when wrapper is too wide',
                params: getParams({
                    elementDimensions: { height: 20, width: 51 },
                    wrapperPosition: { x: 50, y: 30 },
                    position: 'top',
                }),
                expectedResult: false,
            },
            {
                description: 'has NOT enough space for right placement when wrapper is too high',
                params: getParams({
                    elementDimensions: { height: 16, width: 41 },
                    wrapperPosition: { x: 5, y: 10 },
                    position: 'right',
                }),
                expectedResult: false,
            },
        ]
        testCases.forEach((testCase) => {
            // Variable title.
            // eslint-disable-next-line jest/valid-title
            it(testCase.description, () => {
                const result = hasEnoughSpace(
                    testCase.params.windowDimensions,
                    testCase.params.elementDimensions,
                    testCase.params.wrapperDimensions,
                    testCase.params.wrapperPosition,
                    testCase.params.position,
                    testCase.params.gap,
                )
                expect(result).toBe(testCase.expectedResult)
            })
        })
    })
})
