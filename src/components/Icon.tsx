import './styles/icon.less'

import React from 'react'
import classNames from 'classnames'

import { Tooltip } from './Tooltip'
import ThreeDotsIcon from './icons/ThreeDotsIcon.svg'

type Props = {
    /** Callback that is called when icon is clicked. */
    onClick?: () => void
    /** Whether hte icon is disabled. Disabled icons can't be clicked and displayed with less opacity. */
    disabled?: boolean
    /** Additional css class that is applied to the icon */
    className?: string
    /** URL to the image that should be displayed as icon. */
    image?: string
    /** Optional URL to the image that should be displayed when the icon is hovered. */
    hoveredImage?: string
    /** Icon component to render, defaults to three dots. */
    icon?: React.ReactNode
    /** Text of the tooltip of the icon. */
    tooltip?: React.ReactNode
}

type State = {
    hovered: boolean
}

class Icon extends React.Component<Props, State> {
    public static displayName: string
    public static defaultProps: Props

    constructor(props: Props, context: unknown) {
        super(props, context)

        this.state = { hovered: false }
    }

    _onClick = (event: React.MouseEvent) => {
        event.preventDefault()

        if (this.props.onClick && !this.props.disabled) {
            this.props.onClick()
        }
    }

    _hover = () => {
        this.setState(() => ({ hovered: true }))
    }
    _unhover = () => {
        this.setState(() => ({ hovered: false }))
    }

    render() {
        const { image, hoveredImage, icon, tooltip, disabled } = this.props
        const className = classNames(
            'reactist_icon',
            {
                'reactist_icon--component': !image,
                disabled,
            },
            this.props.className,
        )

        const style: React.CSSProperties | undefined =
            typeof image === 'string'
                ? this.state.hovered && hoveredImage
                    ? { backgroundImage: `url(${hoveredImage})` }
                    : { backgroundImage: `url(${image})` }
                : undefined // only apply style for image components
        const iconComponent =
            !image &&
            (icon ? icon : <ThreeDotsIcon color={this.state.hovered ? '#474747' : undefined} />) // only set icon component for non-image components

        const component = (
            /* eslint-disable jsx-a11y/anchor-is-valid */
            <a
                href="#"
                style={style}
                onClick={this._onClick}
                className={className}
                onMouseEnter={this._hover}
                onMouseLeave={this._unhover}
            >
                {iconComponent && iconComponent}
            </a>
            /* eslint-enable jsx-a11y/anchor-is-valid */
        )
        return tooltip ? <Tooltip content={tooltip}>{component}</Tooltip> : component
    }
}
Icon.displayName = 'Icon'
Icon.defaultProps = {
    disabled: false,
}

export default Icon
