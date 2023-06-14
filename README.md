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

A new version of reactist is published both on npm and GitHub Package Registry whenever a new release on GitHub is created.

## Before merging your changes

In the GitHub PR that contains your new changes, make sure that you also include the following:

1. Add tests for bugs and new feature

2. Update relevant docs (storybooks, readme)

3. Execute:

```sh
npm run validate
```

and make sure no errors nor warnings are shown

4. Describe your changes in [`CHANGELOG.md`](CHANGELOG.md)

5. Bump the version in [`package.json`](package.json) and [`package-lock.json`](package-lock.json) by running:

```sh
npm --no-git-tag-version version <major|minor|patch>
```

[ref](https://docs.npmjs.com/cli/v6/commands/npm-version)

Note that the steps above are also documented in the [PR template](.github/PULL_REQUEST_TEMPLATE.md) that you will be prompted with whenever you open a new reactist GitHub PR.

## After merging your changes

Once your changes have been merged to `main`, create a new GitHub release:

1. Visit https://github.com/Doist/reactist/releases/new

2. In the "Choose a tag" dropdown, type the new release version (i.e. vX.Y.Z) and select "Create new tag: vX.Y.Z on publish"

3. In the "Release title" field, type the new release version (i.e. vX.Y.Z)

4. In the "Describe the release" box, paste the same content you added to the [`CHANGELOG.md`](CHANGELOG.md), but without the title header

5. Make sure the "Set as the latest release" checkbox is checked

6. Click "Publish release"

7. Visit https://github.com/Doist/reactist/actions

8. Make sure that a new GitHub action is now running (this will automatically perform all the necessary steps to publish the package)

9. Once the action is complete, check https://npmjs.com/package/@doist/reactist and verify that there's a new public release

Finally, be sure to update both [todoist-web](https://github.com/Doist/todoist-web) and [twist-web](https://github.com/Doist/twist-web) to use the new reactist version you just published.

The storybook hosted on GitHub pages will be automatically updated on each push to `main`. Should there be a problem, try running the action manually from the [Actions settings](https://github.com/Doist/reactist/actions).
