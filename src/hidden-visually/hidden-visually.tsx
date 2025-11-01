import { Box } from '../box'
import { polymorphicComponent } from '../utils/polymorphism'

import styles from './hidden-visually.module.css'

import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

/**
 * Provides content to assistive technologies while hiding it from the screen.
 *
 * @see Hidden for fully hiding content, and only under certain conditions.
 */
const HiddenVisually = polymorphicComponent<'div', Props, 'omitClassName'>(
    function HiddenVisually(props, ref) {
        return (
            <Box
                {...props}
                ref={ref}
                position="absolute"
                overflow="hidden"
                className={styles.hiddenVisually}
            />
        )
    },
)

export { HiddenVisually }
