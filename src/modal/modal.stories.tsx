import * as React from 'react'

import { action } from 'storybook/actions'

import { openModal } from '../../.storybook/open-modal'
import { Box } from '../box'
import { Button as ReactistButton, IconButton } from '../button'
import { Column, Columns } from '../columns'
import ThreeDotsIcon from '../components/icons/ThreeDotsIcon.svg'
import { Divider } from '../divider'
import { Inline } from '../inline'
import { Menu, MenuButton, MenuItem, MenuList } from '../menu'
import { Stack } from '../stack'
import { Tab, TabList, TabPanel, Tabs } from '../tabs'
import { Text } from '../text'
import { TextField } from '../text-field'

import * as ModalComponents from './modal'
import {
    Button,
    Link,
    Modal,
    ModalActions,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalOptionsForm,
    ModalStoryStateProvider,
    ScrollableContent,
} from './modal-stories-components'

import type { JSX } from 'react'

export default {
    title: '🪟 Overlays/Modal',
    component: ModalComponents.Modal,
    parameters: {
        viewMode: 'story',
        badges: ['accessible'],
        figma: {
            path: 'Web › Components / Todoist › Settings › Modal / Header',
            url: 'https://www.figma.com/design/LYlWNzvhMDh907l07mPPQk/Product-Library---Web?node-id=7443-241153',
        },
        layout: 'fullscreen',
    },
    decorators: [
        (Story: () => JSX.Element) => (
            <div style={{ height: '800px' }}>
                <Story />
            </div>
        ),
    ],
}

//
// Modal with standard actions footer
//

export function ModalWithStandardActionsFooter() {
    return (
        <ModalStoryStateProvider>
            <Box padding="large">
                <Button variant="primary" action="open">
                    Open modal
                </Button>
            </Box>
            <Modal aria-label="Modal with standard actions footer">
                <ModalHeader
                    button={
                        <Columns>
                            <Column>
                                <Menu>
                                    <MenuButton
                                        render={
                                            <IconButton
                                                variant="tertiary"
                                                icon={<ThreeDotsIcon />}
                                                aria-label="Options menu"
                                            />
                                        }
                                    />
                                    <MenuList aria-label="Simple menu">
                                        <MenuItem onSelect={action('Edit')}>Edit</MenuItem>
                                        <MenuItem onSelect={action('Duplicate')}>
                                            Duplicate
                                        </MenuItem>
                                        <MenuItem onSelect={action('Remove')}>Remove</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Column>
                            <Column>
                                <ModalComponents.ModalCloseButton aria-label="Close" />
                            </Column>
                        </Columns>
                    }
                >
                    <Text variant="header-3" render={<h1 />}>
                        Modal with standard actions footer
                    </Text>
                </ModalHeader>
                <ModalBody>
                    <ModalOptionsForm
                        title={
                            <Text variant="subheader-1" render={<h2 />}>
                                Customize modal
                            </Text>
                        }
                    />
                </ModalBody>
                <ModalActions>
                    <Button variant="primary">Save</Button>
                    <Button variant="secondary">Cancel</Button>
                </ModalActions>
            </Modal>
        </ModalStoryStateProvider>
    )
}

ModalWithStandardActionsFooter.storyName = 'Modal with standard actions footer'
ModalWithStandardActionsFooter.play = openModal
ModalWithStandardActionsFooter.parameters = {
    docs: { source: { type: 'dynamic' } },
    chromatic: { disableSnapshot: false, pauseAnimationAtEnd: true },
}

//
// Modal with header, body and custom footer
//

export function ModalWithHeaderBodyAndCustomFooter() {
    return (
        <ModalStoryStateProvider>
            <Box padding="large">
                <Button variant="primary" action="open">
                    Open modal
                </Button>
            </Box>
            <Modal aria-label="Modal with header, body and custom footer">
                <ModalHeader>
                    <Text variant="header-3" render={<h1 />}>
                        Modal with header, body and custom footer
                    </Text>
                </ModalHeader>
                <ModalBody>
                    <ModalOptionsForm
                        title={
                            <Text variant="subheader-1" render={<h2 />}>
                                Customize modal
                            </Text>
                        }
                    />
                </ModalBody>
                <ModalFooter>
                    <Columns alignY="center">
                        <Column width="auto">
                            <Text variant="subheader-1">Do whatever you want down here</Text>
                        </Column>
                        <Column width="content">
                            <Button variant="primary">Close</Button>
                        </Column>
                    </Columns>
                </ModalFooter>
            </Modal>
        </ModalStoryStateProvider>
    )
}

