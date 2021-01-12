import './styles/time_picker.less'

import React from 'react'
import ClockIcon from './icons/ClockIcon.svg'

import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs, { Dayjs } from 'dayjs'
import Select from './select'
import classNames from 'classnames'

dayjs.extend(CustomParseFormat)

const MINUTES_INTERVAL = 5

type Props = {
    minutesInterval?: number
    onTimeChanged?: (value: string) => void
    min?: string
    max?: string
    defaultValue?: string
    className?: string
    optionsClassName?: string
}

export default function TimePicker({
    minutesInterval,
    onTimeChanged,
    min,
    max,
    defaultValue,
    className,
    optionsClassName,
}: Props): JSX.Element {
    const times = [
        {
            value: '',
            text: '--:--',
        },
    ]
    const interval = minutesInterval ?? MINUTES_INTERVAL

    const minTime = breakUpTime(min)
    const maxTime = breakUpTime(max)

    let rollingDate: Dayjs = minTime ?? dayjs('00:00', 'HH:mm')
    const endDate = maxTime ?? dayjs().startOf('day').add(1, 'day')

    while (rollingDate < endDate) {
        const value = `${zeroPad(rollingDate.hour())}:${zeroPad(rollingDate.minute())}`
        times.push({
            value: value,
            text: value,
        })

        rollingDate = rollingDate.add(interval, 'minute')
    }

    return (
        <div className={classNames('time_picker', className)}>
            <ClockIcon />
            <Select
                onChange={onTimeChanged}
                value={defaultValue}
                options={times}
                data-testid="time-picker"
                optionsClassName={optionsClassName}
            />
        </div>
    )
}

function zeroPad(i: number): string {
    return `0${i}`.substr(-2)
}

function breakUpTime(value?: string): Dayjs | undefined {
    if (!value) return

    const time = dayjs(value, 'HH:mm')
    return time
}
