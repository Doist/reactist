/**
 * This mock is used by jest to be able to load styles.
 */
export default new Proxy(
    {},
    {
        get: (_target, key) => key,
    },
)
