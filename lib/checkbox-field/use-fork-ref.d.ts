/// <reference types="react" />
/**
 * Merges React Refs into a single memoized function ref so you can pass it to an element.
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useForkRef(internalRef, ref)} />;
 * });
 */
declare function useForkRef(...refs: Array<React.Ref<unknown> | undefined>): ((value: unknown) => void) | undefined;
export { useForkRef };
