// See https://plopjs.com/

/** @typedef {import('plop').NodePlopAPI} NodePlopAPI */
/** @typedef {import('plop').ActionConfig} ActionConfig */

/**
 * @param {string} name
 * @returns string
 */
function templateFile(name) {
    return `.plop/templates/${name}.hbs`
}

/** @param {NodePlopAPI} plop */
function componentGenerator(plop) {
    plop.setGenerator('component', {
        description: 'React component with tests, styles, and storybook docs',

        prompts: [
            {
                type: 'input',
                name: 'name',
                message:
                    'Component name (e.g. "dropdown select", "sortable-table", "PromotionBanner")',
            },
            {
                type: 'list',
                name: 'category',
                message: 'Storybook category (the section the component belongs to)',
                choices: [
                    '📐 Layout',
                    '🔤 Typography',
                    '🔘 Buttons & links',
                    '📝 Form',
                    '📑 Menus & tabs',
                    '📊 Data display',
                    '💬 Feedback',
                    '🪟 Overlays',
                ],
            },
        ],

        actions() {
            /** @type {Array<ActionConfig>} */
            const actions = [
                {
                    type: 'add',
                    path: 'src/{{dashCase name}}/index.ts',
                    templateFile: templateFile('component/index.ts'),
                },
                {
                    type: 'add',
                    path: 'src/{{dashCase name}}/{{dashCase name}}.tsx',
                    templateFile: templateFile('component/component.tsx'),
                },
                {
                    type: 'add',
                    path: 'src/{{dashCase name}}/{{dashCase name}}.module.css',
                    templateFile: templateFile('component/component.module.css'),
                },
                {
                    type: 'add',
                    path: 'src/{{dashCase name}}/{{dashCase name}}.test.tsx',
                    templateFile: templateFile('component/component.test.tsx'),
                },
            ]

            actions.push({
                type: 'add',
                path: 'src/{{dashCase name}}/{{dashCase name}}.stories.tsx',
                templateFile: templateFile('component/component.stories.tsx'),
            })

            actions.push({
                type: 'add',
                path: 'src/{{dashCase name}}/{{dashCase name}}.mdx',
                templateFile: templateFile('component/component.mdx'),
            })

            return actions
        },
    })
}

/** @param {NodePlopAPI} plop */
function docsGenerator(plop) {
    plop.setGenerator('docs', {
        description: 'MDX docs page for an existing component that lacks one',

        prompts: [
            {
                type: 'input',
                name: 'name',
                message:
                    'Existing component name, matching its directory (e.g. "toast", "text field")',
            },
        ],

        actions: [
            {
                type: 'add',
                path: 'src/{{dashCase name}}/{{dashCase name}}.mdx',
                templateFile: templateFile('component/component.mdx'),
            },
        ],
    })
}

/** @param {NodePlopAPI} plop */
export default function (plop) {
    componentGenerator(plop)
    docsGenerator(plop)
}
