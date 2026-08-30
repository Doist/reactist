export type ThemeAccent =
    | 'red'
    | 'blueberry'
    | 'gold'
    | 'kale'
    | 'lavender'
    | 'moonstone'
    | 'raspberry'
    | 'tangerine'

export type ThemeMode = 'light' | 'dark'

/** Prefix every Product Library theme class shares. Used to strip the previous theme. */
export const THEME_CLASS_PREFIX = 'theme_'

/**
 * The accent axis of the toolbar. `red` is the default Todoist pair,
 * `theme_light` and `theme_dark`.
 */
export const THEME_ACCENTS: ReadonlyArray<{ value: ThemeAccent; title: string }> = [
    { value: 'red', title: 'Red' },
    { value: 'blueberry', title: 'Blueberry' },
    { value: 'gold', title: 'Gold' },
    { value: 'kale', title: 'Kale' },
    { value: 'lavender', title: 'Lavender' },
    { value: 'moonstone', title: 'Moonstone' },
    { value: 'raspberry', title: 'Raspberry' },
    { value: 'tangerine', title: 'Tangerine' },
]

export const THEME_MODES: ReadonlyArray<{ value: ThemeMode; title: string }> = [
    { value: 'light', title: 'Light' },
    { value: 'dark', title: 'Dark' },
]

/**
 * The toolbar's starting selection, used for `initialGlobals` in `preview.ts`.
 * The inline script in `.storybook/preview-head.html` repeats these values.
 */
export const DEFAULT_ACCENT: ThemeAccent = 'red'
export const DEFAULT_MODE: ThemeMode = 'light'
