import * as React from 'react';
type Props = {
    children: React.ReactNode;
};
/**
 * Provides content to assistive technologies while hiding it from the screen.
 *
 * @see Hidden for fully hiding content, and only under certain conditions.
 */
declare const HiddenVisually: import("../utils/polymorphism").PolymorphicComponent<"div", Props, "omitClassName">;
export { HiddenVisually };
