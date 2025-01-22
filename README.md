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

## Creating new components

The development of new components is streamlined by the ability to generate new component templates using [plop](https://plopjs.com/):

```sh
npm run plop component
```

This command will prompt you to provide all the information needed to create a new component template. The most important piece of information needed is the component name, which you can provide even as a phrase (e.g. "dropdown select" will generate a `DropdownSelect` component template).

The generated source files include the component implementation with sample props and styles, plus a small test file and storybook source files as well.

You also need to export your new component by adding a reference to it in the [top-level index file](src/index.ts).

## Storybook

For the first development mode run:

```sh
npm run storybook
```

This boots up a development server with hot reloading on http://localhost:6006. You can iterate on the components in the existing stories or add a completely new one.

## Inside your application

For the second development mode you can leverage `npm start:yalc`. First, make sure you have `yalc` installed globally:

```shell
npm install -g yalc
```

Then, in the reactist repository run:

```sh
npm run start:yalc
```

this will publish Reactist to `yalc` and watch for changes.

In your host application you can then link to your local Reactist version:

```sh
cd ~/your-app
yalc add @doist/reactist
```

To undo the changes and switch back to the reactist version from npm, do the following:

```sh
cd ~/your-app
# restore the original reactist version
yalc remove @doist/reactist
# re-install reactist from npm
npm install
```

For convenience, you can add a `dev:reactist` script in your host application to automate the process of adding and removing the local Reactist version:

```json5
{
    // ...
    scripts: {
        // ...
        'predev:reactist': 'yalc add @doist/reactist',
        'dev:reactist': 'npm run dev', // or whatever your development script is
        'postdev:reactist': 'yalc remove @doist/reactist && npm i',
    },
}
```

Then, to develop against Reactist, just run:

```sh
npm run dev:reactist
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

## Chromatic visual regression tests

Reactist relies on [Chromatic](https://www.chromatic.com/) to run visual regression tests on our component during the CI step in GitHub.

### Enable tests

To enable such tests, just add `chromatic: { disableSnapshot: false }` as a story parameter in your stories. Example:

```
<Canvas>
    <Story
        name="Main demo"
        parameters={{
            docs: { source: { type: 'code' } },
            chromatic: { disableSnapshot: false },
        }}
    >
        <BannerExamples theme="light" />
    </Story>
</Canvas>
```

We recommend you enable these tests on those Storybook stories that have several different variants of the component under testing. Enabling them on one or two stories per component should be sufficient in most cases (there's no need to enable them on all stories).

### Review tests

When you open a GitHub PR, you'll notice the "UI Review" and "UI Tests" CI steps.

-   Clicking on "Details" will bring you to the Chromatic UI (if you don't already have a Chromatic account, please sign-up using your GitHub account).
-   Now you can review and accept your changes (or go back and change your code).
-   When you're happy with your changes, make sure to mark them as "Approved".

# Releasing

This project uses [release-please](https://github.com/googleapis/release-please) to automate version management and package publishing.

## How it works

1. Make your changes using [Conventional Commits](https://www.conventionalcommits.org/):

    - `feat:` for new features (minor version bump)
    - `fix:` for bug fixes (patch version bump)
    - `style:` for code style changes
    - `perf:` for performance improvements
    - `refactor:` for refactoring code
    - `test:` for adding/updating tests
    - `build:` for build/dependency changes
    - `docs:` for documentation changes
    - `ci:` for CI changes
    - `revert:` for reverting previous commits
    - `feat!:` or `fix!:` for breaking changes (major version bump)
    - `chore:` for maintenance tasks (NOTE: these are not included in the changelog)

2. When commits are pushed to `main`:

    - Release-please automatically creates/updates a release PR
    - The PR includes version bump and changelog updates
    - Review the PR and merge when ready

3. After merging the release PR:
    - A new GitHub release is automatically created
    - A new tag is created
    - The `publish` workflow is triggered
    - The package is published to npm and GitHub Packages
    - Storybook documentation is automatically updated

The storybook hosted on GitHub pages will be automatically updated on each push to `main`. If there's a problem, try running the action manually from the [Actions settings](https://github.com/Doist/reactist/actions).
