import * as React from 'react'
import classNames from 'classnames'

import './input.less'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

/**
 * @deprecated
 */
const Input = React.forwardRef<HTMLInputElement, Props>(function Input(props, ref) {
    const className = classNames('reactist_input', props.className)
    return <input {...props} className={className} ref={ref} />
})
Input.displayName = 'Input'

export { Input }
