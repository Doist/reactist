export const ADDON_ID = 'reactist/figma'
export const TOOL_ID = `${ADDON_ID}/tool`
export const FIGMA_PARAMETER = 'figma'

/**
 * Constant to be used with the `figma` parameter to mark a story as intentionally having no Figma design,
 * hiding the "No Figma link" hint. Use this for non-visual entries like behavior utilities or hooks, as well
 * as non-component-specific or non-visual documentation.
 *
 * Requires non-falsey values because Storybook's manager coerces them to `undefined`.
 */
export const FIGMA_NOT_NEEDED = 'not-needed'
