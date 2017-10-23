import React from 'react'
import { withInfo } from '@storybook/addon-info'

// Info Addon =================================================================
// Style Transformer ==========================================================
const removeBox = (stylesheet) => {
    stylesheet.infoBody.boxShadow = 'none'
    stylesheet.infoBody.border = 'none'
    stylesheet.infoBody.margin = '0'
    stylesheet.infoBody.padding = '0 40px'
    return stylesheet
}
const removeHeadings = (stylesheet) => {
    stylesheet.header.h1.display = 'none'
    // stylesheet.propTableHead.display = 'none'
    return stylesheet
}
const propTypesStyleTransformer = (stylesheet) => removeBox(removeHeadings(stylesheet))

const getPropTypesStory = (...components) => withInfo({
    header: false,
    inline: true,
    source: false,
    propTables: components,
    styles: propTypesStyleTransformer,
    maxPropStringLength: 300
})(() => <div />)

// Chapters Addon =============================================================
const optionsSourceOnly = {
    showSource: false,
    allowSourceToggling: true,
    showPropTables: false,
    allowPropTablesToggling: false
}
const optionsNoSourceNoProps = {
    showSource: false,
    allowSourceToggling: false,
    showPropTables: false,
    allowPropTablesToggling: false
}
const emptySection = () => {}

export {
    getPropTypesStory,
    emptySection,
    optionsSourceOnly,
    optionsNoSourceNoProps
}
