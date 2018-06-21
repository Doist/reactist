# Changelog

Reactist follows [semantic versioning](https://semver.org/) and doesn't introduce breaking changes (API-wise) in minor or patch releases. However, the appearance of a component might change in a minor or patch release so keep an eye on redesigns and make sure your app still looks and feels like you expect it.

## 1.15.12
- [Tweak] Instead of using the default delay of 1s (1000ms) for tooltips when hovering the `<Time />` component we now use 500ms (0.5s)

## 1.15.11
- [Redesign] The `<ColorPicker />` can now show an optional active indicator on the selected color item.
    - Additionally, we no longer hide the active color from the selection. That means you might need to check in your code that an actual change occurred.
- [Bug] When supplying an invalid `color` prop to the `<ColorPicker />` it would crash. Now it selects the first color in the `colorList`.

## 1.15.10
- [Tweak] Increased the size of the white inner ring that appears when hovering a color item of the `<ColorPicker />`

## 1.15.9

- [Redesign] New design for the `<ColorPicker />`
    - It now shows the color name on hover – when supplied through the `colorList` prop
- [Bug] `<Tooltip />`s are now correctly displayed in absolutely positioned elements (esp. `<Dropdown />`s)

---
... we failed to write a changelog before that version you could probably scroll through the commit history to find out more. Sorry!
