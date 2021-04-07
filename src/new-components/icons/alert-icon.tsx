import * as React from 'react'
import { AlertTone } from '../common-types'

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
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-1a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1.18-11.84a.84.84 0 1 1-1.68 0 .84.84 0 0 1 1.68 0zM12.5 10a.5.5 0 0 1 .5.5V15h1a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h1v-4h-1a.5.5 0 0 1 0-1h1.5z"
                fill="currentColor"
            />
        </svg>
    )
}

function AlertPositiveIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-1a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-4.354-8.104a.5.5 0 0 1 .708 0l2.146 2.147 5.146-5.147a.5.5 0 0 1 .708.708l-5.5 5.5a.5.5 0 0 1-.708 0l-2.5-2.5a.5.5 0 0 1 0-.708z"
                fill="currentColor"
            />
        </svg>
    )
}

function AlertCautionIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m3.254 16.992 7.018-12.03a2 2 0 0 1 3.455 0l7.018 12.03A2 2 0 0 1 19.018 20H4.982a2 2 0 0 1-1.728-3.008zm8.242-11.887a1 1 0 0 0-.36.36l-7.018 12.03A1 1 0 0 0 4.982 19h14.036a1 1 0 0 0 .864-1.504l-7.018-12.03a1 1 0 0 0-1.368-.36zM13 16.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-.014-7.014a.987.987 0 1 0-1.971.055l.236 4.25c.053.945 1.445.945 1.498 0l.236-4.25.001-.027v-.028z"
                fill="currentColor"
            />
        </svg>
    )
}

function AlertCriticalIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM2.5 12a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0zM13 15.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-.014-7.014A.987.987 0 0 0 12 7.5h-.027l-.028.002a.987.987 0 0 0-.93 1.04l.236 4.25c.053.944 1.445.944 1.498 0l.236-4.25.001-.028v-.027z"
                fill="currentColor"
            />
        </svg>
    )
}

export { AlertIcon }
