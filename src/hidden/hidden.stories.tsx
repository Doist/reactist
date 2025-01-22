import * as React from 'react'
import { Placeholder, ResponsiveWidthRef } from '../utils/storybook-helper'
import { Stack } from '../stack'
import { Hidden } from './hidden'

export default {
    title: 'Design system/Hidden',
    component: Hidden,
    parameters: {
        badges: ['accessible'],
    },
}

export function ResponsiveStory() {
    return (
        <>
            <ResponsiveWidthRef />
            <Stack space="medium">
                <Placeholder label="Always visible 📱💻🖥" />

                <Hidden above="mobile">
                    <Placeholder label="Visible only on mobile 📱" height={30} />
                </Hidden>

                <Hidden below="desktop">
                    <Placeholder label="Visible only on desktop 🖥" height={75} />
                </Hidden>

                <Hidden below="tablet">
                    <Placeholder label="Visible in tablet and desktop 💻🖥" height={60} />
                </Hidden>

                <Hidden above="tablet">
                    <Placeholder label="Visible in mobile and tablet 📱💻" height={45} />
                </Hidden>

                <Hidden above="tablet">
                    <Placeholder label="Does not make sense" />
                </Hidden>
            </Stack>
        </>
    )
}
