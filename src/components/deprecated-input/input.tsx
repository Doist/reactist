import * as React from 'react'
import classNames from 'classnames'

import './input.less'

type InputProps = {
    /** Additional css class applied to the input. */
    className?: string
    ref?: React.Ref<HTMLInputElement>
}

type Props = InputProps & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<React.PropsWithRef<Props>> = React.forwardRef(
    (props: Props, ref: React.Ref<HTMLInputElement>) => {
        const className = classNames('reactist_input', props.className)
        return <input {...props} className={className} ref={ref} />
    },
)
Input.displayName = 'Input'

export { Input }
