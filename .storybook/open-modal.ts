// eslint-disable-next-line import/no-unresolved -- Storybook 10 exposes this subpath via package exports.
import { expect, userEvent, within } from 'storybook/test'

/**
 * Used by stories to programmatically open the modal and assert it rendered.
 *
 * @see https://storybook.js.org/docs/react/writing-tests/interaction-testing
 */
export async function openModal({ canvasElement }: { canvasElement: HTMLElement }) {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Open modal' }))
    await expect(await canvas.findByRole('dialog')).toBeInTheDocument()
}
