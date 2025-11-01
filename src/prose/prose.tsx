import type { ReactNode } from 'react'
import { Box } from '../box'
import styles from './prose.module.css'
import type { ObfuscatedClassName } from '../utils/common-types'

interface ProseProps extends ObfuscatedClassName {
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
    children?: ReactNode

    /**
     * Sets the prose content to be raw HTML stored in a string value.
     *
     * Warning: be advised that setting HTML content in this way is risky, because you can
     * inadvertently be vulnerable to a cross-site scripting (XSS) attack. Make sure you only use
     * this option with HTML content that has been sanitized (especially if it comes from user
     * provided content) or content that you fully control how it's generated, that cannot possibly
     * have any XSS content in it.
     *
     * @see https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
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
