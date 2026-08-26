import { THEME_CLASS_PREFIX } from './constants'

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

/** Swaps whichever theme class the element carries for `className`. */
export function applyThemeClass(root: HTMLElement, className: string): void {
    for (const existing of [...root.classList]) {
        if (existing.startsWith(THEME_CLASS_PREFIX)) root.classList.remove(existing)
    }
    root.classList.add(className)
}
