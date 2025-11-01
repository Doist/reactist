import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import classNames from 'classnames'

import './input.less'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

/**
 * @deprecated
 */
const Input = forwardRef<HTMLInputElement, Props>(function Input(props, ref) {
    const className = classNames('reactist_input', props.className)
    return <input {...props} className={className} ref={ref} />
})
Input.displayName = 'Input'

export { Input }
