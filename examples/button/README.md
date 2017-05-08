# Reactist Button Example

This example demonstrates the functionality of the Reactist Button.

# How to use

The `Button` component accepts the following properties:
| Property | Type | Default | Description |
| --- | --- |:---:| --- |
| name | string | - |  The text that is displayed on the Button |
| onClick | function | - | Function that is executed when clicking the button |
| secondary | boolean | false | Applies the `secondary` style to the Button |
| small | boolean | false | Applies the `small` style to the Button |
| white | boolean | false | Applies the `white` style to the Button |
| loading | boolean | false | Shows a loading indicator on the button |
| disabled | boolean | false | Disables the button. Clicking a disabled Button won't trigger the `onClick` function |
| data_tip | string | - | Tooltip to display when hovering over the Button |

# How to apply a different branding
If you want your buttons to have a different color scheme you need to import a `.css` file and overwrite the following rules:

```less
@primary-color: #dd4b39;
@primary-color-lighter: lighter(#dd4b39, 0.1);
@primary-color-darker: darker(#dd4b39, 0.1);

.alternate-branding {
    // alternate button styles
    & > .button {
        background-color: @primary-color;

        &:not(.loading):not(.secondary):not(.white):not([disabled]):hover {
            background-color: @primary-color-darker;
        }

        &:not(.loading):not(.secondary)&:disabled {
            background-color: @primary-color-lighter;
        }

        &.white {
            background-color: white;
            border: 1px solid  @primary-color;
            color: @primary-color;
        }
    }
}
```

You can always have a look at the example code (or run it) to see the components in action.

# How to run

Follow the explanation here: [How to run an example](../README.md#how-to-run)
