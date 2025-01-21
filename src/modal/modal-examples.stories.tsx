import * as React from 'react'
import { action } from '@storybook/addon-actions'

import { Box } from '../box'
import { IconButton } from '../button'
import { Column, Columns } from '../columns'
import { Heading } from '../heading'
import { Inline } from '../inline'
import { Menu, MenuButton, MenuList, MenuItem } from '../menu'
import { Stack } from '../stack'
import { Tabs, Tab, TabList, TabPanel } from '../tabs'
import { Text } from '../text'
import { TextField } from '../text-field'
import ThreeDotsIcon from '../components/icons/ThreeDotsIcon.svg'

import * as ModalComponents from './modal'

import {
    openModal,
    ModalStoryStateProvider,
    ModalOptionsForm,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalActions,
    Button,
    Link,
    ScrollableContent,
} from './modal-stories-components'

export default {
    title: 'Design system/Modal/Examples',
    component: ModalComponents.Modal,
    parameters: {
        viewMode: 'story',
        badges: ['accessible'],
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
                    <Heading level="1">Modal with standard actions footer</Heading>
                </ModalHeader>
                <ModalBody>
                    <ModalOptionsForm title={<Heading level="2">Customize modal</Heading>} />
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
                    <Heading level="1">Modal with header, body and custom footer</Heading>
                </ModalHeader>
                <ModalBody>
                    <ModalOptionsForm title={<Heading level="2">Customize modal</Heading>} />
                </ModalBody>
                <ModalFooter>
                    <Columns alignY="center">
                        <Column width="auto">
                            <Text weight="bold" size="subtitle">
                                Do whatever you want down here
                            </Text>
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
                                <Heading level="1">Settings</Heading>
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
                                <Heading level="2">Customize modal</Heading>
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
                        <Heading level="1">Task content goest here</Heading>
                        <Inline space="medium">
                            <button type="button">Schedule</button>
                            <button type="button">Labels</button>
                            <button type="button">Project</button>
                            <button type="button">Priority</button>
                        </Inline>
                    </Stack>
                    <Tabs>
                        <Box
                            paddingBottom="large"
                            style={{
                                borderBottom: '1px solid var(--reactist-divider-secondary)',
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
                    <Text size="subtitle">Are you sure you want to leave?</Text>
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
                    <Heading level="1">Please confirm</Heading>
                </ModalHeader>
                <ModalBody>
                    <Stack space="medium">
                        <Text size="subtitle" weight="bold">
                            Are you sure you want to leave?
                        </Text>
                        <Text size="subtitle" tone="danger">
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
                <Text size="subtitle">
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
                    <Heading level={1}>Update your info</Heading>
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
                <Text size="subtitle">
                    Modals may be stacked on top of one another, with each of them having their
                    independent states, e.g. `width` and `height`.
                </Text>
            </Stack>
            <Modal aria-label="Modal 1">
                <ModalHeader>
                    <Heading level={1}>Parent modal</Heading>
                </ModalHeader>
                <ModalBody>
                    <Stack space="large">
                        <Text size="subtitle">
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
                                    <Heading level={1}>Nested modal</Heading>
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
