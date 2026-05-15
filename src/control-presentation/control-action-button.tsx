import * as React from 'react'

import classNames from 'classnames'

import { Button, IconButton } from '../button'

import styles from './control-presentation.module.css'

import type { ComponentProps } from 'react'

export type ControlActionButtonProps =
    | ({
          children: React.ReactElement
      } & Omit<ComponentProps<typeof Button>, 'variant' | 'size'>)
    | ({
          icon?: React.ReactElement
      } & Omit<ComponentProps<typeof IconButton>, 'variant' | 'size'>)

/**
 * A compact action button intended for `ControlPresentation`'s `endSlot`. Wraps
 * Reactist's `Button` / `IconButton` with a 24×24, 3px-radius variant sized to fit
 * the field chrome alongside a 16px icon glyph.
 */
export const ControlActionButton = React.forwardRef<HTMLButtonElement, ControlActionButtonProps>(
    function ControlActionButton({ exceptionallySetClassName, ...props }, ref) {
        return 'children' in props ? (
            <Button
                ref={ref}
                {...props}
                variant="quaternary"
                exceptionallySetClassName={classNames([
                    styles.controlActionButton,
                    exceptionallySetClassName,
                ])}
            />
        ) : (
            <IconButton
                ref={ref}
                {...props}
                variant="quaternary"
                exceptionallySetClassName={classNames([
                    styles.controlActionButton,
                    exceptionallySetClassName,
                ])}
            />
        )
    },
)
