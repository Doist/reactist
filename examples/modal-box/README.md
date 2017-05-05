# Reactist ModalBox Example

This example demonstrates the functionality of the Reactist ModalBox.

# How to

To build the example locally run:
```
npm run build
```
The output will be in the `public` folder.

For development purposes you might want to link the reactist dependency so you are automatically updated when it changes:
```
npm link --production ../../.
```
This needs to be repeated everytime you clear your node_modules folder.

To run the example on a development server (incl. hot reloading) execute:
```
npm run start
```

Before you submit a pull request for this example make sure you don't have any linting errors by running
```
npm run check
```