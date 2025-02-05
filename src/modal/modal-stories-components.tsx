import * as React from 'react'

import { within, userEvent } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

import { Placeholder, times } from '../utils/storybook-helper'
import { SelectField } from '../select-field'
import { SwitchField } from '../switch-field'
import { Stack } from '../stack'
import { Button } from '../button'

import * as ModalComponents from './modal'

import type { ModalProps, ModalHeaderProps, ModalFooterProps } from './modal'

function Link({ children, ...props }: JSX.IntrinsicElements['a']) {
    return (
        <a {...props} onClick={(event) => event.preventDefault()}>
            {children}
        </a>
    )
}

type ModalStoryState = Pick<ModalProps, 'width' | 'height'> & {
    button: 'true' | 'false' | 'custom'
    hideOn: 'escapeAndOverlay' | 'escape' | 'overlay'
    withScrollableContent: boolean
}

const defaultInitialState: ModalStoryState = {
    width: 'medium',
    height: 'expand',
    button: 'true',
    hideOn: 'escapeAndOverlay',
    withScrollableContent: false,
}

type ModalStoryContextValue = ModalStoryState & {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}

const ModalStoryContext = React.createContext<ModalStoryContextValue>({
    ...defaultInitialState,
    isOpen: false,
    openModal: () => undefined,
    closeModal: () => undefined,
    onChange: () => undefined,
})

function ModalStoryStateProvider({
    initialState,
    children,
}: {
    initialState?: Partial<ModalStoryState>
    children: React.ReactNode
}) {
    const [isOpen, setOpen] = React.useState(false)
    const openModal = React.useCallback(() => {
        setOpen(true)
    }, [])
    const closeModal = React.useCallback(() => {
        setOpen(false)
    }, [])
    const [props, setProps] = React.useState<ModalStoryState>({
        ...defaultInitialState,
        ...initialState,
    })

    const onChange = React.useCallback(function onChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) {
        const element = event.currentTarget
        const name = element.name
        const value =
            element instanceof HTMLInputElement && element.type === 'checkbox'
                ? element.checked
                : element.value
        setProps((props) => ({ ...props, [name]: value }))
    },
    [])

    const value = React.useMemo(
        () => ({
            isOpen,
            openModal,
            closeModal,
            onChange,
            ...props,
        }),
        [isOpen, openModal, closeModal, onChange, props],
    )

    return <ModalStoryContext.Provider value={value}>{children}</ModalStoryContext.Provider>
}

function ScrollableContent({ label = 'Item', count = 20 }: { label?: string; count?: number }) {
    return (
        <Stack space="xlarge">
            {times(count).map((index) => (
                <Placeholder key={index} height="30px" label={`${label} ${index + 1}`} />
            ))}
        </Stack>
    )
}

function ModalOptionsForm({ title }: { title?: React.ReactNode }) {
    const { button, width, height, hideOn, withScrollableContent, onChange } = React.useContext(
        ModalStoryContext,
    )
    return (
        <Stack space="large">
            {title}

            <SelectField label="Header button" name="button" value={button} onChange={onChange}>
                <option value="true">show</option>
                <option value="false">hide</option>
                <option value="custom">custom</option>
            </SelectField>

            <SelectField label="width" name="width" value={width} onChange={onChange}>
                <option value="xsmall">xsmall</option>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
                <option value="xlarge">xlarge</option>
                <option value="full">full</option>
            </SelectField>

            <SelectField label="height" name="height" value={height} onChange={onChange}>
                <option value="fitContent">fitContent</option>
                <option value="expand">expand</option>
            </SelectField>

            <SelectField label="Hide on" name="hideOn" value={hideOn} onChange={onChange}>
                <option value="escapeAndOverlay">escape and overlay click</option>
                <option value="overlay">overlay click</option>
                <option value="escape">escape</option>
            </SelectField>

            <SwitchField
                name="withScrollableContent"
                label="Extra content to scroll"
                message="When enabled, it renders extra content below to make the modal body scroll"
                checked={withScrollableContent}
                onChange={onChange}
            />

            {withScrollableContent ? <ScrollableContent /> : null}
        </Stack>
    )
}

