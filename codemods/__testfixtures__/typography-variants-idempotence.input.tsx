import { Heading } from '@doist/reactist'

export function HeadingVariants() {
    return (
        <>
            <Heading level={1} variant="heading-1">
                Page title
            </Heading>
            <Heading level={4} variant="heading-3">
                Prominent subsection
            </Heading>
        </>
    )
}
