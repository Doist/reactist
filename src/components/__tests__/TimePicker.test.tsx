import TimePicker from '../TimePicker'
import React from 'react'
import { render, screen } from '@testing-library/react'

describe('TimePicker', () => {
    const timePickerTestId = 'time-picker'

    describe('no min/max entered', () => {
        it('displays the correct time ranges with default time span', () => {
            render(<TimePicker />)

            const select = screen.getByTestId(timePickerTestId) as HTMLSelectElement

            expect(select).toBeInTheDocument()

            const options = extractOptions(select.options)

            expect(options).toHaveLength(289)
            expect(options[0].text).toEqual('--:--')
            expect(options[0].value).toEqual('')
        })

        it('displays the correct time ranges with 5 minute intervals', () => {
            render(<TimePicker minutesInterval={5} />)

            const select = screen.getByTestId(timePickerTestId) as HTMLSelectElement

            expect(select).toBeInTheDocument()

            const options = extractOptions(select.options)

            expect(options).toHaveLength(289)
            expect(options[1].value).toEqual('00:00')
            expect(options[2].value).toEqual('00:05')
        })

        it('displays the correct time ranges with 30 minute intervals', () => {
            render(<TimePicker minutesInterval={30} />)
            const select = screen.getByTestId(timePickerTestId) as HTMLSelectElement

            expect(select).toBeInTheDocument()

            const options = extractOptions(select.options)

            expect(options).toHaveLength(49)
            expect(options[1].value).toEqual('00:00')
            expect(options[2].value).toEqual('00:30')
        })

        it('displays the correct time ranges with 29 minute intervals', () => {
            render(<TimePicker minutesInterval={29} />)

            const select = screen.getByTestId(timePickerTestId) as HTMLSelectElement

            expect(select).toBeInTheDocument()

            const options = extractOptions(select.options)

            expect(options).toHaveLength(51)
            expect(options[1].value).toEqual('00:00')
            expect(options[2].value).toEqual('00:29')
            expect(options[3].value).toEqual('00:58')
            expect(options[4].value).toEqual('01:27')
        })
    })

    describe('min time entered', () => {
        it('displays the correct time ranges with 5 minute intervals', () => {
            render(<TimePicker minutesInterval={5} min="13:00" />)

            const select = screen.getByTestId(timePickerTestId) as HTMLSelectElement

            expect(select).toBeInTheDocument()

            const options = extractOptions(select.options)

            expect(options).toHaveLength(133)
            expect(options[1].value).toEqual('13:00')
            expect(options[2].value).toEqual('13:05')
        })

        it('displays the correct time ranges with 30 minute intervals', () => {
            render(<TimePicker minutesInterval={30} min="13:00" />)

            const select = screen.getByTestId(timePickerTestId) as HTMLSelectElement

            expect(select).toBeInTheDocument()

            const options = extractOptions(select.options)

            expect(options).toHaveLength(23)
            expect(options[1].value).toEqual('13:00')
            expect(options[2].value).toEqual('13:30')
        })
    })

    describe('max time entered', () => {
        it('displays the correct time ranges with 5 minute intervals', () => {
            render(<TimePicker minutesInterval={5} max="13:31" />)

            const select = screen.getByTestId(timePickerTestId) as HTMLSelectElement

            expect(select).toBeInTheDocument()

            const options = extractOptions(select.options)

            expect(options).toHaveLength(164)
            expect(options[1].value).toEqual('00:00')
            expect(options.slice(-1)[0].value).toEqual('13:30')
        })

        it('displays the correct time ranges with 30 minute intervals', () => {
            render(<TimePicker minutesInterval={30} max="13:31" />)

            const select = screen.getByTestId(timePickerTestId) as HTMLSelectElement

            expect(select).toBeInTheDocument()

            const options = extractOptions(select.options)

            expect(options).toHaveLength(29)
            expect(options[1].value).toEqual('00:00')
            expect(options.slice(-1)[0].value).toEqual('13:30')
        })

        it('displays the correct time ranges with 29 minute intervals', () => {
            render(<TimePicker minutesInterval={29} max="13:31" />)

            const select = screen.getByTestId(timePickerTestId) as HTMLSelectElement

            expect(select).toBeInTheDocument()

            const options = extractOptions(select.options)

            expect(options).toHaveLength(29)
            expect(options[1].value).toEqual('00:00')
            expect(options.slice(-1)[0].value).toEqual('13:03')
        })
    })

    function extractOptions(options: HTMLOptionsCollection): HTMLOptionElement[] {
        const result: HTMLOptionElement[] = []

        for (let i = 0; i < options.length; i++) {
            result.push(options[i])
        }

        return result
    }
})