ModalWithHeaderBodyAndCustomFooter.storyName = 'Modal with header, body and custom footer'
ModalWithHeaderBodyAndCustomFooter.play = openModal
ModalWithHeaderBodyAndCustomFooter.parameters = {
    docs: { source: { type: 'dynamic' } },
    chromatic: { disableSnapshot: false, pauseAnimationAtEnd: true },
}

//
// Modal with a sidebar
//

export function ModalWithSidebar() {
    return (
        <ModalStoryStateProvider>
            <Box padding="large">
                <Button variant="primary" action="open">
                    Open modal
                </Button>
            </Box>
            <Modal aria-label="Modal with a settings-like custom layout">
                <Columns>
                    <Column width="content">
                        <Box height="full" background="selected">
                            <Box padding="medium">
                                <Text variant="header-3" render={<h1 />}>
                                    Settings
                                </Text>
                            </Box>
                            <Stack as="ul" space="small" padding="medium" paddingRight="xxlarge">
                                <li>
                                    <Link href="/account">Account</Link>
                                </li>
                                <li>
                                    <Link href="/subscription">Subscription</Link>
                                </li>
                                <li>
                                    <Link href="/preferences">Preferences</Link>
                                </li>
                            </Stack>
                        </Box>
                    </Column>
                    <Column width="auto">
                        <Box height="full" display="flex" flexDirection="column">
                            <ModalHeader>
                                <Text variant="subheader-1" render={<h2 />}>
                                    Customize modal
                                </Text>
                            </ModalHeader>
                            <ModalBody>
                                <ModalOptionsForm />
                            </ModalBody>
                            <ModalActions>
                                <Button variant="primary">Close</Button>
                            </ModalActions>
                        </Box>
                    </Column>
                </Columns>
            </Modal>
        </ModalStoryStateProvider>
    )
}

ModalWithSidebar.storyName = 'Modal with a sidebar'
ModalWithSidebar.play = openModal
ModalWithSidebar.parameters = {
    docs: { source: { type: 'dynamic' } },
    chromatic: { disableSnapshot: false, pauseAnimationAtEnd: true },
}

//
// Modal with scrollable tab panels
//

export function ModalWithScrollableTabPanels() {
    return (
        <ModalStoryStateProvider>
            <Box padding="large">
                <Button variant="primary" action="open">
                    Open modal
                </Button>
            </Box>
            <Modal aria-label="Modal with scrollable tab panels">
                <ModalHeader>
                    <Link href="/">Project name</Link>
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
                        <Text variant="header-3" render={<h1 />}>
                            Task content goest here
                        </Text>
                        <Inline space="medium">
                            <button type="button">Schedule</button>
                            <button type="button">Labels</button>
                            <button type="button">Project</button>
                            <button type="button">Priority</button>
                        </Inline>
                    </Stack>
                    <Tabs>
                        <Box paddingBottom="large">
                            <TabList aria-label="Multiple tablist example tabs">
                                <Tab id="tab1">Sub-tasks</Tab>
                                <Tab id="tab2">Comments</Tab>
                                <Tab id="tab3">Activity</Tab>
                            </TabList>
                        </Box>
                        <Divider weight="secondary" />
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
        </ModalStoryStateProvider>
    )
}

ModalWithScrollableTabPanels.storyName = 'Modal with scrollable tab panels'
ModalWithScrollableTabPanels.play = openModal
ModalWithScrollableTabPanels.parameters = {
    docs: { source: { type: 'dynamic' } },
    chromatic: { disableSnapshot: false, pauseAnimationAtEnd: true },
}

//
// Minimalistic confirmation modal
//

