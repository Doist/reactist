import * as React from 'react';
import type { ResponsiveProp } from './responsive-props';
import type { Space } from './common-types';
type PropsWithSpace = {
    space?: ResponsiveProp<Space>;
    'data-testid'?: string;
};
declare function runSpaceTests<Props extends PropsWithSpace>(Component: React.ComponentType<Props>): void;
/**
 * Solves some issues with unwanted warnings in tests of ariakit components due to its internal
 * usage of the event queue for asynchronous side-effects.
 *
 * Think of it as a special version of `act` that we need to call to make sure some async (but
 * immediate) actions are taken care of. Mostly around the ariakit popover and combobox elements'
 * state management.
 *
 * @see https://twitter.com/diegohaz/status/1560525455383461888
 * @see https://github.com/ariakit/ariakit/issues/1800#issuecomment-1227862399
 */
declare function flushMicrotasks(): Promise<void>;
declare function TestIcon(): React.JSX.Element;
export { runSpaceTests, flushMicrotasks, TestIcon };
