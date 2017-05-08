# Reactist Modal Example

This example demonstrates the functionality of the Reactist Modal.

# How to use

The `Modal` component consist of four subcomponents `Box, Header, Body, Actions` which are exported as keys of the Modal object. Hence, to use a Modal your code should look like this:
```jsx
import { Modal } from 'reactist';
...
<Modal.Box>
    <Modal.Header>...</Modal.Header>
    <Modal.Body>...</Modal.Body>
    <Modal.Actions>...</Modal.Actions>
</Modal.Box>
```

The Modal is always attached to an element with the id **modal_box**. You need to add this somewhere in your component hierarchy in order for the Modal to work correctly. It is sufficient to add this once near the top of your component hierarchy.

## Modal - Box
The `Modal.Box` component simply acts as a container for the Modal and is responsible for rendering the dark overlay and all children components. You can pass it an optional `className` property to apply additional styles.

## Modal - Header
The `Modal.Header` component shows the Header of the Modal. It always show a close icon on the right side to close the Modal. It can display arbitrary content you pass to it as children. However, the recommended usage pattern is to supply the `title` and `subtitle` (string) properties. This displays nicely formatted headings inside the Header.

Nevertheless, the `Modal.Header` will look the same whether you go for option 1 or option 2:
```
// Option 1
<Modal.Header>A Fancy Title</Modal.Header>

// Option 2
<Modal.Header title='A Fancy Title' />
```

## Modal - Body
In the simplest case the `Modal.Body` just wraps all its children. However, it can be used to implement a more complex Dialog (i.e. if you do not want to render a Header). You can specify the `icon` property (any node, e.g. an `<img />` or your custom `<Icon />` component) which will be displayed on the left side of the Dialog's Body. When you set the `showCloseIcon` property to `true` the Body will display a close icon to dismiss the Dialog again. This should only be used when no Header is used.

## Modal - Actions
The `Modal.Actions` displays an action bar on the bottom of the Modal. It works best with the [Reactist Buttons](../button/README.md). If you set the `close` property to `true` on any of the supplied children it's `onClick` function will close the modal.

```
<Modal.Actions>
    <Button name='Clicking me will close the Modal' close />
</Modal.Actions>
```

You can always have a look at the example code (or run it) to see the components in action.

# How to run

Follow the explanation here: [How to run an example](../README.md#how-to-run)
