import * as React from 'react'

import classNames from 'classnames'

import { Button, IconButton } from '../button'

import styles from './control-presentation.module.css'

import type { ButtonProps, IconButtonProps } from '../button'

export type ControlActionButtonProps =
    | ({
          children: NonNullable<ButtonProps['children']>
          icon?: never
      } & Omit<ButtonProps, 'children' | 'variant' | 'size'>)
    | ({
          icon: IconButtonProps['icon']
          children?: never
      } & Omit<IconButtonProps, 'children' | 'icon' | 'variant' | 'size'>)

/**
 * A compact action button intended for `ControlPresentation`'s `endSlot`. Wraps
 * Reactist's `Button` / `IconButton` with a 24×24, 3px-radius variant sized to fit
 * the field chrome alongside a 16px icon glyph.
 */
export const ControlActionButton = React.forwardRef<HTMLButtonElement, ControlActionButtonProps>(
    function ControlActionButton({ exceptionallySetClassName, ...props }, ref) {
        const sharedProps = {
            ref,
            variant: 'quaternary' as const,
            exceptionallySetClassName: classNames([
                styles.controlActionButton,
                exceptionallySetClassName,
            ]),
        }

        return 'children' in props ? (
            <Button {...props} {...sharedProps} />
        ) : (
            <IconButton {...props} {...sharedProps} />
        )
    },
)
