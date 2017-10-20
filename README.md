# Reactist

Open source React components made with ❤️ by Doist.

# How to use

You can easily add Reactist to your project by installing it from npm:
```sh
npm install @doist/reactist
```
If you prefer to include static files just grab the [minified build from the dist folder](https://github.com/Doist/reactist/tree/develop/dist).

A detailled explanation and exmaples on how to use each component can be accessed by clicking on the component name on the left.

# Development

First clone the repository to your local machine by running:
```sh
git clone git@github.com:Doist/reactist.git
```

You can run the build task in watch mode with
```sh
npm run build-watch
```
this will update the build artifacts whenever you change something. This is helpful if you linked your local version of reactist into your project and want to see the changes there.

If you want to develop a new component or change an existing one we recommend to do it directly in a story with storybook. You can boot the development server with hot reloading by running:
```sh
npm run storybook
```
Changes you make on the component will be instantly reflected on the component itself.

To produce a new build (e.g. before submitting a PR) run:
```sh
npm run build
```
**Note:** This will **not** update the docs. In case you want to update the docs you need to run:
```sh
npm run build-storybook
```

You can run our eslint checks with
```sh
npm run check
```
It is mandatory to fix all linting errors before you make a pull request.

**Tip:** You can fix most of the errors automatically by running:
```sh
npm run check -- --fix
```

# Testing

Tests are executed with jest or by running:
```sh
npm run test
```

During development you may find it beneficial to continously execute the tests. This works by running:
```sh
npm run test-watch
```
This also prints the current test coverage.

MacOS users might need to upgrade watchman with `brew install watchman` when experiencing troubles with the watch mode. See this issue for details: https://github.com/facebook/jest/issues/1767
