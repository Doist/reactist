import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'

import '../../src/components/styles/keyboard_shortcut.less'
import KeyboardShortcut from '../../src/components/KeyboardShortcut'

function KeyboardShortcutPlaygroundStory() {
    const shortcuts = text('Shortcut', 'Cmd + Alt + Shift + E, q').split(/\s*,\s*/)
    const shortcut = shortcuts.length > 1 ? shortcuts : shortcuts[0] || ''
    return (
        <section className="story">
            <pre>
                <code>
                    &lt;KeyboardShortcut&gt;
                    <br />
                    &nbsp;&nbsp;
                    {typeof shortcut === 'string' ? (
                        shortcut
                    ) : (
                        <>
                            {'{'}
                            {JSON.stringify(shortcut)}
                            {'}'}
                        </>
                    )}
                    <br />
                    &lt;/KeyboardShortcut&gt;
                </code>
            </pre>
            <p>
                <strong>On macOS:</strong>
                <KeyboardShortcut isMac={true}>{shortcut}</KeyboardShortcut>
            </p>
            <p>
                <strong>Elsewhere:</strong>
                <KeyboardShortcut isMac={false}>{shortcut}</KeyboardShortcut>
            </p>
        </section>
    )
}

// Story setup ================================================================
const Story = () =>
    storiesOf('KeyboardShortcut', module)
        .addDecorator(withKnobs)
        .add('Component Playground', KeyboardShortcutPlaygroundStory)

export { Story as KeyboardShortcutStory }