function renderHeaderButton(button: ModalStoryState['button']) {
    switch (button) {
        case 'true':
            return true
        case 'false':
            return false
        case 'custom':
            return <Link href="/help">Help</Link>
    }
}

function ModalButton({
    variant,
    size,
    children,
    action = 'close',
}: {
    variant: 'primary' | 'secondary' | 'danger'
    action?: 'open' | 'close'
    size?: 'small'
    children: NonNullable<React.ReactNode>
}) {
    const { openModal, closeModal } = React.useContext(ModalStoryContext)
    return (
        <Button
            variant={variant === 'danger' ? 'primary' : variant}
            tone={variant === 'danger' ? 'destructive' : undefined}
            size={size}
            onClick={action === 'open' ? openModal : closeModal}
        >
            {children}
        </Button>
    )
}

// So that it appears as Button in storybook "show code" section
ModalButton.displayName = 'Button'

type WithOptionals<Props, Keys extends keyof Props> = Omit<Props, Keys> & Partial<Pick<Props, Keys>>

function Modal(props: WithOptionals<ModalProps, 'isOpen' | 'onDismiss' | 'width' | 'height'>) {
    const { isOpen, closeModal, width, height, hideOn } = React.useContext(ModalStoryContext)

    /**
     * Needed to make sure the modals are mounted inside the story's #root element
     * @see https://www.chromatic.com/docs/snapshots#why-isn%E2%80%99t-my-modal-or-dialog-captured
     */
    const getPortalElement = React.useCallback(() => {
        const div = document.createElement('div')
        const portalRoot = document.getElementById('root') ?? document.body
        portalRoot.appendChild(div)
        return div
    }, [])

    return (
        <ModalComponents.Modal
            isOpen={isOpen}
            onDismiss={closeModal}
            width={width}
            height={height}
            hideOnEscape={hideOn === 'escapeAndOverlay' || hideOn === 'escape'}
            hideOnInteractOutside={hideOn === 'escapeAndOverlay' || hideOn === 'overlay'}
            portalElement={getPortalElement}
            {...props}
        />
    )
}

function ModalHeader(props: WithOptionals<ModalHeaderProps, 'withDivider' | 'button'>) {
    const { button, withScrollableContent } = React.useContext(ModalStoryContext)
    return (
        <ModalComponents.ModalHeader
            withDivider={withScrollableContent}
            button={renderHeaderButton(button)}
            {...props}
        />
    )
}

const ModalBody = ModalComponents.ModalBody

function ModalFooter(props: WithOptionals<ModalFooterProps, 'withDivider'>) {
    const { withScrollableContent } = React.useContext(ModalStoryContext)
    return <ModalComponents.ModalFooter withDivider={withScrollableContent} {...props} />
}

function ModalActions(props: WithOptionals<ModalFooterProps, 'withDivider'>) {
    const { withScrollableContent } = React.useContext(ModalStoryContext)
    return <ModalComponents.ModalActions withDivider={withScrollableContent} {...props} />
}

/**
 * Used by stories in storybooks to programmatically open the modal on each story.
 *
 * Not only that, but it also serves the purpose of testing that the modal actually opens.
 *
 * @see https://storybook.js.org/docs/react/writing-tests/interaction-testing
 */
export async function openModal({ canvasElement }: { canvasElement: HTMLElement }) {
    const canvas = within(canvasElement)
    userEvent.click(canvas.getByRole('button', { name: 'Open modal' }))
    expect(await canvas.findByRole('dialog')).toBeInTheDocument()
}

export { Link, ModalStoryStateProvider, ModalOptionsForm, ModalButton as Button, ScrollableContent }
export { Modal, ModalHeader, ModalBody, ModalFooter, ModalActions }
