import styles from './banner-icon.module.css'

import type { SystemBannerType } from '../banner/banner'

const bannerIconForType: Record<SystemBannerType, typeof BannerInfoIcon> = {
    info: BannerInfoIcon,
    upgrade: BannerUpgradeIcon,
    experiment: BannerExperimentIcon,
    warning: BannerWarningIcon,
    error: BannerErrorIcon,
    success: BannerSuccessIcon,
}

function BannerIcon({ type, ...props }: JSX.IntrinsicElements['svg'] & { type: SystemBannerType }) {
    const Icon = bannerIconForType[type]
    return Icon ? (
        <Icon {...props} data-testid={`banner-icon-${type}`} className={styles[type]} aria-hidden />
    ) : null
}

function BannerInfoIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M21 12.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-8-3.94a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-2.75 1.94a.75.75 0 0 0 0 1.5h1.25v3.5h-1.25a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5H13V11a.752.752 0 0 0-.75-.75h-2Z"
                clipRule="evenodd"
            />
        </svg>
    )
}

function BannerUpgradeIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.974 4.226a2.485 2.485 0 0 0-3.948 0 2.485 2.485 0 0 1-2.304.954A2.485 2.485 0 0 0 4.93 7.972a2.485 2.485 0 0 1-.954 2.304 2.485 2.485 0 0 0 0 3.948 2.485 2.485 0 0 1 .954 2.304 2.485 2.485 0 0 0 2.792 2.792 2.485 2.485 0 0 1 2.304.954 2.485 2.485 0 0 0 3.948 0 2.485 2.485 0 0 1 2.304-.954 2.485 2.485 0 0 0 2.792-2.792 2.485 2.485 0 0 1 .954-2.304 2.485 2.485 0 0 0 0-3.948 2.485 2.485 0 0 1-.954-2.304 2.485 2.485 0 0 0-2.792-2.792 2.485 2.485 0 0 1-2.304-.954ZM11.228 7.08c-.297-.581-1.177-.345-1.144.306l.125 2.437a.605.605 0 0 1-.635.635l-2.437-.125c-.651-.033-.887.847-.306 1.144l2.172 1.11c.32.163.428.567.233.868L7.91 15.503c-.355.548.289 1.192.837.837l2.047-1.326a.605.605 0 0 1 .868.233l1.11 2.172c.297.581 1.177.345 1.144-.306l-.125-2.437a.605.605 0 0 1 .635-.635l2.437.125c.651.033.887-.847.306-1.144l-2.172-1.11a.605.605 0 0 1-.233-.868l1.326-2.047c.355-.548-.289-1.192-.837-.837l-2.047 1.326a.605.605 0 0 1-.868-.233l-1.11-2.172Z"
                clipRule="evenodd"
            />
            <path
                fill="#fff"
                d="M10.084 7.387c-.033-.651.847-.887 1.144-.306l1.11 2.172c.163.32.567.428.868.233l2.047-1.326c.548-.355 1.192.289.837.837l-1.326 2.047a.605.605 0 0 0 .233.868l2.172 1.11c.581.297.345 1.177-.306 1.144l-2.437-.125a.605.605 0 0 0-.635.635l.125 2.437c.033.651-.847.887-1.144.306l-1.11-2.172a.605.605 0 0 0-.868-.233L8.747 16.34c-.548.355-1.192-.289-.837-.837l1.326-2.047a.605.605 0 0 0-.233-.868l-2.172-1.11c-.581-.297-.345-1.177.306-1.144l2.437.125a.605.605 0 0 0 .635-.635l-.125-2.437Z"
            />
        </svg>
    )
}

function BannerExperimentIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" fill="none" {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12 3.25a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm-3 4.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H14v4.333a2 2 0 0 0 .4 1.2l4.4 5.867a1 1 0 0 1-.8 1.6H6a1 1 0 0 1-.8-1.6l4.4-5.867a2 2 0 0 0 .4-1.2V8.25h-.5a.5.5 0 0 1-.5-.5Zm1.5-2.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm4.5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-4 3v4.333a3 3 0 0 1-.6 1.8l-.752 1.003c.11.078.245.16.403.226.41.173.985.253 1.682-.188.808-.51 1.547-.67 2.142-.674l-.275-.367a3 3 0 0 1-.6-1.8V8.25h-2Z"
                clipRule="evenodd"
            />
        </svg>
    )
}

function BannerWarningIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="m10.272 5.212-7.018 12.03a2 2 0 0 0 1.728 3.008h14.036a2 2 0 0 0 1.727-3.008l-7.018-12.03a2 2 0 0 0-3.455 0ZM13 16.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-.014-7.014A.987.987 0 0 0 12 8.75h-.027l-.028.002a.987.987 0 0 0-.93 1.04l.236 4.25c.053.944 1.445.944 1.498 0l.236-4.25.001-.028v-.028Z"
                clipRule="evenodd"
            />
        </svg>
    )
}

function BannerErrorIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M12.987 2.5a2.07 2.07 0 0 0-1.974 0L4.048 6.287A1.989 1.989 0 0 0 3 8.032v7.436c0 .725.401 1.393 1.048 1.745L11.013 21a2.07 2.07 0 0 0 1.974 0l6.965-3.787A1.989 1.989 0 0 0 21 15.468V8.032c0-.725-.401-1.393-1.048-1.745L12.987 2.5ZM12 7.25a.987.987 0 0 1 .986 1.014l-.001.027-.236 4.25c-.053.945-1.445.945-1.498 0l-.236-4.25a.987.987 0 0 1 .93-1.04h.028L12 7.25Zm1 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                clipRule="evenodd"
            />
        </svg>
    )
}

function BannerSuccessIcon(props: JSX.IntrinsicElements['svg']) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" {...props}>
            <path
                fill="currentColor"
                fillRule="evenodd"
                d="M21 12.25a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-5.555-2.99a.75.75 0 0 1 1.06 1.06l-5.303 5.303a.748.748 0 0 1-1.061 0L7.666 13.15a.75.75 0 1 1 1.06-1.06l1.945 1.944 4.774-4.773Z"
                clipRule="evenodd"
            />
        </svg>
    )
}

export { BannerIcon }
