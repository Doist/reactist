import { THEME_ACCENTS, THEME_MODES } from './constants'
import { applyThemeClass, getThemeClassName, getThemeClassNameFromSearch } from './theme-class'

describe('getThemeClassName', () => {
    it('drops the accent for the red pair', () => {
        expect(getThemeClassName('red', 'light')).toBe('theme_light')
        expect(getThemeClassName('red', 'dark')).toBe('theme_dark')
    })

    it('names an accent alone in light mode', () => {
        expect(getThemeClassName('blueberry', 'light')).toBe('theme_blueberry')
    })

    it('suffixes an accent with an underscore in dark mode', () => {
        expect(getThemeClassName('blueberry', 'dark')).toBe('theme_blueberry_dark')
    })

    it('covers every file the token package ships', () => {
        const classNames = THEME_ACCENTS.flatMap((accent) =>
            THEME_MODES.map((mode) => getThemeClassName(accent.value, mode.value)),
        )
        expect(new Set(classNames).size).toBe(16)
    })
})

describe('getThemeClassNameFromSearch', () => {
    it('falls back to the toolbar defaults when the param is absent', () => {
        expect(getThemeClassNameFromSearch('?id=button--docs')).toBe('theme_light')
    })

    it('reads a mode Storybook wrote on its own', () => {
        expect(getThemeClassNameFromSearch('?globals=mode%3Adark')).toBe('theme_dark')
    })

    it('reads an accent and a mode together', () => {
        expect(getThemeClassNameFromSearch('?globals=theme%3Ablueberry%3Bmode%3Adark')).toBe(
            'theme_blueberry_dark',
        )
    })

    it('keeps the default mode when only the accent is named', () => {
        expect(getThemeClassNameFromSearch('?globals=theme%3Akale')).toBe('theme_kale')
    })

    it('ignores globals belonging to other toolbars', () => {
        expect(getThemeClassNameFromSearch('?globals=locale%3Ade%3Bmode%3Adark')).toBe('theme_dark')
    })
})

describe('applyThemeClass', () => {
    it('adds the class to an element that has none', () => {
        const root = document.createElement('html')
        applyThemeClass(root, 'theme_dark')
        expect(root.className).toBe('theme_dark')
    })

    it('replaces a previous theme class', () => {
        const root = document.createElement('html')
        root.classList.add('theme_blueberry_dark')
        applyThemeClass(root, 'theme_kale')
        expect(root.className).toBe('theme_kale')
    })

    it('leaves classes that are not themes alone', () => {
        const root = document.createElement('html')
        root.classList.add('sb-show-main', 'theme_dark')
        applyThemeClass(root, 'theme_light')
        expect([...root.classList].sort()).toEqual(['sb-show-main', 'theme_light'])
    })
})
