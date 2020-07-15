import * as React from 'react'
import classNames from 'classnames'

//
// Support for setting up how to translate modifiers globally.
//

let globalTranslateKey = (key: string) => key

type TranslateKey = typeof globalTranslateKey

KeyboardShortcut.setTranslateKey = (tr: TranslateKey) => {
    globalTranslateKey = tr
}

function translateKeyMac(key: string) {
    switch (key.toLowerCase()) {
        case 'cmd':
        case 'mod':
            return '⌘'
        case 'control':
        case 'ctrl':
            return '⌃'
        case 'alt':
            return '⌥'
        case 'shift':
            return '⇧'
        case 'space':
            return '␣'
        default:
            return key
    }
}

//
// Some helpers
//

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function hasModifiers(str: string) {
    return /\b(mod|cmd|ctrl|control|alt|shift)\b/i.test(str)
}

function isSpecialKey(str: string) {
    return /^(mod|cmd|ctrl|control|alt|shift|space)$/i.test(str)
}

function parseKeys(shortcut: string, isMac: boolean, translateKey: TranslateKey) {
    const t = isMac ? translateKeyMac : translateKey
    const _hasModifiers = hasModifiers(shortcut)

    function mapIndividualKey(str: string) {
        if (isSpecialKey(str)) {
            return capitalize(t(str))
        }
        if (_hasModifiers && str.length === 1) {
            return str.toUpperCase()
        }
        return str
    }

    if (!isMac) {
        shortcut = shortcut.replace(/\b(mod|cmd)\b/i, 'ctrl')
    }

    return shortcut.split(/\s*\+\s*/).map(mapIndividualKey)
}

//
// The KeyboardShortcut component
//

type NativeSpanProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
>

type Props = Omit<NativeSpanProps, 'children'> & {
    /**
     * The shortcut to be represented as markup. It supports an intuitive syntax where you can
     * combine modifiers (cmd, ctrl, shift, alt) with single keys all concatenated with plus signs.
     * You can also pass various shortcuts as an array, which will be depicted separated by commas.
     */
    children: string | string[]
    /**
     * A function that allows you to change how some key names are represented. This may be useful,
     * for instance, to translate modifier names that are expressed differently in other languages
     * (e.g. `Ctrl` is named `Strg` in German).
     *
     * It defaults to a global version that leaves the key as is. You can pass your version as a
     * prop, or you can also set your own version of this global default one, so you don't need to
     * pass your own on each invocation of this component.
     *
     * ```js
     * import { KeyboardShortcut } from '@doist/reactist'
     * KeyboardShortcut.setTranslateKey = key => { ... }
     * ```
     *
     * Note: When the component detects the macOS operating system it bypasses key translation for
     * most modifiers and uses macOS-specific symbols. See the `isMac` prop for details.
     */
    translateKey?: TranslateKey
    /**
     * This prop is not meant to be passed. The component will automatically initialize it to `true`
     * if it detects that the current browser / operating system is on macOS, in which case modifier
     * keys are represented using macOS' notation (e.g. ⌘ ⌃ ⌥ ⇧).
     *
     * Though it is discouraged, if you don't want this special treatment in macOS, you can pass
     * `isMac={false}` in all invocations of this component.
     */
    isMac?: boolean
}

export default function KeyboardShortcut({
    children,
    className,
    translateKey = globalTranslateKey,
    isMac = navigator.platform != null && navigator.platform.toUpperCase().includes('MAC'),
    ...props
}: Props) {
    const shortcuts = typeof children === 'string' ? [children] : children
    return (
        <span
            className={classNames('reactist_keyboard_shortcut', className, {
                'reactist_keyboard_shortcut--macos': isMac,
            })}
            {...props}
        >
            {shortcuts.map((shortcut, i) => (
                <React.Fragment key={i}>
                    {i === 0 ? null : ', '}
                    <kbd>
                        {parseKeys(shortcut, isMac, translateKey).map((key, j) => (
                            <kbd key={j}>{key}</kbd>
                        ))}
                    </kbd>
                </React.Fragment>
            ))}
        </span>
    )
}
