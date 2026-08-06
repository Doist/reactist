import '@doist/product-libraries-tokens/css/td-dark.css'

import * as React from 'react'

const THEME_CLASS = 'theme_dark'

function DarkTheme({ children }: { children: React.ReactNode }) {
    React.useEffect(function applyDarkTheme() {
        const root = document.documentElement
        root.classList.add(THEME_CLASS)
        return () => root.classList.remove(THEME_CLASS)
    }, [])

    return <>{children}</>
}

/**
 * Renders a story under the product library's dark theme.
 */
export function withDarkTheme(Story: React.ComponentType) {
    return (
        <DarkTheme>
            <Story />
        </DarkTheme>
    )
}
