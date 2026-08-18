import * as React from 'react'

import { render, screen } from '@testing-library/react'

import { TextStory } from './text.stories'

describe('TextStory', () => {
    it('uses a 16 px gap between variants', () => {
        render(<TextStory />)

        expect(screen.getByText('Display 1').parentElement).toHaveClass('gap-large')
    })

    it('shows all variant names in Title Case', () => {
        render(<TextStory />)

        for (const variantName of [
            'Display 1',
            'Display 2',
            'Display 3',
            'Display 4',
            'Display 5',
            'Header 1',
            'Header 2',
            'Header 3',
            'Header 4',
            'Subheader 1',
            'Subheader 2',
            'Body 1',
            'Body 2',
            'Body 3',
            'Callout 1',
            'Callout 2',
            'Caption 1',
            'Caption 2',
            'Caption 3',
            'Footnote 1',
            'Footnote 2',
        ]) {
            expect(screen.getByText(variantName)).toBeInTheDocument()
        }
    })
})
