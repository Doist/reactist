# Reactist

Open source React components made with ❤️ by Doist.

[![npm version](https://badge.fury.io/js/%40doist%2Freactist.svg)](https://badge.fury.io/js/%40doist%2Freactist)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**[Check out our live demo.](http://doist.github.io/reactist)** It includes all currently implemented components plus a live playground to interact with them in different states.

# How to use reactist

You can add Reactist to your project by installing it from npm:

```sh
npm install @doist/reactist
```

To import a component within your code:

```js
import { Loading } from '@doist/reactist'
//OR
import Loading from '@doist/reactist/dist/Loading'
```

You also need to load the CSS file of reactist somewhere in your app. For instance:

```html
<link rel="stylesheet" type="text/css" href="./node_modules/@doist/reactist/styles/Loading.css" />
```

If you prefer to include static files grab the [minified build from the dist folder](https://github.com/Doist/reactist/tree/develop/dist).

```html
<script src="./node_modules/@doist/reactist/dist/reactist.cjs.production.min.js"></script>
<link rel="stylesheet" type="text/css" href="./node_modules/@doist/reactist/styles/reactist.css" />
```

# Changelog

You can find our changelog [here](./CHANGELOG.md).

# Development

We leverage `package.json`'s `engines` field to specify the node/npm versions to be used while in development. The easiest way to switch quickly is through [fnm](https://github.com/Schniz/fnm).

It's worth noting that fnm can automatically switch to a project's specified node version when it encounters a `.nvmrc` file. To do so, use the `--use-on-cd` flag when [generating your shell's config script with `fnm env`](https://github.com/Schniz/fnm#fnm-env).

Once fnm is installed, clone the repository. Then, switch to the required node version, and run its setup task:

```sh
git clone https://github.com/doist/reactist.git
cd reactist
fnm install
fnm use
npm run setup
```

The setup task will install dependencies and run various validations (linting, type checking, tests).

We identified two major modes of development for Reactist. First, running an interactive storybook and see the changes you make to a component in an isolated environment. This is especially helpful when developing new components. And second, improving existing components in real-life applications.

## Storybook

For the first development mode run:

```sh
npm run storybook
```

This boots up a development server with hot reloading on http://localhost:6006. You can iterate on the components in the existing stories or add a completely new one.

## Inside your application

For the second development mode you can leverage `npm link`. First run:

```sh
npm run start
```

this will update the build artifacts whenever you change something.

In your real application you need to first delete the current _@doist/reactist_ dependency and then link to your local one.

```sh
cd ~/your-app
# delete current reactist dependency
rm -rf ./node_modules/@doist/reactist

# link local reactist version
npm link ../reactist
```

The relative path to reactist may need to be changed to match your local environment.

To undo the changes and switch back to the reactist version from npm do the following:

```sh
cd ~/your-app
# first remove linked reactist dependency
rm -rf ./node_modules/@doist/reactist

# re-install reactist from npm (-E avoids updating the version / package-lock.json)
npm install -E @doist/reactist
```

## Development tips and tricks

Independent of the development you operate in to produce a new build (e.g. before submitting a PR) run:

```sh
npm run build
```

**Note:** This will **not** update the docs. In case you want to update the docs you need to run:

```sh
npm run build:storybook
```

# Testing

Tests are executed by running:

```sh
npm run test
```

During development you may find it beneficial to continuously execute the tests. This works by running:

```sh
npm run test -- --watch
```

MacOS users might need to upgrade watchman with `brew install watchman` when experiencing troubles with the watch mode. See this issue for details: https://github.com/facebook/jest/issues/1767

# Releasing

A new version of reactist is published both on npm and GitHub Package Registry whenever a new release on GitHub is created.

To begin the process, update CHANGELOG.md with the new version and its changes

To update the version in both `package.json` and `package-lock.json`:

```sh
npm --no-git-tag-version version <major|minor|patch>
```

Once these changes have been pushed and merged, create a release.

A GitHub Action will automatically perform all the necessary steps and will release the version number that's specified inside the `package.json`'s `version` field so make sure that the release tag reflects the version you want to publish.

Finally, once the release has been created be sure to update both [todoist-web](https://github.com/Doist/todoist-web) and [twist-web](https://github.com/Doist/twist-web) to use the new version.
