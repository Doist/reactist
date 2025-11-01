import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { KeyCapturer, KeyCapturerResolver, SUPPORTED_KEYS } from './key-capturer'

import type { EventHandler, SyntheticEvent } from 'react'

describe('KeyCapturer', () => {
    describe('Capturer', () => {
        it('captures arrow down and cancels event', () => {
            const parentSpy = jest.fn()
            const spy = jest.fn()

            render(
                <div onKeyDown={parentSpy}>
                    <KeyCapturer eventName="onKeyDown" onArrowDown={spy}>
                        <input type="text" />
                    </KeyCapturer>
                </div>,
            )

            userEvent.type(screen.getByRole('textbox'), '{arrowdown}')

            expect(spy).toHaveBeenCalledTimes(1)
            expect(parentSpy).not.toHaveBeenCalled()
        })

        it('does not cancel event when propagate prop is set', () => {
            const parentSpy = jest.fn()
            const spy = jest.fn()

            render(
                <div onKeyDown={parentSpy}>
                    <KeyCapturer eventName="onKeyDown" onArrowDown={spy} propagateArrowDown>
                        <input type="text" />
                    </KeyCapturer>
                </div>,
            )

            userEvent.type(screen.getByRole('textbox'), '{arrowdown}')

            expect(spy).toHaveBeenCalledTimes(1)
            expect(parentSpy).toHaveBeenCalledTimes(1)
        })

        it('does not crash when no callback is supplied', () => {
            const spy = jest.fn()

            render(
                <KeyCapturer eventName="onKeyDown" onArrowUp={spy}>
                    <input type="text" />
                </KeyCapturer>,
            )

            userEvent.type(screen.getByRole('textbox'), '{arrowdown}')

            expect(spy).not.toHaveBeenCalled()
        })

        it('does not crash on unknown keys', () => {
            const spy = jest.fn()

            render(
                <KeyCapturer eventName="onKeyDown" onArrowUp={spy}>
                    <input type="text" />
                </KeyCapturer>,
            )

            fireEvent(
                screen.getByRole('textbox'),
                new KeyboardEvent('keydown', { key: 'fooKey', bubbles: true }),
            )

            expect(spy).not.toHaveBeenCalled()
        })

        it('captures event without key but keyCode', () => {
            const spy = jest.fn()

            render(
                <KeyCapturer eventName="onKeyDown" onArrowDown={spy}>
                    <input type="text" />
                </KeyCapturer>,
            )

            fireEvent(
                screen.getByRole('textbox'),
                new KeyboardEvent('keydown', { keyCode: 40, bubbles: true }),
            )

            expect(spy).toHaveBeenCalledTimes(1)
        })

        it('forwards the event to the handler', () => {
            const onEnter: jest.MockedFunction<EventHandler<SyntheticEvent>> = jest.fn()

            render(
                <KeyCapturer eventName="onKeyDown" onEnter={onEnter}>
                    <input type="text" />
                </KeyCapturer>,
            )
            userEvent.type(screen.getByRole('textbox'), '{Enter}')

            // Instance of React synthetic event
            expect(Object.keys(onEnter.mock.calls[0]?.[0] ?? {})).toEqual(
                expect.arrayContaining(['key', 'target', 'isPropagationStopped']),
            )
        })

        it('prevents the Enter key from firing the onEnter handler if composition has started', () => {
            const onEnter = jest.fn()
            render(
                <KeyCapturer eventName="onKeyDown" onEnter={onEnter}>
                    <input type="text" />
                </KeyCapturer>,
            )

            const input = screen.getByRole('textbox')
            fireEvent.compositionStart(input)
            userEvent.type(screen.getByRole('textbox'), '{Enter}')

            expect(onEnter).not.toHaveBeenCalled()
        })

        it('fires the onEnter handler when Enter key is pressed if composition has ended', () => {
            const onEnter = jest.fn()
            render(
                <KeyCapturer eventName="onKeyDown" onEnter={onEnter}>
                    <input type="text" />
                </KeyCapturer>,
            )

            const input = screen.getByRole('textbox')
            fireEvent.compositionStart(input)
            fireEvent.compositionEnd(input)
            userEvent.type(screen.getByRole('textbox'), '{Enter}')

            expect(onEnter).toHaveBeenCalledTimes(1)
        })

        it('prevents the Enter key from firing the onEnter handler if event.which is 229', () => {
            const onEnter = jest.fn()
            render(
                <KeyCapturer eventName="onKeyDown" onEnter={onEnter}>
                    <input type="text" />
                </KeyCapturer>,
            )

            fireEvent(
                screen.getByRole('textbox'),
                new KeyboardEvent('keydown', { key: 'Enter', keyCode: 229, bubbles: true }),
            )

            expect(onEnter).not.toHaveBeenCalled()
        })
    })

    describe('Resolver', () => {
        describe('resolvesByKey', () => {
            const testCases = [
                {
                    description: 'resolves arrow left code',
                    input: 'ArrowLeft',
                    expected: SUPPORTED_KEYS.ARROW_LEFT,
                },
                {
                    description: 'resolves ie specific arrow left code',
                    input: 'Left',
                    expected: SUPPORTED_KEYS.ARROW_LEFT,
                },
                {
                    description: 'resolves arrow up code',
                    input: 'ArrowUp',
                    expected: SUPPORTED_KEYS.ARROW_UP,
                },
                {
                    description: 'resolves ie specific arrow up code',
                    input: 'Up',
                    expected: SUPPORTED_KEYS.ARROW_UP,
                },
                {
                    description: 'resolves arrow right code',
                    input: 'ArrowRight',
                    expected: SUPPORTED_KEYS.ARROW_RIGHT,
                },
                {
                    description: 'resolves ie specific arrow right code',
                    input: 'Right',
                    expected: SUPPORTED_KEYS.ARROW_RIGHT,
                },
                {
                    description: 'resolves arrow down code',
                    input: 'ArrowDown',
                    expected: SUPPORTED_KEYS.ARROW_DOWN,
                },
                {
                    description: 'resolves ie specific arrow down code',
                    input: 'Down',
                    expected: SUPPORTED_KEYS.ARROW_DOWN,
                },
                {
                    description: 'resolves enter code',
                    input: 'Enter',
                    expected: SUPPORTED_KEYS.ENTER,
                },
                {
                    description: 'resolves backspace code',
                    input: 'Backspace',
                    expected: SUPPORTED_KEYS.BACKSPACE,
                },
                {
                    description: 'resolves escape code',
                    input: 'Escape',
                    expected: SUPPORTED_KEYS.ESCAPE,
                },
                {
                    description: 'resolves ie specific escape code',
                    input: 'Esc',
                    expected: SUPPORTED_KEYS.ESCAPE,
                },
                {
                    description: 'returns null for unknown keyCode',
                    input: 'fooKey',
                    expected: null,
                },
            ]
            testCases.forEach((testCase) => {
                // Variable title.
                // eslint-disable-next-line jest/valid-title
                it(testCase.description, () => {
                    expect(KeyCapturerResolver.resolveByKey(testCase.input)).toBe(testCase.expected)
                })
            })
        })

        describe('resolveByKeyCode', () => {
            const testCases = [
                {
                    description: 'resolves arrow left code',
                    input: 37,
                    expected: SUPPORTED_KEYS.ARROW_LEFT,
                },
                {
                    description: 'resolves arrow up code',
                    input: 38,
                    expected: SUPPORTED_KEYS.ARROW_UP,
                },
                {
                    description: 'resolves arrow right code',
                    input: 39,
                    expected: SUPPORTED_KEYS.ARROW_RIGHT,
                },
                {
                    description: 'resolves arrow down code',
                    input: 40,
                    expected: SUPPORTED_KEYS.ARROW_DOWN,
                },
                {
                    description: 'resolves enter code',
                    input: 13,
                    expected: SUPPORTED_KEYS.ENTER,
                },
                {
                    description: 'resolves backspace code',
                    input: 8,
                    expected: SUPPORTED_KEYS.BACKSPACE,
                },
                {
                    description: 'resolves escape code',
                    input: 27,
                    expected: SUPPORTED_KEYS.ESCAPE,
                },
                {
                    description: 'returns null for unknown keyCode',
                    input: 1337,
                    expected: null,
                },
            ]
            testCases.forEach((testCase) => {
                // Variable title.
                // eslint-disable-next-line jest/valid-title
                it(testCase.description, () => {
                    expect(KeyCapturerResolver.resolveByKeyCode(testCase.input)).toBe(
                        testCase.expected,
                    )
                })
            })
        })
    })
})
