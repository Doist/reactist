import React from 'react'
import { withInfo } from '@storybook/addon-info'

// Info Addon =================================================================
const getPropTypesStory = (...components) =>
    withInfo({
        header: false,
        inline: true,
        source: false,
        propTables: components,
        maxPropStringLength: 300,
    })(() => <div />)

// Chapters Addon =============================================================
const optionsSourceOnly = {
    showSource: false,
    allowSourceToggling: true,
    showPropTables: false,
    allowPropTablesToggling: false,
}
const optionsNoSourceNoProps = {
    showSource: false,
    allowSourceToggling: false,
    showPropTables: false,
    allowPropTablesToggling: false,
}
const emptySection = () => undefined

export { getPropTypesStory, emptySection, optionsSourceOnly, optionsNoSourceNoProps }
