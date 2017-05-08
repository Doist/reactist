# Reactist Examples

Each reactist component has one or multiple examples in its subdirectory. 

Each subdirectory contains more detailed instructions on how to setup the example and make it run on your local machine.

# [How to run an example](#how-to-run)

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

To run the example on a local development server (incl. hot reloading) execute:
```
npm run start
```

Before you submit a pull request for an example make sure you don't have any linting errors by running
```
npm run check
```