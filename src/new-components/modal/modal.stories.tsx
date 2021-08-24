import * as React from 'react'
import Button from '../../components/button'
import { Placeholder, times } from '../storybook-helper'
import { SelectField } from '../select-field'
import { SwitchField } from '../switch-field'
import { Column, Columns } from '../columns'
import { Text } from '../text'
import { Heading } from '../heading'
import { Inline } from '../inline'
import { Stack } from '../stack'
import { Box } from '../box'
import { Tabs, Tab, TabList, TabPanel } from '../tabs'
import { Modal, ModalHeader, ModalBody, ModalActions, ModalProps, ModalFooter } from './modal'

export default {
    title: 'Design system/Modal',
    component: Modal,
}

function preventDefault(event: React.SyntheticEvent) {
    event.preventDefault()
}

function useModalState() {
    const [isOpen, setOpen] = React.useState(false)
    const open = React.useCallback(function open() {
        setOpen(true)
    }, [])
    const close = React.useCallback(function close() {
        setOpen(false)
    }, [])
    const toggle = React.useCallback(function toggle() {
        setOpen((v) => !v)
    }, [])
    return { isOpen, open, close, toggle }
}

type CustomizableModalProps = Pick<ModalProps, 'width' | 'height'> & {
    button: 'true' | 'false' | 'custom'
}

