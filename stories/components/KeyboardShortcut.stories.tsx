import '../../src/components/keyboard-shortcut/keyboard-shortcut.less'

import * as React from 'react'

import KeyboardShortcut from '../../src/components/keyboard-shortcut'

// Story setup ================================================================

export default {
    title: '📊 Data display/KeyboardShortcut',
    parameters: {
        badges: ['accessible'],
        figma: {
            label: 'Web › Components / Todoist › Keyboard Shortcuts › Shortcut',
            url: 'https://www.figma.com/design/LYlWNzvhMDh907l07mPPQk/Product-Library---Web?node-id=9140-282739',
        },
    },
}

// Story Definitions ================================================================

export const KeyboardShortcutPlaygroundStory = (args) => {
    const shortcuts =
        typeof args.shortcut === 'string' ? args.shortcut.split(/\s*,\s*/) : args.shortcut
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

KeyboardShortcutPlaygroundStory.args = {
    shortcut: 'Cmd + Alt + Shift + E, q',
}

KeyboardShortcutPlaygroundStory.argTypes = {
    shortcut: {
        control: {
            type: 'text',
        },
    },
}
