import { THEME_ACCENTS, THEME_MODES } from './constants'
import { applyThemeClass, getThemeClassName } from './theme-class'

describe('getThemeClassName', () => {
    it('drops the accent for the neutral pair', () => {
        expect(getThemeClassName('neutral', 'light')).toBe('theme_light')
        expect(getThemeClassName('neutral', 'dark')).toBe('theme_dark')
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
