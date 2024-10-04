import * as React from 'react';
declare let globalTranslateKey: (key: string) => string;
type TranslateKey = typeof globalTranslateKey;
type NativeSpanProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
type Props = Omit<NativeSpanProps, 'children'> & {
    /**
     * The shortcut to be represented as markup. It supports an intuitive syntax where you can
     * combine modifiers (cmd, ctrl, shift, alt) with single keys all concatenated with plus signs.
     * You can also pass various shortcuts as an array, which will be depicted separated by commas.
     */
    children: string | string[];
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
    translateKey?: TranslateKey;
    /**
     * This prop is not meant to be passed. The component will automatically initialize it to `true`
     * if it detects that the current browser / operating system is on macOS, in which case modifier
     * keys are represented using macOS' notation (e.g. ⌘ ⌃ ⌥ ⇧).
     *
     * Though it is discouraged, if you don't want this special treatment in macOS, you can pass
     * `isMac={false}` in all invocations of this component.
     */
    isMac?: boolean;
};
declare function KeyboardShortcut({ children, className, translateKey, isMac, ...props }: Props): React.JSX.Element;
declare namespace KeyboardShortcut {
    var setTranslateKey: (tr: (key: string) => string) => void;
}
export { KeyboardShortcut };
