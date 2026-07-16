import { addons, types } from 'storybook/manager-api'
import '../src/styles/design-tokens.css'
import { ADDON_ID, BadgesTool, TOOL_ID } from './badges'
import { ADDON_ID as FIGMA_ADDON_ID, FigmaTool, TOOL_ID as FIGMA_TOOL_ID } from './figma'
import theme from './theme'

addons.setConfig({
    theme,
})

addons.register(FIGMA_ADDON_ID, () => {
    addons.add(FIGMA_TOOL_ID, {
        title: 'Figma',
        type: types.TOOL,
        match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
        render: FigmaTool,
    })
})

addons.register(ADDON_ID, () => {
    addons.add(TOOL_ID, {
        title: 'Badges',
        type: types.TOOL,
        match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
        render: BadgesTool,
    })
})
