import { useEffect } from 'react'

import underscore from '../utils/underscore'

type ThemeProviderProps = {
    theme: string
}

/**
 * Exposes a theme to all Reactist components.
 *
 * Usage:
 *
 *  <ThemeProvider theme="twist-light" />
 *
 * somewhere in your React component tree.
 *
 * Note: Only one instance of ThemeProvider must be rendered. To override themes for a single component,
 * use the `theme` prop for that component.
 */
export default function ThemeProvider({ theme }: ThemeProviderProps) {
    useEffect(() => {
        document.documentElement.setAttribute('data-reactist-theme', `${underscore(theme)}`)
    }, [theme])

    return true
}
