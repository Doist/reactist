import '@doist/product-libraries-tokens/css/td-light.css'
import '@doist/product-libraries-tokens/css/td-dark.css'
import '@doist/product-libraries-tokens/css/td-blueberry.css'
import '@doist/product-libraries-tokens/css/td-blueberry-dark.css'
import '@doist/product-libraries-tokens/css/td-gold.css'
import '@doist/product-libraries-tokens/css/td-gold-dark.css'
import '@doist/product-libraries-tokens/css/td-kale.css'
import '@doist/product-libraries-tokens/css/td-kale-dark.css'
import '@doist/product-libraries-tokens/css/td-lavender.css'
import '@doist/product-libraries-tokens/css/td-lavender-dark.css'
import '@doist/product-libraries-tokens/css/td-moonstone.css'
import '@doist/product-libraries-tokens/css/td-moonstone-dark.css'
import '@doist/product-libraries-tokens/css/td-raspberry.css'
import '@doist/product-libraries-tokens/css/td-raspberry-dark.css'
import '@doist/product-libraries-tokens/css/td-tangerine.css'
import '@doist/product-libraries-tokens/css/td-tangerine-dark.css'
import './theme-surfaces.css'

import * as React from 'react'

import { THEME_ACCENTS, THEME_MODES } from './constants'
import { applyThemeClass, getThemeClassName } from './theme-class'

import type { ThemeAccent, ThemeMode } from './constants'
import type { Decorator } from '@storybook/react-vite'

type StoryContext = Parameters<Decorator>[1]

/** Renders a story under the Product Library theme the toolbar selects. */
export function ThemeDecorator(Story: React.ComponentType, { globals }: StoryContext) {
    const accent = globals.theme as ThemeAccent
    const mode = globals.mode as ThemeMode
    const className = getThemeClassName(accent, mode)

    React.useLayoutEffect(
        function applyTheme() {
            applyThemeClass(document.documentElement, className)
        },
        [className],
    )

    return <Story />
}

export const themeToolbarConfig = {
    name: 'Theme',
    description: 'Product Library accent',
    toolbar: {
        icon: 'paintbrush',
        dynamicTitle: true,
        items: THEME_ACCENTS.map(({ value, title }) => ({ value, title })),
    },
} as const

export const modeToolbarConfig = {
    name: 'Mode',
    description: 'Light or dark',
    toolbar: {
        icon: 'contrast',
        dynamicTitle: true,
        items: THEME_MODES.map(({ value, title }) => ({ value, title })),
    },
} as const
