# Changelog

Reactist follows [semantic versioning](https://semver.org/) and doesn't introduce breaking changes (API-wise) in minor or patch releases. However, the appearance of a component might change in a minor or patch release so keep an eye on redesigns and make sure your app still looks and feels like you expect it.

## v9.2.0-beta.16

-   [Fix] Allows classname to be passed through on ButtonLink.

## v9.2.0-beta.15

-   [Fix] Add default padding to `Text` component when used with `lineClamp` prop, in order to prevent emojis from being cutoff
-   [Fix] Allow the `Column` component to leverage the `component` prop to render as another element other than the default `div`

## v9.2.0-beta.14

-   [Fix] Add support for `baseline` alignment

## v9.2.0-beta.13

-   [Fix] Allow nested `Columns` components to retain their own inner spacing

## v9.2.0-beta.12

-   New tag to include the fix from [`v9.1.5`](https://github.com/Doist/reactist/releases/tag/v9.1.5)

## v9.2.0-beta.11

-   [Fix] Incorrect styles in `Button` which affected dark mode themes
-   [Fix] Incorrect styles in `SelectField` which affected dark mode themes

## v9.2.0-beta.10

-   [Breaking] `Text` component now has its `size` attribute changed to accept `caption`, `copy`, `body`, and `subtitle`.
-   [Fix] `Columns` component will now stretch within a flex container

## v9.2.0-beta.9

-   [Docs] Upgraded all beta storybook docs to work with Storybook 6

## 9.1.6

-   [Feature] Change `KeyboardShortcut` to treat `Super` as a key to be translated

## 9.1.5

-   [Fix] Prevent menu items with `aria-disabled` set to `false` from being disabled

## 9.1.4

-   [Perf] Make the disabled Button component visible to screen readers by swapping `disabled` for `aria-disabled`

## 9.1.3

-   [Tweak] Upgrade Storybook to version v6.2.1. Migrate stories to new version.

## v9.2.0-beta.8

-   Fix `Columns` styles, broken by the changes to `Stack` styling. This release now removes the interdependency of `Column's styles relying on `Stack` styles.

## v9.2.0-beta.7

Various fixes to the new experimental components

-   Adds a right padding to the `SelectField` to make sure the chevron never appears on top of the `select` content.
-   Use for the checked `CheckboxField` the same colour variable we use for the `SwitchField`.
-   Add a wrapper `div` around what `Inline` renders, to avoid conflicts with margin applied from the outside by `Stack` (when `Inline` is nested in `Stack`).
-   Simplify the CSS for `Stack` leveraging the `:not(:first-child)` selector.
-   Add one more story to each of `Stack` and `Inline` to showcase that these new changes did not break their expected behaviour.

## v9.2.0-beta.6

Various fixes to the new experimental components

-   Add explicit link styles to `TextLink`
-   `SwitchField` now properly animates the handle moving left or right.
-   Style fixes to the `PasswordField`.
-   Added ref forwarding to `TextField`, `PasswordField` and `Heading`.

## v9.2.0-beta.5

-   Change Stack and Inline elements to not generate one container element per child element.
-   Fix ButtonLink styling
-   Adds a new `display="inlineFlex"` value to the `display` property of `Box`. This makes the `Box` use `display: inline-flex`.

## v9.2.0-beta.4

Various fixes to the new experimental components

-   The `SelectField` now has its native appearance reset (i.e. `appearance: none`).
-   Fixed a typo in an internal css variable in the `SelectField` that made it not have the proper height.
-   Text in `Alert` and `Notice` is now properly aligned vertically with the icon.
-   Fixed some css module classes that were incorrect in the JS code.
-   `Alert` colours did not have the transparency properly set.
-   The `SwitchField` now has a new dedicated css variable for theming its background when checked.

## v9.2.0-beta.3

-   [Fix] `Text` component was not receiving its ref correctly

## v9.2.0-beta.2

-   [Feature] New components `Alert`, `LoadingSpinner`, `Notice`, `Heading`, `Text`, `ButtonLink`, `TextLink`, `CheckboxField`, `PasswordField`, `SelectField`, `SwitchField`, `TextArea`, `TextField`.
-   [Feature] New prop `tone` for component `Heading` (just like that for `Text`).
-   [Feature] New prop `position` for component `Box`.
-   [Feature] New props `flexShrink` and `flexGrow` for component `Box`.
-   [Feature] New props `border` and `borderRadius` for component `Box`.
-   [Feature] New `minWidth={0}` in component `Box`.
-   [Feature] `Text` now supports receiving a `ref`.
-   [Fix] Changed `Box` value for prop `background`. Former value `shade` is now called `aside`.
-   [Fix] `Column` with `width="content"` did not shrink entirely to zero if empty.
-   [Fix] Other fixes to columns so that it did not expand more than expected, so it allows truncated text to truncate.
-   [Fix] Correct font sizes for the various levels of `Heading`.
-   [Fix] `Stack` and `Inline` now generate `span` instead of `div` elements if the html element they use for the container does not allow to contain `div` elements.

## 9.1.2

-   [Fix] Call a MenuItem component's onClick handler if provided; ignore the select action if event.defaultPrevented.

## v9.2.0-beta.1

-   [Feature] Add `xxlarge` option to various `padding` and `space` props for `Box`, `Columns`, `Inline`, and `Stack` components

## v9.2.0-beta

-   [Feature] Add `largest` size increase support for `Heading` component
-   [Feature] Add `lineClamp` for text truncation to `Heading` and `Text` components
-   [Fix] Export the `Column` component in the main entry point
-   [Fix] Add missing colour variables
-   [Docs] Add Storybook demos for `Heading`, `Text`, and colour swatches

## v9.1.0-beta.2

-   [Fix] Move patch-package to dependencies to allow it to run (on nothing since we're patching a dev-dependency) after being installed as a package.
-   [Fix] Prevent emotion's `css` prop from polluting the exported type definitions

## v9.1.0-beta.1

-   [Fix] The previous beta release had an issue where all components' stylesheets were being treated as CSS modules. This will now build with the correct class name selectors again.

## v9.1.0-beta

-   [Feature] A set of base design system components have been added: `Box`, `Columns`, `Divider`, `Heading`, `Inline`, `Stack`, and `Text`. Since we're still experimenting with their API, they will be packaged under beta releases until they become more concrete.

## 9.1.1

-   [Fix] Prevent `Loading` component from spinning off-centre

## 9.1.0

-   [Feature] Adds support for `aria-label` to the `Loading` component
-   [Docs] This also fixes our gh-pages-hosted Storybook to load the proper stylesheets again

## 9.0.0

-   [Build] The project now requires node v14.5.5+ and npm v6.14.11+ to install and run.
-   We're skipping right over v8.0.0 as its tag has already been created previously

## v7.2.1

-   [Tweak] Adds `defaultValue` and ensures additional props are carried forward on the `Select` component.

## v7.2.0

-   [Feature] A new `Notification` component has been added.

## v7.1.9

-   [Fix] We're only rendering menu lists into the DOM when the menu is opened. This should result in measurable performance gains if you're rendering a lot menus (e.g. as part of a list).

## v7.1.8

-   [Tweak] Upgraded Reakit dependency

## v7.1.7

-   [Tweak] Separates `ButtonVariant` and `ButtonSize` as actual types.

## v7.1.6

-   [Tweak] Upgrade some dependencies.

## v7.1.5

-   [Tweak] Adds a backdrop/overlay to dropdown menus.
-   [Fix] Removes the peer dependency on dayjs, adding it as a direct dependency instead.

## v7.1.4

-   [Tweak] Prevents the `Tooltip` component from getting triggered by keyboard interactions performed in other components

## v7.1.3

-   Dummy release created for publishing purposes

## v7.1.2

-   [Tweak] Removes the arbitrary `max-width` value of the Tooltip component
-   [Tweak] Adds a `z-index` value for the Tooltip component so that it appears ontop of other content

## v7.1.1

-   [Bugfix] Fixes an improperly configured `sideEffects` property in package.json that prevented importing CSS files from reactist.

## v7.1.0

-   [Feature] The tooltip content now can be provided as a function that will be called to generate its content. This function will only be called when the tooltip needs to be shown. This allows to have more control on tooltip content that is potentially expensive to generate, so that it only happens when needed.
-   [Fix] The tooltip content is now rendered to the DOM only when the tooltip is shown. This is regardless of wether the content is provided directly or via a function. The React tree won't be comitted to the DOM unless the tooltip needs to become visible.
-   [Tweak] The tooltip delay to appear is now extended from 100ms to 500ms which was our earlier standard with the previous implementation of the tooltip.

## v7.0.0

-   [BREAKING CHANGE] A new Tooltip component is introduced. It is keyboard and screen reader friendly, more compliant with accessibility recommendations about tooltips. It does not provide all the features of the previous Tooltip, and its props change quite a bit. Additionally, it now has a new restriction where it expects its children to consist of a single element. This element is the one used as a trigger for the tooltip. (#276)
-   [BREAKING CHANGE] The `Popover` component now has a new restriction where it expects its children to consist of a single element. (#276)
-   [BREAKING CHANGE] A new set of components for building menus is introduced. The new menus are keyboard and screen reader friendly, more compliant with accessibility recommendations about menus. The old `MenuButton` and `MenuButtonItem` components are no longer available. Moreover we now have a `MenuButton` that is nothing like the one before. Check their code and examples in storybook. (#278)

## v6.0.1

-   [Fix] This fixes a bug in v6.0.0 where the lib/ directory was unbundled.

## v6.0.0

-   [BREAKING CHANGE] Reactist now generates a build more aligned to antd's best practices. It generates a clean ES6 build, a CommonJS build, as well as an unpkg build. It also adds built-in support for future CSS module integration. This is a breaking change because importing modules has changed slightly. See README.md.
-   [BREAKING CHANGE] The `Button` component's `close` prop, which was deprecated back in v5, is now no longer supported.

## v5.2.0

-   [Feature] `Button` can now be unstyled if you omit the `variant` prop. This resets the styles to be even less than default styles of the web browser (e.g. removes all border, padding and background).

## v5.1.0

-   [New] A `KeyboardShortcut` component will take one or several keyboard shortcut specified as string, and will parse them and render them in a nice semantic markup using the `kbd` element. Each key part of a key combination gets its own container so you can style things nicely.

## v5.0.0

The `Button` component's big renovation.

-   [BREAKING CHANGE] The `Button` component changed its outer interface entirely.
    -   Instead of individual boolean props for setting its visual style (`primary`, `secondary`, etc.) it has a single prop `variant` which receives the styling/variant as a string value.
    -   This prop is now required so if you were not adding any of these boolean props, you now need to add `variant="primary"`.
    -   The `white` prop now does not even exist as a `variant`. It is replaced by `variant="secondary"`.
    -   Instead of individual boolean props for setting its size (`small`, `large`), `Button` now has a single prop `size` that can receive either `'small'` or `'large'` as its value. If omitted the button has its default size.
    -   The `Button` now uses `children` as the prop in which it receives the content inside the button, as opposed to using the `name` prop. So now `<Button name="Hello" />` becomes `<Button>Hello</Button>`.
    -   The `Button` prop `data_tip` is now called `tooltip`.
    -   The css class names for the `Button` component are now all following a BEM-like naming convention. Instead of having classes such as `.loading`, `.secondary`, etc. it now has all of these prefixed by `.reactist_button--`. That is, `.secondary` is now `.reactist_button--secondary`.
-   [BREAKING CHANGE] The `LinkButton` component has been removed entirely. The main reason being it is not accessible to use a link as a button. You can achieve a visually similar button with a new possible `variant` prop on the regular `Button`. So now `<LinkButton name="Click me" />` becomes `<Button variant="link">Click me</Button>`. This new link-like button is semantically a button, as opposed to being a link posing as a button.

## 4.1.5

-   [Fix] Tightens up type definitions for the `KeyCapturer` props.

## 4.1.4

-   [Fix] Reinstalled @doist/prettier-config from the npm registry and removed the authentication needed when pulling down dependencies.

## 4.1.3

-   [Fix] We have a dev dependency being on the GiHub package registry and we had problems with our Github actions pulling it. This is hopefully all fixed. 🤞

## 4.1.0

-   [New] The `event` object is now forwarded to the on\* handler in the `KeyCapturer` component. The `onEnter` event will also no longer fire when it's in the middle of an [IME composition session](https://developer.mozilla.org/en-US/docs/Glossary/input_method_editor).

## 4.0.2

-   [New] Brings back individual JS and CSS files so that applications can do selective import in an ES6 build.

## 4.0.1

-   [Fix] Modal.Actions now can have empty or null children again

## 4.0.0

-   [New] The library is now fully Typescript, provides an ES6 module export, and provides native type bindings.
-   [Tweak] To support tree-shaking, we've switched to the Rollup bundler
-   [Breaking Change] All imports are now ES6 relative imports, change `import Loading from "@doist/reactist/lib/loading"` to `import { Loading } from "@doist/reactist"`

## 3.1.2

-   [Tweak] Removes unused (legacy) context from `<Time />` constructor

## 3.1.1

-   [Tweak] Better typing for the checkbox label

## 3.1.0

-   [Feature] Adds typings for all components and utilities

## 3.0.1

-   [Fix] Formatting in the `<Time />` component wasn't working as expected, this is now fixed.

## 3.0.0

-   [Breaking] Changed namespacing from `.reactist.popover {}` to `.reactist_popover {}`. Customizing components' styling need to update accordingly.

## 2.0.2

-   [Tweak] Changed time formatting from `yesterday` to `1d`

## 2.0.1

-   _Empty release_

## 2.0.0

-   [Breaking] Styles are no longer included automatically but need to be loaded manually. See the readme for a detailed instruction on how to achieve that.

## 1.22.06

-   [New] Added a `refresh` prop to `<Time />` component in order to keep the information shown up-to-date when the component displays "time ago". By default, the component will re-render every 60 seconds.

## 1.22.05

-   [Fix] Fixed the `display: intial` CSS rule for IE11 users (affects the `<Popover />` component)

## 1.22.04

-   [Tweak] Fixed unsupported `display: initial` in IE11

## 1.22.04

-   [Tweak] Fixed broken styles for `<Modal>` on small screens

## 1.22.03

-   [Tweak] `<Popover />` content can now be a function which will only be lazily evaluated

## 1.22.02

-   [Tweak] `<Popover />` content is now rendered lazily (i.e. only if `visible` is `true`)

## 1.22.01

-   [Tweak] `<Modal.Body />` now starts to scroll instead of requiring the whole window to scroll.

## 1.22.00

-   [Tweak] `<Dropdown.Body />` can now be a function which allows for lazy evaluation (i.e. content is only rendered when dropdown is opened).

## 1.21.00

-   [Tweak] introduced `.npmignore` file to keep released package smaller and only include the essentials. This also fixes a bug in **v1.20.00** where parts of the `.git` directory ended up in the file package.

## 1.20.00

-   [Tweak] Replaced Moment with [Day.js](https://github.com/iamkun/dayjs)

    🚨 This introduces a new peerDependency (`dayjs`) and removes the need for `moment`. If you're not using the `<Time />` nothing should change for you.

## 1.19.00

-   [Tweak] Changed the way the `<Time />` component formats it's time. You now have more control to influence the date and time format from the outside

## 1.18.15

-   [Tweak] Using a 3px border-radius everywhere instead of a mixture of 3px and 4px

## 1.18.14

-   [Tweak] Updated the `<CloseIcon />` (used in `<Modal.Header>`) to new icon style

## 1.18.13

-   [Tweak] Decreased top and bottom margins of `<Modal />` to 40px

## 1.18.12

-   [Tweak] Increase left and right padding of `<Input />` to 10px to match `<Select />`

## 1.18.11

-   [Tweak] `<ColorPicker />` no longer shows the dropdown arrow and it's styling no longer includes margins
-   [New] `<ColorPicker />` now comes in a `small` version which is only 18px squared instead of 24px

## 1.18.10

-   [Tweak] Switched separators (`<hr />`) in `<Dropdown />` to border gray to unify colors more

## 1.18.09

-   [Tweak] No longer force no text-decoration on `<LinkButton />`

## 1.18.08

-   [New] When providing a className to `<Input />` it no longer overrides reactist' native styles

## 1.18.07

-   [New] Allowing to attach a ref to `<Input />`

## 1.18.06

-   [Bug] Centering the text of `<Tooltip />`

## 1.18.05

-   [Bug] Set visibility of `<Popover />` to `none` to avoid click jacking

## 1.18.04

-   [New] Added `withArrow` property to `<Tooltip />` to support arrow-less tooltips

## 1.18.03

-   [Tweak] `allowVaguePositioning` now also takes the vertical positioning into account instead of only the horizontal one

## 1.18.02

-   [Tweak] When clicking on the trigger of a `<Tooltip />` (i.e. its children) we will close the Tooltip. This is helpful so tooltips no longer overlap menu. In case you need more finegrained control over this consider using a `<Popover />` directly.

## 1.18.01

-   [Tweak] Reset margins on `<Input />` so it's visually aligned in Safari (and all other browsers) by default

## 1.18.00

-   [New] Added the utility component `<KeyCapturer>`. Use it to wrap arbitrary elements and act on keyboard events happening while it is focussed

## 1.17.04

-   [Tweak] All additionally passed props to a `<Button />` are now applied to the underlying `<button>` element. This allows you to make better use of the platform (e.g `type='submit'`) or adhere to accessibility best practices

## 1.17.03

-   [Tweak] Moved some default styles from `<Tooltip />` to `<Popover />` which should make it easier to build nice experiences with it as you no longer need to provide all the styles

## 1.17.02

-   [New] Added `size`, `spinnerColor` and `bgColor` properties to `<Loading />` for a fully customizable loading experience

## 1.17.01

-   [Tweak] Unified all border colors across all components

## 1.17.00

-   [New] Added new general purpose `<Popover />` component which also powers the `<Tooltip />` component. This allows for more flexible popovers than overriding the styles of a tooltip.

## 1.16.08

-   [New] Added support for `disabled` property to `<Checkbox />`

## 1.16.07

-   [Tweak] We now update the styles of `<Input />` when supplying the `disabled` property

## 1.16.06

-   [New] Added `medium` property to `<Modal.Box />` as a new size constant. It will produce modals that are 680px wide
-   [New] Added `plain` property to `<Modal.Body />` which removes all styling from the body for custom modals

## 1.16.05

-   [Tweak] Darkened border color of `<Select />` to border color constant

## 1.16.04

-   [Bug] Changed class name of loading `<Button />` from `loading` to `busy` to avoid clash with the `loading` class name of `<Loading />`

## 1.16.03

-   [Tweak] Darkened font and border color of secondary button to improve readability

## 1.16.02

-   [Tweak] Relaxed prop types of most components which render strings to also accept component(s)

## 1.16.01

-   [Tweak] Updated icon of `<Select />` to fit our iconography

## 1.16.00

-   [Tooling] Updated to webpack 4, babel 7 and fixed some problems in our build process. `moment`, `classnames` and `prop-types` are now correctly treated as externals and are no longer included in our production bundle. This resulted in a reduced stat size from 703kb to 160kb ⚡️

## 1.15.24

-   [Bug] When closing a modal by pressing esc we now prevent the browser's default behaviour (e.g. leaving fullscreen mode)

## 1.15.23

-   [Bug] Clicking on the inner overlay of `<Modal />` (aka left or right of the modal) when `closeOnOverlayClick` was set to `true` the modal wouldn't close

## 1.15.22

-   [Bug] Changing the `right` prop of `<Dropdown />` didn't have any effect as it was "cached" in internal state upon first construction

## 1.15.21

-   [Tweak] Added rounded corners to the blue line indicating an active tab

## 1.15.20

-   [Bug] Setting `useCapture` to `true` to catch scroll events of all elements of a page to correctly hide the tooltip

## 1.15.19

-   [New] Added `gapSize` to `<Tooltip />`

## 1.15.18

-   [Redesign] The `<Loading />` indicator is now a spinning circle instead of three bouncing dots

## 1.15.17

-   [Tweak] Inactive tabs use the secondary font color instead of custom gray

## 1.15.16

-   [Tweak] Darkened primary and secondary font colors for improved readability

## 1.15.15

-   [New] Added support for the `style` property to `<Modal.Box />` and `<Modal.Body />` for when a className is not enough

## 1.15.14

-   [Tweak] Sets the default value of the `delayShow` of the `<Tooltip />` component to 500ms (0.5s) instead of 1s

## 1.15.13

-   [Tweak] Set the margin of `<Select />` to 0 to avoid browser inconsistencies in Safari

## 1.15.12

-   [Tweak] Instead of using the default delay of 1s (1000ms) for tooltips when hovering the `<Time />` component we now use 500ms (0.5s)

## 1.15.11

-   [Redesign] The `<ColorPicker />` can now show an optional active indicator on the selected color item.
    -   Additionally, we no longer hide the active color from the selection. That means you might need to check in your code that an actual change occurred.
-   [Bug] When supplying an invalid `color` prop to the `<ColorPicker />` it would crash. Now it selects the first color in the `colorList`.

## 1.15.10

-   [Tweak] Increased the size of the white inner ring that appears when hovering a color item of the `<ColorPicker />`

## 1.15.9

-   [Redesign] New design for the `<ColorPicker />`
    -   It now shows the color name on hover – when supplied through the `colorList` prop
-   [Bug] `<Tooltip />`s are now correctly displayed in absolutely positioned elements (esp. `<Dropdown />`s)

---

... we failed to write a changelog before that version you could probably scroll through the commit history to find out more. Sorry!
