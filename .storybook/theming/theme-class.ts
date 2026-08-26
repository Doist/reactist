import { DEFAULT_ACCENT, THEME_CLASS_PREFIX } from './constants'

import type { ThemeAccent, ThemeMode } from './constants'

/**
 * Builds the class name `@doist/product-libraries-tokens` generates for an accent and a mode.
 * Example: `red` + `dark` = `theme_dark`, `blueberry` + `dark` = `theme_blueberry_dark`.
 */
export function getThemeClassName(accent: ThemeAccent, mode: ThemeMode): string {
    if (accent === 'red') return `${THEME_CLASS_PREFIX}${mode}`
    return mode === 'dark'
        ? `${THEME_CLASS_PREFIX}${accent}_dark`
        : `${THEME_CLASS_PREFIX}${accent}`
}

/**
 * Reads Storybook's `globals` query param and returns the theme class it names.
 * Storybook writes it as `theme:blueberry;mode:dark`, and omits any global still
 * at its `initialGlobals` value.
 *
 * The inline script in `.storybook/preview-head.html` repeats this rule. Change
 * both together.
 */
export function getThemeClassNameFromSearch(search: string): string {
    const globals = new URLSearchParams(search).get('globals') ?? ''
    const parsed = new Map(
        globals
            .split(';')
            .map((pair) => pair.split(':'))
            .filter((parts): parts is [string, string] => parts.length === 2),
    )
    const accent = (parsed.get('theme') ?? DEFAULT_ACCENT) as ThemeAccent
    const mode = parsed.get('mode') === 'dark' ? 'dark' : 'light'
    return getThemeClassName(accent, mode)
}

/** Swaps whichever theme class the element carries for `className`. */
export function applyThemeClass(root: HTMLElement, className: string): void {
    for (const existing of [...root.classList]) {
        if (existing.startsWith(THEME_CLASS_PREFIX)) root.classList.remove(existing)
    }
    root.classList.add(className)
}
