# Reactist

Open source React components made with ❤️ by Doist.

# How to use

You can easily add Reactist to your project by installing it from npm:
```
npm install @doist/reactist
```
If you prefer to include static files just grab the [minified build from the dist folder](dist/reactist.js).

A detailled explanation on how to use each component can be found in the corresponding example folder.

At the moment Reactist has implemented the following components:

1. [Modal](examples/modal/README.md)

   A versatile Modal with a Header, Body and Actions.
2. [Button](examples/button/README.md)

   A Button which can take on different states (e.g. act as a loading indicator).

3. [Time](examples/time/README.md)

    A small component to display dates and times which can change on hover.

# How to improve

Build the reactist library by running:
```
npm run build
```

During development we recommend to run
```
npm run build-watch
```
This will listen to changes you make and trigger a rebuild of the reactist library. When running an example in parallel it will be updated automagically.

You can run eslint with 
```
npm run check
```
It is mandatory to fix all linting errors before you make a pull request.

Tip: You can run `npm run check -- --fix` to fix most of the errors automatically.

# Testing

Tests are executed with jest or by simply running:
```
npm run test
```

During development you m ay find it beneficial to continously execute the tests. This works by running:
```
npm run test-watch
```
This also prints the current test coverage.

MacOS users might upgrade watchman with `brew install watchman` when experiencing troubles with the watch mode. See this issue for details: https://github.com/facebook/jest/issues/1767