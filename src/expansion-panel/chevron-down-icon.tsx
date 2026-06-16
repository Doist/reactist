import * as React from 'react'

/**
 * Chevron used by `ExpansionPanelToggle`. Kept local to the component for now,
 * pending shared icon syncing (https://github.com/doist/icons).
 */
function ChevronDownIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.854 8.896a.5.5 0 0 0-.708 0L12 14.043 6.854 8.896a.5.5 0 1 0-.708.708l5.5 5.5a.5.5 0 0 0 .708 0l5.5-5.5a.5.5 0 0 0 0-.708Z"
            />
        </svg>
    )
}

/** Smaller-weight variant of {@link ChevronDownIcon}. */
function ChevronDownSmallIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            {...props}
        >
            <path d="M15.646 9.646a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L12 13.293l3.646-3.647Z" />
        </svg>
    )
}

export { ChevronDownIcon, ChevronDownSmallIcon }
