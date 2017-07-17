# Reactist Time Example

This example demonstrates the functionality of the Reactist Time.

# How to use

You need to set the property `time` as a unix timestamp when instantianting a `Time` component. Additionally, you may set the following the properties:

| Property | Type | Default | Description |
| --- | --- |:---:| --- |
| expandOnHover | boolean | false | When set to `true` the `Time` component will format the given timestamp as date. The format is `MMM D, YYYY` (i.e. Aug 9, 2016). The year is omitted when the timestamp is in the current year |
| expandFullyOnHover | boolean | false | When set to `true` the `Time` component will format the given timestamp as date with time. The format is `DD MMM YY, LT` (i.e. 10 Apr 17, 13:37pm). |

When setting `expandOnHover` and `expandFullyOnHover` simultaneously the `expandFullyOnHover` takes precedence over `expandOnHover`.

The `Time` components renders the given timestamp following these rules:
| Condition | Output |
| --- | --- |
| timestamp less than 1 minute ago | `moments ago` |
| timestamp less than 1 hour ago | `Xm` |
| timestamp less than 1 day ago | `Xh` |
| timestamp less than 7 days ago | the day of the timestamp (e.g. `Friday`) |
| timestamp more than 7 days ago | Absolute date in the format `MMM D, YYYY` (e.g. Aug 9, 2016). The year is omitted when the timestamp is in the current year. |

You can always have a look at the example code (or run it) to see the components in action.

## i18n support

You can pass a config object to every `Time` component to add framework agnostic i18n support. It is basically up to you how to translate the strings and decide on the locale.

The config object has the following shape and default values:
```
config = {
    locale: 'en',
    hoursSuffix: 'h',
    minutesSuffix: 'm',
    momentsAgo: 'moments ago'
}
```

# How to run

Follow the explanation here: [How to run an example](../README.md#how-to-run)
