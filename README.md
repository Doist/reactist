# Reactist

Open source React components made with ❤️ by Doist.

# How to use

tbd.

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