declare const getPropTypesStory: (...components: any[]) => any;
declare const optionsSourceOnly: {
    showSource: boolean;
    allowSourceToggling: boolean;
    showPropTables: boolean;
    allowPropTablesToggling: boolean;
};
declare const optionsNoSourceNoProps: {
    showSource: boolean;
    allowSourceToggling: boolean;
    showPropTables: boolean;
    allowPropTablesToggling: boolean;
};
declare const emptySection: () => void;
export { getPropTypesStory, emptySection, optionsSourceOnly, optionsNoSourceNoProps };
