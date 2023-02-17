import * as React from 'react'
import { Box } from '../box'
import styles from './prose.module.css'

type ProseProps = {
    /**
     * The prose content.
     *
     * This must consist of React nodes and elements. It is the consumer’s responsibility to
     * generate this from other sources, such as converting raw markdown content to React elements,
     * etc.
     *
     * Alternatively, you can use `<Prose dangerouslySetInnerHTML={{ __html: htmlString }}` />`
     * instead.
     */
    children?: React.ReactNode

    /**
     * Sets the prose content to be raw HTML stored in a string value.
     */
    dangerouslySetInnerHTML?: { __html: string } | undefined

    /**
     * Whether to customize the typography styles for dark mode.
     *
     * Applies finessed optimizations since our eyes perceive space differently when looking at dark
     * text on a light background and light text on a dark background.
     *
     * This does not apply a dark theme on the text. That's still the consumer apps’ responsibility.
     */
    darkModeTypography: boolean

    /**
     * An escape hatch in case you need to provide custom styles.
     */
    exceptionallySetClassName?: string
}

/**
 * Used to style HTML you don’t control, like HTML content generated from Markdown.
 */
function Prose({ darkModeTypography, exceptionallySetClassName, ...props }: ProseProps) {
    return (
        <Box
            {...props}
            className={[
                styles.prose,
                darkModeTypography ? styles.darkModeTypography : null,
                exceptionallySetClassName,
            ]}
        />
    )
}

export { Prose }
export type { ProseProps }
