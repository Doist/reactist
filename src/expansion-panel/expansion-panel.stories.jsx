import * as React from 'react'

import { Box } from '../box'
import { Stack } from '../stack'
import { Text } from '../text'

import {
    ExpansionPanel,
    ExpansionPanelContent,
    ExpansionPanelHeader,
    ExpansionPanelToggle,
} from './expansion-panel'

export default {
    title: '📐 Layout/ExpansionPanel',
    component: ExpansionPanel,
}

export const IconToggle = {
    name: 'Icon toggle',
    render: () => (
        <Box maxWidth="small">
            <ExpansionPanel id="expansion-panel-fruit" initiallyExpanded>
                <ExpansionPanelHeader
                    display="flex"
                    alignItems="center"
                    justifyContent="spaceBetween"
                >
                    <Text size="caption" weight="semibold" tone="secondary">
                        Fruit
                    </Text>
                    <ExpansionPanelToggle size="16" aria-label="Toggle fruit list" />
                </ExpansionPanelHeader>
                <ExpansionPanelContent>
                    <Stack space="small" paddingY="small">
                        <Text>Apple</Text>
                        <Text>Banana</Text>
                        <Text>Cherry</Text>
                    </Stack>
                </ExpansionPanelContent>
            </ExpansionPanel>
        </Box>
    ),
}

export const ButtonToggle = {
    name: 'Button toggle',
    render: () => (
        <Box maxWidth="small">
            <ExpansionPanel id="expansion-panel-veg" initiallyExpanded>
                <ExpansionPanelHeader>
                    <ExpansionPanelToggle aria-label="Toggle vegetable list">
                        Vegetables
                    </ExpansionPanelToggle>
                </ExpansionPanelHeader>
                <ExpansionPanelContent>
                    <Stack space="small" paddingY="small">
                        <Text>Carrot</Text>
                        <Text>Potato</Text>
                        <Text>Spinach</Text>
                    </Stack>
                </ExpansionPanelContent>
            </ExpansionPanel>
        </Box>
    ),
}
