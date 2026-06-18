import * as React from 'react'

import { Box } from '../box'
import { Column, Columns } from '../columns'
import { Text } from '../text'

import { Tab, TabAwareSlot, TabList, TabPanel, Tabs } from './tabs'

const Template = ({
    variant,
    space,
    selectedId,
    defaultSelectedId,
    renderMode,
    onSelectedIdChange,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
}) => (
    <Tabs
        variant={variant}
        selectedId={selectedId}
        defaultSelectedId={defaultSelectedId}
        onSelectedIdChange={onSelectedIdChange}
    >
        <TabList aria-label={ariaLabel} aria-labelledby={ariaLabelledby} space={space}>
            <Tab id="tab1">Tab 1</Tab>
            <Tab id="tab2">Tab 2</Tab>
            <Tab id="tab3">Tab 3</Tab>
        </TabList>
        <TabPanel id="tab1" renderMode={renderMode}>
            <Box paddingX="small" paddingY="xlarge">
                <Text>Content of tab 1</Text>
            </Box>
        </TabPanel>
        <TabPanel id="tab2" renderMode={renderMode}>
            <Box paddingX="small" paddingY="xlarge">
                <Text>Content of tab 2</Text>
            </Box>
        </TabPanel>
        <TabPanel id="tab3" renderMode={renderMode}>
            <Box paddingX="small" paddingY="xlarge">
                <Text>Content of tab 3</Text>
            </Box>
        </TabPanel>
    </Tabs>
)

export default {
    title: '📑 Menus & tabs/Tabs',
    component: Tabs,

    parameters: {
        badges: ['accessible'],
        figma: {
            label: 'Web › Components / Todoist › Tabs › Tab Group',
            url: 'https://www.figma.com/design/LYlWNzvhMDh907l07mPPQk/Product-Library---Web?node-id=8371-275288',
        },
    },
}

export const MainDemo = {
    render: Template.bind({}),
    name: 'Main demo',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },

        controls: {
            exclude: ['children'],
        },

        chromatic: {
            disableSnapshot: false,
        },
    },

    args: {
        'aria-label': 'Main demo for Tabs',
        defaultSelectedId: 'tab3',
    },

    argTypes: {
        selectedId: {
            options: ['tab1', 'tab2', 'tab3', null, undefined],

            control: {
                type: 'inline-radio',
            },
        },

        defaultSelectedId: {
            options: ['tab1', 'tab2', 'tab3', null, undefined],

            control: {
                type: 'inline-radio',
            },
        },

        variant: {
            options: ['themed', 'neutral'],

            control: {
                type: 'inline-radio',
            },
        },

        space: {
            options: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],

            control: {
                type: 'inline-radio',
            },
        },

        renderMode: {
            options: ['always', 'active', 'lazy'],

            control: {
                type: 'inline-radio',
            },
        },

        onSelectedIdChange: {
            action: 'onSelectedIdChange',
        },
    },
}

export const ThemedVariant = {
    render: Template.bind({}),

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },

    args: {
        'aria-label': 'Tabs with themed variant style',
        variant: 'themed',
    },

    name: 'Themed variant',
}

export const FullContainerWidthTabs = {
    render: () => (
        <Tabs>
            <TabList aria-label="Full width tabs example" width="full">
                <Tab id="tab1">Tab 1</Tab>
                <Tab id="tab2">Tab 2</Tab>
                <Tab id="tab3">Tab 3</Tab>
            </TabList>
            <TabPanel id="tab1">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 1</Text>
                </Box>
            </TabPanel>
            <TabPanel id="tab2">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 2</Text>
                </Box>
            </TabPanel>
            <TabPanel id="tab3">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 3</Text>
                </Box>
            </TabPanel>
        </Tabs>
    ),

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },

    name: 'Full container width tabs',
}

export const TabsAlignedToTheCenter = {
    render: () => (
        <Tabs>
            <TabList aria-label="Full width tabs example" align="center">
                <Tab id="tab1">Tab 1</Tab>
                <Tab id="tab2">Tab 2</Tab>
                <Tab id="tab3">Tab 3</Tab>
            </TabList>
            <TabPanel id="tab1">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 1</Text>
                </Box>
            </TabPanel>
            <TabPanel id="tab2">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 2</Text>
                </Box>
            </TabPanel>
            <TabPanel id="tab3">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 3</Text>
                </Box>
            </TabPanel>
        </Tabs>
    ),

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },

    name: 'Tabs aligned to the center',
}

