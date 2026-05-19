import * as React from 'react'

import { render, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button, Modal, ModalBody, ModalStoryStateProvider } from './modal-stories-components'

describe('Modal story helpers', () => {
    it('renders modal portals inside the Storybook preview root', async () => {
        const storybookRoot = document.createElement('div')
        storybookRoot.id = 'storybook-root'
        document.body.appendChild(storybookRoot)

        render(
            <ModalStoryStateProvider>
                <Button variant="primary" action="open">
                    Open modal
                </Button>
                <Modal aria-label="modal">
                    <ModalBody>Content</ModalBody>
                </Modal>
            </ModalStoryStateProvider>,
            { container: storybookRoot },
        )

        await userEvent.click(within(storybookRoot).getByRole('button', { name: 'Open modal' }))

        expect(
            await within(storybookRoot).findByRole('dialog', { name: 'modal' }),
        ).toBeInTheDocument()
    })
})