export function MinimalisticConfirmationModal() {
    return (
        <ModalStoryStateProvider>
            <Box padding="large">
                <Button variant="primary" action="open">
                    Open modal
                </Button>
            </Box>
            <Modal height="fitContent" aria-label="Confirmation modal" width="small">
                <Box padding="large">
                    <Text variant="subheader-2">Are you sure you want to leave?</Text>
                </Box>
                <ModalActions>
                    <Button variant="primary" size="small">
                        Yes, leave
                    </Button>
                    <Button variant="secondary" size="small">
                        Cancel
                    </Button>
                </ModalActions>
            </Modal>
        </ModalStoryStateProvider>
    )
}

MinimalisticConfirmationModal.storyName = 'Minimalistic confirmation modal'
MinimalisticConfirmationModal.play = openModal
MinimalisticConfirmationModal.parameters = {
    docs: { source: { type: 'dynamic' } },
    chromatic: { disableSnapshot: false, pauseAnimationAtEnd: true },
}

//
// Enriched confirmation modal
//

export function EnrichedConfirmationModal() {
    return (
        <ModalStoryStateProvider>
            <Box padding="large">
                <Button variant="primary" action="open">
                    Open modal
                </Button>
            </Box>
            <Modal height="fitContent" aria-label="Confirmation modal" width="small">
                <ModalHeader withDivider button={null}>
                    <Text variant="header-3" render={<h1 />}>
                        Please confirm
                    </Text>
                </ModalHeader>
                <ModalBody>
                    <Stack space="medium">
                        <Text variant="subheader-1">Are you sure you want to leave?</Text>
                        <Text variant="subheader-2" tone="danger">
                            This action cannot be undone!
                        </Text>
                    </Stack>
                </ModalBody>
                <ModalActions withDivider>
                    <Button variant="danger">Yes, leave</Button>
                    <Button variant="secondary">Cancel</Button>
                </ModalActions>
            </Modal>
        </ModalStoryStateProvider>
    )
}

EnrichedConfirmationModal.storyName = 'Enriched confirmation modal'
EnrichedConfirmationModal.play = openModal
EnrichedConfirmationModal.parameters = {
    docs: { source: { type: 'dynamic' } },
    chromatic: { disableSnapshot: false, pauseAnimationAtEnd: true },
}

//
// Autofocus
//

export function ModalAutofocus() {
    return (
        <ModalStoryStateProvider>
            <Stack padding="large" space="large" align="start">
                <Button variant="primary" action="open">
                    Open modal
                </Button>
                <Text variant="subheader-2">
                    By default the `autoFocus` prop is `true`, which shifts the focus onto the first
                    focusable element in the modal. You can further refine this by using the
                    `data-autofocus` attribute if you wish to focus on elements other than the first
                    one. This is made possible using React Focus Lock, please see its{' '}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/theKashey/react-focus-lock/tree/v2.9.1#autofocus"
                    >
                        documentation
                    </a>{' '}
                    for more details.
                </Text>
            </Stack>
            <Modal height="fitContent" aria-label="Confirmation modal" width="small">
                <ModalHeader>
                    <Text variant="header-3" render={<h1 />}>
                        Update your info
                    </Text>
                </ModalHeader>
                <ModalBody>
                    <Stack space="large">
                        <TextField label="Name" value="Bob Odenkirk" onChange={() => undefined} />
                        <TextField label="Address" data-autofocus />
                    </Stack>
                </ModalBody>
                <ModalActions>
                    <Button variant="primary" size="small">
                        Save
                    </Button>
                    <Button variant="secondary" size="small">
                        Cancel
                    </Button>
                </ModalActions>
            </Modal>
        </ModalStoryStateProvider>
    )
}

ModalAutofocus.storyName = 'Autofocus'
ModalAutofocus.play = openModal
ModalAutofocus.parameters = {
    docs: { source: { type: 'dynamic' } },
    chromatic: { disableSnapshot: false, pauseAnimationAtEnd: true },
}

//
// Stacking modals
//

