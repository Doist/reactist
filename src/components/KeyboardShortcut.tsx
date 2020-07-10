import * as React from 'react'
import classNames from 'classnames'

type Modifier = 'ctrl' | 'alt' | 'shift'
type TranslateModifiers = (modifier: Modifier) => string

function defaultTranslateModifiers(modifier: Modifier) {
    return modifier.charAt(0).toUpperCase() + modifier.slice(1).toLowerCase()
}

function hasModifiers(str: string) {
    return /\b(mod|cmd|ctrl|alt|shift)\b/.test(str)
}

function parseKeysMac(shortcut: string) {
    const str = hasModifiers(shortcut) ? shortcut.toUpperCase() : shortcut
    return str
        .replace(/\b(mod|cmd)\b/gi, '⌘')
        .replace(/\bctrl\b/gi, '⌃')
        .replace(/\balt\b/gi, '⌥')
        .replace(/\bshift\b/gi, '⇧')
        .split(/\s*\+\s*/)
}

function parseKeysDefault(shortcut: string, translateModifiers: TranslateModifiers) {
    const _hasModifiers = hasModifiers(shortcut)

    function mapIndividualKey(str: string) {
        if (str === 'ctrl' || str === 'alt' || str === 'shift') {
            return translateModifiers(str)
        }
        if (_hasModifiers && str.length === 1) {
            return str.toUpperCase()
        }
        return str
    }

    return shortcut
        .replace(/\b(mod|cmd)\b/i, 'ctrl')
        .split(/\s*\+\s*/)
        .map(mapIndividualKey)
}

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
     * A function that will be used to change how you want all supported modifiers represented. This
     * may be useful if in some languages a modifier is not expressed as in English.
     */
    translateModifiers?: TranslateModifiers
    /**
     * This prop is not meant to be passed. The component will automatically initialize it to `true`
     * if it detects that the current browser / operating system is on macOS, in which case modifier
     * keys are represented using macOS' notation (e.g. ⌘ ⌃ ⌥ ⇧).
     */
    isMac?: boolean
}

export default function KeyboardShortcut({
    children,
    translateModifiers = defaultTranslateModifiers,
    className,
    isMac = navigator.platform != null && navigator.platform.toUpperCase().includes('MAC'),
    ...props
}: Props) {
    const shortcuts = typeof children === 'string' ? [children] : children
    const parseKeys = isMac ? parseKeysMac : parseKeysDefault
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
                    <kbd className="reactist_keyboard_shortcut__group">
                        {parseKeys(shortcut, translateModifiers).map((key, j) => (
                            <React.Fragment key={j}>
                                <kbd className="reactist_keyboard_shortcut__plus">
                                    {j === 0 ? null : '+'}
                                </kbd>
                                <kbd className="reactist_keyboard_shortcut__key">{key}</kbd>
                            </React.Fragment>
                        ))}
                    </kbd>
                </React.Fragment>
            ))}
        </span>
    )
}
