interface Theme {
    buttonPrimaryFill: string
    buttonPrimaryFillHighlight: string
    contentPrimary: string

    buttonSecondaryFill: string
    buttonSecondaryFillHighlight: string
    contentSecondary: string

    // Used for enumeration
    [s: string]: string
}

export default Theme
