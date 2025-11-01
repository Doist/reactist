import './input.less'

import { forwardRef } from 'react'

import classNames from 'classnames'

import type { InputHTMLAttributes } from 'react'

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
