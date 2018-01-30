const introText = `
    Open source React components made with ❤️ by Doist.
`

const howToText = `
    You can easily add Reactist to your project by installing it from npm:
    \`\`\`sh
    npm install @doist/reactist
    \`\`\`
    If you prefer to include static files just grab the [minified build from the dist folder](https://github.com/Doist/reactist/tree/develop/dist).

    A detailled explanation and exmaples on how to use each component can be accessed by clicking on the component name on the left.
`

const developmentText = `
    First clone the repository to your local machine by running:
    \`\`\`sh
    git clone git@github.com:Doist/reactist.git
    \`\`\`

    We identified two major modes of development for Reactist. First, running an interactive storybook and see the changes you make to a component in an isolated environment. This is especially helpful when developing new components. And second, improving existing components in real-life applications.

    #### Storybook

    For the first development mode run:
    \`\`\`sh
    npm run storybook
    \`\`\`
    This boots up a development server with hot reloading on http://localhost:6006. You can iterate on the components in the existing stories or add a completely new one.

    #### Inside your application

    For the second development mode you can leverage
    \`\`\`sh
    npm link
    \`\`\`
    First run:
    \`\`\`sh
    npm run build-watch
    \`\`\`
    this will update the build artifacts whenever you change something.

    In your real application you need to first delete the current *@doist/reactist* dependency and then link to your local one.
    \`\`\`sh
    cd ~/your-app
    # delete current reactist dependency
    rm -rf ./node_modules/@doist/reactist

    # link local reactist version
    npm link ../reactist
    \`\`\`
    The relative path to reactist may need to be changed to match your local environment.

    To undo the changes and switch back to the reactist version from npm do the following:
    \`\`\`sh
    cd ~/your-app
    # first remove linked reactist dependency
    rm -rf ./node_modules/@doist/reactist

    # re-install reactist from npm (-E avoids updating the version / package-lock.json)
    npm install -E @doist/reactist
    \`\`\`


    Independent of the development you operate in to produce a new build (e.g. before submitting a PR) run:
    \`\`\`sh
    npm run build
    \`\`\`
    **Note:** This will **not** update the docs. In case you want to update the docs you need to run:
    \`\`\`sh
    npm run build-storybook
    \`\`\`


    You can run our eslint checks with
    \`\`\`sh
    npm run check
    \`\`\`
    It is mandatory to fix all linting errors before you make a pull request.

    **Tip:** You can fix most of the errors automatically by running:
    \`\`\`sh
    npm run check -- --fix
    \`\`\`
`

const testingText = `
    Tests are executed with jest or by running:
    \`\`\`sh
    npm run test
    \`\`\`

    During development you may find it beneficial to continously execute the tests. This works by running:
    \`\`\`sh
    npm run test-watch
    \`\`\`
    This also prints the current test coverage.

    MacOS users might need to upgrade watchman with
    \`\`\`
    brew install watchman
    \`\`\`
    when experiencing troubles with the watch mode. See this issue for details: https://github.com/facebook/jest/issues/1767
`

export { introText, howToText, developmentText, testingText }
