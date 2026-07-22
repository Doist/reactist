import classNames from 'classnames'

import { getBoxClassNames } from '../box'
import { getClassNames } from '../utils/responsive-props'

import styles from './typography.module.css'

import type { BoxProps } from '../box'
import type { ObfuscatedClassName, Tone } from '../utils/common-types'

type TypographyLineClamp = 1 | 2 | 3 | 4 | 5 | '1' | '2' | '3' | '4' | '5'

type TypographyStyleProps = ObfuscatedClassName & {
    /** The semantic color of the text. */
    tone?: Tone
    /** Horizontal text alignment, including responsive values. */
    align?: BoxProps['textAlign']
    /** Truncates text after the given number of lines. */
    lineClamp?: TypographyLineClamp
}

type TypographyClassNameOptions = TypographyStyleProps & {
    variantClassName: string
    modifierClassNames?: Array<string | undefined>
}

function getTypographyClassName({
    variantClassName,
    modifierClassNames,
    tone = 'normal',
    align,
    lineClamp,
    exceptionallySetClassName,
}: TypographyClassNameOptions) {
    const lineClampMultipleLines = Number(lineClamp ?? 0) > 1

    return classNames(
        getBoxClassNames({
            textAlign: align,
            paddingRight: lineClamp ? 'xsmall' : undefined,
        }),
        exceptionallySetClassName,
        styles.typography,
        variantClassName,
        modifierClassNames,
        tone !== 'normal' ? getClassNames(styles, 'tone', tone) : null,
        lineClampMultipleLines ? styles.lineClampMultipleLines : null,
        lineClamp ? getClassNames(styles, 'lineClamp', String(lineClamp)) : null,
    )
}

export type { TypographyLineClamp, TypographyStyleProps }
export { getTypographyClassName }
