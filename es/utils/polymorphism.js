import * as React from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * A wrapper to use React.forwardRef with polymorphic components in a type-safe manner. This is a
 * convenience over merely using React.forwardRef directly, and then manually forcing the resulting
 * value to be typed using `as PolymorphicComponent<…>`.
 *
 * @deprecated Use Ariakit's composition instead (https://ariakit.org/guide/composition)
 */

function polymorphicComponent(render) {
    return /*#__PURE__*/ React.forwardRef(render)
}

export { polymorphicComponent }
//# sourceMappingURL=polymorphism.js.map
