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
                message: 'Component name',
            },
            {
                type: 'input',
                name: 'location',
                message: 'Component folder (inside src/)',
                default: 'new-components',
            },
            {
                type: 'list',
                name: 'storyType',
                message: 'Story type',
                choices: ['.mdx', '.tsx', 'both'],
                default: 'both',
            },
        ],

        /** @param {{ name: string; location: string; storyType: '.mdx' | '.tsx' | 'both' }} */
        actions({ storyType }) {
            /** @type {Array<ActionConfig>} */
            const actions = [
                {
                    type: 'add',
                    path: 'src/{{location}}/{{dashCase name}}/index.ts',
                    templateFile: templateFile('component/index.ts'),
                },
                {
                    type: 'add',
                    path: 'src/{{location}}/{{dashCase name}}/{{dashCase name}}.tsx',
                    templateFile: templateFile('component/component.tsx'),
                },
                {
                    type: 'add',
                    path: 'src/{{location}}/{{dashCase name}}/{{dashCase name}}.module.css',
                    templateFile: templateFile('component/component.module.css'),
                },
                {
                    type: 'add',
                    path: 'src/{{location}}/{{dashCase name}}/{{dashCase name}}.test.tsx',
                    templateFile: templateFile('component/component.test.tsx'),
                },
            ]

            if (storyType === '.mdx' || storyType === 'both') {
                actions.push({
                    type: 'add',
                    path: 'src/{{location}}/{{dashCase name}}/{{dashCase name}}.stories.mdx',
                    templateFile: templateFile('component/component.stories.mdx'),
                })
            }

            if (storyType === '.tsx' || storyType === 'both') {
                actions.push({
                    type: 'add',
                    path: 'src/{{location}}/{{dashCase name}}/{{dashCase name}}.stories.tsx',
                    templateFile: templateFile('component/component.stories.tsx'),
                })
            }

            return actions
        },
    })
}

/** @param {NodePlopAPI} plop */
export default function (plop) {
    componentGenerator(plop)
}
