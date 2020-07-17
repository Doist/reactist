import * as React from 'react'
import { render } from '@testing-library/react'
import KeyboardShortcut from '../KeyboardShortcut'

/**
 * Renders the KeyboardShortcut component twice, once for macOS and non-macOS setting.
 * @param shortcut the keyboard shortcut string
 * @param props extra props for the KeyboardShortcut component
 */
function renderKeyboardShortcut(
    shortcut: string | string[],
    props: Omit<React.ComponentProps<typeof KeyboardShortcut>, 'children' | 'isMac'> = {},
) {
    const { container } = render(
        <>
            <KeyboardShortcut {...props} isMac={false}>
                {shortcut}
            </KeyboardShortcut>
            <KeyboardShortcut {...props} isMac={true}>
                {shortcut}
            </KeyboardShortcut>
        </>,
    )
    return container
}

describe('KeyboardShortcut', () => {
    it('works as expected', () => {
        const element = renderKeyboardShortcut('ctrl + alt + shift + e')
        expect(element).toMatchSnapshot()
    })

    it('recognizes mod/cmd as a modifier that behaves differently in macOS and outside macOS', () => {
        const element = renderKeyboardShortcut(['mod + k', 'cmd+j'])
        expect(element).toMatchSnapshot()
    })

    it('supports passing various shortcuts, which it will separate with commas', () => {
        const element = renderKeyboardShortcut(['p1', 'p2'])
        expect(element).toMatchSnapshot()
    })

    it('only capitalizes a non-modifier part if the overall shortcut has modifiers', () => {
        const element = renderKeyboardShortcut(['e', 'alt+e'])
        expect(element).toMatchSnapshot()
    })

    it('allows to customize how modifiers are translated', () => {
        const element = renderKeyboardShortcut('ctrl + alt + shift + e', {
            translateKey: (modifier) => (modifier.length === 1 ? modifier : `[${modifier}]`),
        })
        expect(element).toMatchSnapshot()
    })
})
