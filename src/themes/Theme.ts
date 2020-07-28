interface Theme {
    primaryFillColor: string
    primaryFillElevatedColor: string
    primaryFontColor: string

    secondaryFillColor: string
    secondaryFillElevatedColor: string
    secondaryFontColor: string

    // Used for enumeration
    [s: string]: string
}

export default Theme
