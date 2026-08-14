import { Text as Heading, Text as Title } from '@doist/reactist'

type Labels = {
    Heading: string
    Title: string
}

const labels: Labels = {
    Heading: 'Heading',
    Title: 'Title',
}

const memberLabels = [labels.Heading, labels.Title]
const { Heading: headingLabel, Title: titleLabel } = labels
const UI = { Heading: 'div', Title: 'span' }

export function HeadingNameKeys() {
    return (
        <>
            <Heading variant="header-1">{headingLabel}</Heading>
            <Title variant="header-2" render={<h1 />}>
                {titleLabel}
            </Title>
            <UI.Heading />
            <UI.Title />
            <div Heading="Heading" Title="Title" />
            {memberLabels.join(', ')}
        </>
    )
}
