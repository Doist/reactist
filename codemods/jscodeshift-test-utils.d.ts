declare module 'jscodeshift/dist/testUtils' {
    import type { Options, Transform } from 'jscodeshift'

    export function applyTransform(
        transform: { default: Transform; parser: string },
        options: Options | null,
        input: { path?: string; source: string },
    ): string
}
