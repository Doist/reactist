import './styles/input.less'

import React from 'react'
import classNames from 'classnames'

type InputProps = {
    /** Additional css class applied to the input. */
    className?: string
}

type Props = InputProps & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.ForwardRefExoticComponent<Props> = React.forwardRef(
    (props: Props, ref: React.Ref<HTMLInputElement>) => {
        const className = classNames('reactist_input', props.className)
        return <input {...props} className={className} ref={ref} />
    }
)
Input.displayName = 'Input'

export default Input
