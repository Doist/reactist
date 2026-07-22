import { Text, Text as Copy } from '@doist/reactist'

export function Example() {
    return (
        <>
            <Text size="subtitle">Subheader regular</Text>
            <Text size="subtitle" weight="semibold">
                Subheader semibold
            </Text>
            <Text size="body">Body regular</Text>
            <Text size="body" weight="semibold">
                Body semibold
            </Text>
            <Text size="body" weight="bold">
                Body bold
            </Text>
            <Copy size="copy">Callout regular</Copy>
            <Text size="copy" weight="semibold">
                Callout semibold
            </Text>
            <Text size="caption">Caption regular</Text>
            <Text size={'caption'} weight={'semibold'}>
                Caption semibold
            </Text>
            <Text size="caption" weight="bold">
                Caption bold
            </Text>
            <Text>Default body</Text>
            <Text as="span">Default span</Text>
        </>
    )
}
