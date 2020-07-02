const alternateBrandingText = `
    If you want your buttons to have a different color scheme you need to import a \`.css\` file and overwrite the following rules:

    \`\`\`less
    @primary-color: #dd4b39;
    @primary-color-lighter: lighter(#dd4b39, 0.1);
    @primary-color-darker: darker(#dd4b39, 0.1);

    .alternate-branding {
        // alternate button styles
        & > .reactist_button {
            background-color: @primary-color;

            &--primary:not([disabled]):hover {
                background-color: @primary-color-darker;
            }

            &:not(.reactist_button--loading):not(.reactist_button--secondary)&:disabled {
                background-color: @primary-color-lighter;
            }

            &.reactist_button--white {
                background-color: white;
                border: 1px solid  @primary-color;
                color: @primary-color;
            }
        }
    }
    \`\`\`
`

export { alternateBrandingText }
