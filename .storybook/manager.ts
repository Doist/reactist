import { addons, types } from 'storybook/manager-api'
import { ADDON_ID, BadgesTool, TOOL_ID } from './badges'
import theme from './theme'

addons.setConfig({
    theme,
})

addons.register(ADDON_ID, () => {
    addons.add(TOOL_ID, {
        title: 'Badges',
        type: types.TOOL,
        match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
        render: BadgesTool,
    })
})