export function StackingModals() {
    return (
        <ModalStoryStateProvider>
            <Stack padding="large" space="large" align="start">
                <Button variant="primary" action="open">
                    Open modal
                </Button>
                <Text variant="subheader-2">
                    Modals may be stacked on top of one another, with each of them having their
                    independent states, e.g. `width` and `height`.
                </Text>
            </Stack>
            <Modal aria-label="Modal 1">
                <ModalHeader>
                    <Text variant="header-3" render={<h1 />}>
                        Parent modal
                    </Text>
                </ModalHeader>
                <ModalBody>
                    <Stack space="large">
                        <Text variant="subheader-2">
                            Modals may be stacked on top of one another, with each of them having
                            their independent states, e.g. `width` and `height`.
                        </Text>
                        <ModalStoryStateProvider
                            initialState={{ width: 'small', height: 'fitContent' }}
                        >
                            <Inline>
                                <Button variant="primary" action="open">
                                    Open nested modal
                                </Button>
                            </Inline>
                            <Modal aria-label="Modal 2">
                                <ModalHeader>
                                    <Text variant="header-3" render={<h1 />}>
                                        Nested modal
                                    </Text>
                                </ModalHeader>
                                <ModalBody>
                                    <ModalOptionsForm />
                                </ModalBody>
                            </Modal>
                        </ModalStoryStateProvider>
                    </Stack>
                </ModalBody>
            </Modal>
        </ModalStoryStateProvider>
    )
}

StackingModals.storyName = 'Stacking modals'
StackingModals.play = openModal
StackingModals.parameters = {
    docs: { source: { type: 'dynamic' } },
    chromatic: { disableSnapshot: false, pauseAnimationAtEnd: true },
}

//
// Exact focus restoration
//

export function ExactFocusRestoration() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [focusedElement, setFocusedElement] = React.useState('original main element')
    const focusOriginRef = React.useRef<HTMLElement>(null)

    React.useEffect(function focusOrigin() {
        focusOriginRef.current?.focus()
    }, [])

    function handleOriginKeyDown(event: React.KeyboardEvent<HTMLElement>) {
        if (event.ctrlKey && event.key === 'k') {
            event.preventDefault()
            setIsOpen(true)
        }
    }

    function handleOriginFocus(event: React.FocusEvent<HTMLElement>) {
        setFocusedElement(
            event.target === event.currentTarget ? 'original main element' : 'fallback button',
        )
    }

    return (
        <>
            <Box padding="large">
                <Box
                    as="main"
                    ref={focusOriginRef}
                    tabIndex={-1}
                    maxWidth="large"
                    padding="large"
                    border="tertiary"
                    borderRadius="standard"
                    onKeyDown={handleOriginKeyDown}
                    onFocus={handleOriginFocus}
                >
                    <Stack space="large" align="start">
                        <Heading level="1">Exact focus restoration</Heading>
                        <Stack space="small">
                            <Text>
                                Open this story in isolation mode because Storybook's own shortcuts
                                can intercept Ctrl+k and Escape.
                            </Text>
                            <Text>Press Ctrl+k to open the modal, then Escape to close it.</Text>
                        </Stack>
                        <Box padding="medium" borderRadius="standard" background="selected">
                            <Text weight="bold">
                                Focused element after closing:{' '}
                                {focusedElement === 'original main element' ? '✅' : '❌'}{' '}
                                {focusedElement}
                            </Text>
                        </Box>
                        <ReactistButton variant="secondary">Fallback focus target</ReactistButton>
                    </Stack>
                </Box>
            </Box>
            <ModalComponents.Modal
                isOpen={isOpen}
                onDismiss={() => setIsOpen(false)}
                aria-label="Focus restoration"
                width="small"
            >
                <ModalComponents.ModalHeader>
                    <Heading level="1">Focus restoration</Heading>
                </ModalComponents.ModalHeader>
                <ModalComponents.ModalBody>
                    <Stack space="medium">
                        <Text>
                            This modal opened while the non-tabbable main element had focus.
                        </Text>
                        <Text>Press Escape or use the close button to return to the story.</Text>
                    </Stack>
                </ModalComponents.ModalBody>
            </ModalComponents.Modal>
        </>
    )
}

ExactFocusRestoration.storyName = 'Exact focus restoration'
