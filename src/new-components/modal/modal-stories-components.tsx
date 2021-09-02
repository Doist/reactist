import * as React from 'react'
import Button from '../../components/button'
import { Placeholder, times } from '../storybook-helper'
import { SelectField } from '../select-field'
import { SwitchField } from '../switch-field'
import { Stack } from '../stack'
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
    withScrollableContent: boolean
}

const defaultInitialState: ModalStoryState = {
    width: 'medium',
    height: 'expand',
    button: 'true',
    withScrollableContent: false,
}

type ModalStoryContextValue = ModalStoryState & {
    isOpen: boolean
    toggle: () => void
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}

const ModalStoryContext = React.createContext<ModalStoryContextValue>({
    ...defaultInitialState,
    isOpen: false,
    toggle: () => undefined,
    onChange: () => undefined,
})

function ModalStoryStateProvider({
    initialState = defaultInitialState,
    children,
}: {
    initialState?: ModalStoryState
    children: React.ReactNode
}) {
    const [isOpen, setOpen] = React.useState(false)
    const toggle = React.useCallback(() => setOpen((v) => !v), [])

    const [props, setProps] = React.useState<ModalStoryState>(initialState)

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
            toggle,
            onChange,
            ...props,
        }),
        [isOpen, toggle, onChange, props],
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
    const { button, width, height, withScrollableContent, onChange } = React.useContext(
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
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
            </SelectField>

            <SelectField label="height" name="height" value={height} onChange={onChange}>
                <option value="fitContent">fitContent</option>
                <option value="expand">expand</option>
            </SelectField>

            <SwitchField
                name="withScrollableContent"
                label="Extra content to scroll"
                hint='When height="expanded" you can select to generate artificial content to make the body scroll'
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
}: {
    variant: 'primary' | 'secondary'
    size?: 'small'
    children: React.ReactNode
}) {
    const { toggle } = React.useContext(ModalStoryContext)
    return (
        <Button variant={variant} size={size} onClick={toggle}>
            {children}
        </Button>
    )
}

// So that it appers as Button in storybook "show code" section
ModalButton.displayName = 'Button'

type WithOptionals<Props, Keys extends keyof Props> = Omit<Props, Keys> & Partial<Pick<Props, Keys>>

function Modal(props: WithOptionals<ModalProps, 'isOpen' | 'onDismiss' | 'width' | 'height'>) {
    const { isOpen, toggle, width, height } = React.useContext(ModalStoryContext)
    return (
        <ModalComponents.Modal
            isOpen={isOpen}
            onDismiss={toggle}
            width={width}
            height={height}
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

export { Link, ModalStoryStateProvider, ModalOptionsForm, ModalButton as Button, ScrollableContent }
export { Modal, ModalHeader, ModalBody, ModalFooter, ModalActions }
