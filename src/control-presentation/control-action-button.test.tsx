import * as React from 'react'

import { render, screen } from '@testing-library/react'

import { ControlActionButton } from './control-action-button'

import styles from './control-presentation.module.css'

describe('ControlActionButton', () => {
    it('renders the text-label Button branch with compact field styling', () => {
        render(<ControlActionButton>Clear</ControlActionButton>)

        const button = screen.getByRole('button', { name: 'Clear' })
        expect(button).toHaveClass(styles.controlActionButton!)
    })

    it('renders the icon-only IconButton branch with compact field styling', () => {
        render(<ControlActionButton icon="x" aria-label="Clear" />)

        const button = screen.getByRole('button', { name: 'Clear' })
        expect(button).toHaveClass(styles.controlActionButton!)
    })
})