function useModalProps() {
    const [props, setProps] = React.useState<CustomizableModalProps>({
        width: 'medium',
        height: 'expand',
        button: 'true',
    })

    const onChange = React.useCallback(function onChange(
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) {
        const { name, value } = event.currentTarget
        setProps((props) => ({
            ...props,
            [name]: value, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        }))
    },
    [])

    return { ...props, onChange }
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

function ModalPropsFields({
    title,
    onChange,
    ...props
}: CustomizableModalProps & {
    title?: React.ReactNode
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
}) {
    const [scrollableContent, setScrollableContent] = React.useState(false)

    return (
        <Stack space="large">
            {title}

            <SelectField
                label="Header button"
                name="button"
                value={props.button}
                onChange={onChange}
            >
                <option value="true">show</option>
                <option value="false">hide</option>
                <option value="custom">custom</option>
            </SelectField>

            <SelectField label="width" name="width" value={props.width} onChange={onChange}>
                <option value="small">small</option>
                <option value="medium">medium</option>
                <option value="large">large</option>
            </SelectField>

            <SelectField label="height" name="height" value={props.height} onChange={onChange}>
                <option value="fitContent">fitContent</option>
                <option value="expand">expand</option>
            </SelectField>

            <SwitchField
                label="Extra content to scroll"
                hint='When height="expanded" you can select to generate artificial content to make the body scroll'
                checked={scrollableContent}
                onChange={(event) => setScrollableContent(event.currentTarget.checked)}
            />

            {scrollableContent ? <ScrollableContent /> : null}
        </Stack>
    )
}

function renderHeaderButton(button: CustomizableModalProps['button']) {
    switch (button) {
        case 'true':
            return true
        case 'false':
            return false
        case 'custom':
            return (
                <a href="/help" onClick={preventDefault}>
                    Help
                </a>
            )
    }
}

export function WithHeaderBodyAndActions() {
    const modal = useModalState()
    const { onChange, button, ...props } = useModalProps()

    return (
        <>
            <Button variant="primary" onClick={modal.open}>
                Modal with header/body/actions
            </Button>

            <Modal
                {...props}
                isOpen={modal.isOpen}
                onDismiss={modal.close}
                aria-label="Modal with standard actions footer"
            >
                <ModalHeader button={renderHeaderButton(button)}>
                    <Heading level="1">Modal with standard actions footer</Heading>
                </ModalHeader>

                <ModalBody>
                    <ModalPropsFields
                        {...props}
                        title={<Heading level="2">Customize modal</Heading>}
                        button={button}
                        onChange={onChange}
                    />
                </ModalBody>

                <ModalActions>
                    <Button variant="primary" onClick={modal.close}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={modal.close}>
                        Cancel
                    </Button>
                </ModalActions>
            </Modal>
        </>
    )
}

export function WithHeaderBodyAndFooter() {
    const modal = useModalState()
    const { onChange, button, ...props } = useModalProps()

    return (
        <>
            <Button variant="primary" onClick={modal.open}>
                Modal with header/body/footer
            </Button>

            <Modal
                {...props}
                isOpen={modal.isOpen}
                onDismiss={modal.close}
                aria-label="Modal with custom footer"
            >
                <ModalHeader button={renderHeaderButton(button)}>
                    <Heading level="1">Modal with custom footer</Heading>
                </ModalHeader>

                <ModalBody>
                    <ModalPropsFields
                        {...props}
                        title={<Heading level="2">Customize modal</Heading>}
                        button={button}
                        onChange={onChange}
                    />
                </ModalBody>

                <ModalFooter>
                    <Columns space="medium">
                        <Column width="auto">
                            <Button variant="secondary">Reset</Button>
                        </Column>
                        <Column width="content">
                            <Inline space="medium">
                                <Button variant="primary" onClick={modal.close}>
                                    Save
                                </Button>
                                <Button variant="secondary" onClick={modal.close}>
                                    Cancel
                                </Button>
                            </Inline>
                        </Column>
                    </Columns>
                </ModalFooter>
            </Modal>
        </>
    )
}

export function WithSettingsLayout() {
    const modal = useModalState()
    const { onChange, button, ...props } = useModalProps()

    return (
        <>
            <Button variant="primary" onClick={modal.open}>
                Modal with sidebar
            </Button>

            <Modal
                {...props}
                isOpen={modal.isOpen}
                onDismiss={modal.close}
                aria-label="Modal with a settings-like custom layout"
            >
                <Columns height="full">
                    <Column width="content">
                        <Box height="full" background="selected">
                            <Box padding="medium">
                                <Heading level="1">Settings</Heading>
                            </Box>
                            <Stack as="ul" space="small" padding="medium" paddingRight="xxlarge">
                                <li>
                                    <a href="/account" onClick={preventDefault}>
                                        Account
                                    </a>
                                </li>
                                <li>
                                    <a href="/subscription" onClick={preventDefault}>
                                        Subscription
                                    </a>
                                </li>
                                <li>
                                    <a href="/preferences" onClick={preventDefault}>
                                        Preferences
                                    </a>
                                </li>
                            </Stack>
                        </Box>
                    </Column>

                    <Column width="auto">
                        <Box height="full" display="flex" flexDirection="column">
                            <ModalHeader button={renderHeaderButton(button)}>
                                <Heading level="2">Customize modal</Heading>
                            </ModalHeader>
                            <ModalBody>
                                <ModalPropsFields {...props} button={button} onChange={onChange} />
                            </ModalBody>
                            <ModalActions>
                                <Button variant="primary" onClick={modal.close}>
                                    Close
                                </Button>
                            </ModalActions>
                        </Box>
                    </Column>
                </Columns>
            </Modal>
        </>
    )
}

export function WithTaskDetailsLayout() {
    const modal = useModalState()
    const { onChange, button, ...props } = useModalProps()

    return (
        <>
            <Button variant="primary" onClick={modal.open}>
                Modal with tabs
            </Button>

            <Modal
                {...props}
                isOpen={modal.isOpen}
                onDismiss={modal.close}
                aria-label="Modal with a tabbed interface"
            >
                <ModalHeader withDivider={false} button={renderHeaderButton(button)}>
                    <a href="/" onClick={preventDefault}>
                        Project name
                    </a>
                </ModalHeader>

                <Box
                    overflow="hidden"
                    height="full"
                    padding="large"
                    paddingTop="small"
                    display="flex"
                    flexDirection="column"
                >
                    <Stack space="medium" paddingBottom="xxlarge">
                        <Heading level="1">Task content goest here</Heading>

                        <Inline space="medium">
                            <button type="button">Schedule</button>
                            <button type="button">Labels</button>
                            <button type="button">Project</button>
                            <button type="button">Priority</button>
                        </Inline>
                    </Stack>

                    <Tabs variant="plain">
                        <Box
                            paddingBottom="large"
                            style={{
                                borderBottom: '1px solid var(--reactist-framework-separator)',
                            }}
                        >
                            <TabList aria-label="Multiple tablist example tabs">
                                <Tab id="tab1">Sub-tasks</Tab>
                                <Tab id="tab2">Comments</Tab>
                                <Tab id="tab3">Activity</Tab>
                            </TabList>
                        </Box>
                        <Box height="full" overflow="auto">
                            <TabPanel id="tab1">
                                <Box paddingX="small" paddingY="xlarge">
                                    <ScrollableContent label="Task" count={20} />
                                </Box>
                            </TabPanel>
                            <TabPanel id="tab2">
                                <Box paddingX="small" paddingY="xlarge">
                                    <ScrollableContent label="Comment" count={10} />
                                </Box>
                            </TabPanel>
                            <TabPanel id="tab3">
                                <Box paddingX="small" paddingY="xlarge">
                                    <ScrollableContent label="Activity" count={5} />
                                </Box>
                            </TabPanel>
                        </Box>
                    </Tabs>
                </Box>
            </Modal>
        </>
    )
}

export function ConfirmationDialog() {
    const [modal, setModal] = React.useState<'enriched' | 'minimalistic' | null>(null)

    function close() {
        setModal(null)
    }

    return (
        <>
            <Stack space="large">
                <Heading level="1">Confirmation dialogs</Heading>
                <Inline space="large">
                    <Button variant="primary" onClick={() => setModal('enriched')}>
                        With enriched UI
                    </Button>
                    <Button variant="primary" onClick={() => setModal('minimalistic')}>
                        With minimalistic UI
                    </Button>
                </Inline>
            </Stack>

            <Modal
                isOpen={modal != null}
                onDismiss={close}
                aria-label="Confirmation dialog"
                width="small"
            >
                {modal === 'enriched' ? (
                    <ModalHeader>
                        <Heading level="1">Please confirm</Heading>
                    </ModalHeader>
                ) : null}

                {modal === 'enriched' ? (
                    <ModalBody>
                        <Stack space="medium">
                            <Text size="subtitle">Are you sure you want to leave?</Text>
                            <Text tone="danger">This action cannot be undone.</Text>
                        </Stack>
                    </ModalBody>
                ) : (
                    <Box padding="large">
                        <Text size="subtitle">Are you sure you want to leave?</Text>
                    </Box>
                )}

                <ModalActions withDivider={modal === 'enriched'}>
                    <Button
                        variant="primary"
                        size={modal === 'minimalistic' ? 'small' : 'default'}
                        onClick={close}
                    >
                        Yes, leave
                    </Button>
                    <Button
                        variant="secondary"
                        size={modal === 'minimalistic' ? 'small' : 'default'}
                        onClick={close}
                    >
                        Cancel
                    </Button>
                </ModalActions>
            </Modal>
        </>
    )
}
