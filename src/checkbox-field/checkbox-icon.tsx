import type { SVGProps } from 'react'

const svgPath = {
    checked:
        'M18 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12zm-2.457 4.293l-5.293 5.293-1.793-1.793a1 1 0 1 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l6-6a1 1 0 1 0-1.414-1.414z',
    unchecked:
        'M18 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12zm0 1H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z',
    mixed: 'M18 4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12zm-2 7H8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2z',
    filled: 'M6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4Z',
} as const

type Props = SVGProps<SVGSVGElement> & {
    checked?: boolean
    indeterminate?: boolean
    disabled?: boolean
}

function getPathKey({ checked, indeterminate, disabled }: Props): keyof typeof svgPath {
    if (indeterminate) {
        return 'mixed' // indeterminate, when true, overrides the checked state
    }

    if (checked) {
        return 'checked'
    }

    // We only used 'filled' when unchecked AND disabled, because the default unchecked icon
    // is not enough to convey the disabled state with opacity alone. For all other cases
    // above, when disabled, we use the same icon the corresponds to that state, and the
    // opacity conveys the fact that the checkbox is disabled.
    // See https://twist.com/a/1585/ch/414345/t/2257308/c/65201390
    if (disabled) {
        return 'filled'
    }

    return 'unchecked'
}

function CheckboxIcon({ checked, indeterminate, disabled, ...props }: Props) {
    const pathKey = getPathKey({ checked, indeterminate, disabled })
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            {...props}
        >
            <path fill="currentColor" fillRule="nonzero" d={svgPath[pathKey]} />
        </svg>
    )
}

export { CheckboxIcon }
