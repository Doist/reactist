function PasswordHiddenIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" {...props}>
            <g fill="gray" fillRule="evenodd" transform="translate(2 4)">
                <path
                    fillRule="nonzero"
                    d="M13.047 2.888C11.962 2.294 10.944 2 10 2 7.56 2 4.63 3.966 1.288 8c1.133 1.368 2.218 2.497 3.253 3.394l-.708.708c-1.068-.93-2.173-2.085-3.315-3.464a1 1 0 0 1 0-1.276C4.031 3.121 7.192 1 10 1c1.196 0 2.456.385 3.78 1.154l-.733.734zm-6.02 10.263C8.084 13.72 9.076 14 10 14c2.443 0 5.373-1.969 8.712-6-1.11-1.34-2.176-2.453-3.193-3.341l.708-.709C17.437 5.013 18.695 6.363 20 8c-3.721 4.667-7.054 7-10 7-1.175 0-2.411-.371-3.709-1.113l.735-.736z"
                />
                <path
                    fillRule="nonzero"
                    d="M8.478 11.7l.79-.79a3 3 0 0 0 3.642-3.642l.79-.79A4 4 0 0 1 8.477 11.7zM6.334 9.602a4 4 0 0 1 5.268-5.268l-.78.78A3.002 3.002 0 0 0 7.113 8.82l-.78.78z"
                />
                <rect
                    width="21"
                    height="1"
                    x="-.722"
                    y="7.778"
                    rx=".5"
                    transform="rotate(-45 9.778 8.278)"
                />
            </g>
        </svg>
    )
}

export { PasswordHiddenIcon }
