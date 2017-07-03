# Reactist Dropdown Example

This example demonstrates the functionality of the Reactist Dropdown.

# How to use

The `Dropdown` component consist of three subcomponents `Box, Trigger and Body` which are exported as keys of the Dropdown object. Hence, to use a Dropdown your code should look like this:
```jsx
import { Dropdown } from 'reactist';
...
<Dropdown.Box>
    <Dropdown.Trigger>...</Dropdown.Trigger>
    <Dropdown.Body>...</Dropdown.Body>
</Dropdown.Box>
```

You can always have a look at the example code (or run it) to see the components in action.

The `Dropdown.Box` supports an optional property `allowBodyInteractions` (defaults to `false`). When setting this property the Dropdown won't automatically close when it's clicked. The user has to click outside to close it.

# How to run

Follow the explanation here: [How to run an example](../README.md#how-to-run)