export const SelectedTabWithSlideAnimation = {
    render: () => (
        <Tabs>
            <style>
                {
                    '.transition { --reactist-tab-selected-transition: left 0.3s ease, width 0.3s ease; }'
                }
            </style>
            <TabList aria-label="Full width tabs example" exceptionallySetClassName="transition">
                <Tab id="tab1">Tab 1</Tab>
                <Tab id="tab2">Tab 2</Tab>
                <Tab id="tab3">Tab 3</Tab>
            </TabList>
            <TabPanel id="tab1">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 1</Text>
                </Box>
            </TabPanel>
            <TabPanel id="tab2">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 2</Text>
                </Box>
            </TabPanel>
            <TabPanel id="tab3">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 3</Text>
                </Box>
            </TabPanel>
        </Tabs>
    ),

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },

    name: 'Selected tab with slide animation',

    style: {
        border: '1px solid red',
    },
}

export const UsingTheTabAwareSlotComponent = {
    render: () => (
        <Tabs>
            <Columns>
                <Column width="content">
                    <TabList aria-label="TabAwareSlot example tabs">
                        <Tab id="tab1">Tab 1</Tab>
                        <Tab id="tab2">Tab 2</Tab>
                        <Tab id="tab3">Tab 3</Tab>
                    </TabList>
                </Column>
                <Column>
                    <TabAwareSlot>
                        {({ selectedId }) => (
                            <Box
                                height="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="flexEnd"
                            >
                                <Text>Currently showing the {selectedId}tab</Text>
                            </Box>
                        )}
                    </TabAwareSlot>
                </Column>
            </Columns>
            <TabPanel id="tab1">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 1</Text>
                </Box>
            </TabPanel>
            <TabPanel id="tab2">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 2</Text>
                </Box>
            </TabPanel>
            <TabPanel id="tab3">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 3</Text>
                </Box>
            </TabPanel>
        </Tabs>
    ),

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },

    name: 'Using the TabAwareSlot component',
}

export const MultipleTabListInstances = {
    render: () => (
        <Tabs>
            <TabList aria-label="Multiple tablist example tabs">
                <Tab id="tab1">Tab 1</Tab>
                <Tab id="tab2">Tab 2</Tab>
                <Tab id="tab3">Tab 3</Tab>
            </TabList>
            <TabPanel id="tab1">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 1</Text>
                </Box>
            </TabPanel>
            <TabPanel id="tab2">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 2</Text>
                </Box>
            </TabPanel>
            <TabPanel id="tab3">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 3</Text>
                </Box>
            </TabPanel>
            <TabList aria-hidden>
                <Tab id="tab1">Tab 1</Tab>
                <Tab id="tab2">Tab 2</Tab>
                <Tab id="tab3">Tab 3</Tab>
            </TabList>
        </Tabs>
    ),

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },

    name: 'Multiple TabList instances',
}

export const Polymorphism = {
    render: () => (
        <Tabs>
            <TabList aria-label="Multiple tablist example tabs">
                <Tab id="tab1">Tab 1</Tab>
                <Tab id="tab2">Tab 2</Tab>
                <Tab id="tab3">Tab 3</Tab>
            </TabList>
            <TabPanel
                id="tab1"
                renderMode="active"
                render={<Box paddingX="small" paddingY="xlarge" />}
            >
                <Text>Content of tab 1</Text>
            </TabPanel>
            <TabPanel id="tab2" as="section" renderMode="active">
                <Box paddingX="small" paddingY="xlarge">
                    <Text>Content of tab 2</Text>
                </Box>
            </TabPanel>
            <TabPanel
                id="tab3"
                renderMode="active"
                render={<Columns paddingX="small" paddingY="xlarge" />}
            >
                <Column>Column 1</Column>
                <Column>Column 2</Column>
                <Column>Column 3</Column>
            </TabPanel>
        </Tabs>
    ),

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },

    name: 'Polymorphism',
}
