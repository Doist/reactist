# Changelog

Reactist follows [semantic versioning](https://semver.org/) and doesn't introduce breaking changes (API-wise) in minor or patch releases. However, the appearance of a component might change in a minor or patch release so keep an eye on redesigns and make sure your app still looks and feels like you expect it.

## 5.0.0

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
