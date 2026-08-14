import { Text as Heading } from '@doist/reactist'

export function HeadingVariants() {
    return (
        <>
            <Heading variant="header-1" render={<h1 />}>
                Page title
            </Heading>
            <Heading variant="header-3" render={<h4 />}>
                Prominent subsection
            </Heading>
        </>
    )
}
