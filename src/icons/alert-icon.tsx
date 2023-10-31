import * as React from 'react'
import type { AlertTone } from '../utils/common-types'

const alertIconForTone: Record<AlertTone, typeof AlertInfoIcon> = {
    info: AlertInfoIcon,
    positive: AlertPositiveIcon,
    caution: AlertCautionIcon,
    critical: AlertCriticalIcon,
}

function AlertIcon({ tone, ...props }: JSX.IntrinsicElements['svg'] & { tone: AlertTone }) {
    const Icon = alertIconForTone[tone]
    return Icon ? <Icon {...props} /> : null
}

function AlertInfoIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-8-3.94a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM10.25 10a.75.75 0 0 0 0 1.5h1.25V15h-1.25a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5H13v-4.25a.75.75 0 0 0-.75-.75h-2Z"
                fill="currentColor"
            />
        </svg>
    )
}

function AlertPositiveIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-5.555-2.99a.75.75 0 0 1 1.06 1.06l-5.303 5.304a.748.748 0 0 1-1.061 0l-2.475-2.475a.75.75 0 0 1 1.06-1.06l1.945 1.944 4.774-4.773Z"
                fill="currentColor"
            />
        </svg>
    )
}

function AlertCautionIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m10.272 4.962-7.018 12.03A2 2 0 0 0 4.982 20h14.036a2 2 0 0 0 1.727-3.008l-7.018-12.03a2 2 0 0 0-3.455 0ZM13 16.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-.014-7.013A.987.987 0 0 0 12 8.5h-.028l-.027.002a.987.987 0 0 0-.93 1.04l.236 4.25c.052.944 1.445.944 1.498 0l.236-4.25a1.925 1.925 0 0 0 .001-.055Z"
                fill="currentColor"
            />
        </svg>
    )
}

function AlertCriticalIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.9866 2.25049C12.3729 1.91683 11.6271 1.91683 11.0134 2.25049L4.04793 6.03744C3.40122 6.38904 2.99999 7.05702 2.99999 7.78208V15.2184C2.99999 15.9435 3.40122 16.6115 4.04793 16.963L11.0134 20.75C11.6271 21.0837 12.3729 21.0837 12.9866 20.75L19.9521 16.963C20.5988 16.6114 21 15.9435 21 15.2184V7.78208C21 7.05701 20.5988 6.38904 19.9521 6.03744L12.9866 2.25049ZM12 7.00024C12.5448 7.00024 12.9865 7.44191 12.9865 7.98674C12.9864 8.00043 12.9863 8.00727 12.9861 8.01411C12.9859 8.02095 12.9856 8.02779 12.985 8.04146L12.7489 12.2918C12.6964 13.2364 11.3036 13.2364 11.2512 12.2918L11.015 8.04146C10.9848 7.49747 11.4013 7.03198 11.9453 7.00176L11.9726 7.00062L12 7.00024ZM13 15.0002C13 15.5525 12.5523 16.0002 12 16.0002C11.4477 16.0002 11 15.5525 11 15.0002C11 14.448 11.4477 14.0002 12 14.0002C12.5523 14.0002 13 14.448 13 15.0002Z"
                fill="currentColor"
            />
        </svg>
    )
}

export { AlertIcon }
