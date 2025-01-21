import * as React from 'react'

function CloseIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" {...props}>
            <path
                fill="currentColor"
                d="M5.146 5.146a.5.5 0 0 1 .708 0L12 11.293l6.146-6.147a.5.5 0 0 1 .638-.057l.07.057a.5.5 0 0 1 0 .708L12.707 12l6.147 6.146a.5.5 0 0 1 .057.638l-.057.07a.5.5 0 0 1-.708 0L12 12.707l-6.146 6.147a.5.5 0 0 1-.638.057l-.07-.057a.5.5 0 0 1 0-.708L11.293 12 5.146 5.854a.5.5 0 0 1-.057-.638z"
            />
        </svg>
    )
}

export { CloseIcon }
