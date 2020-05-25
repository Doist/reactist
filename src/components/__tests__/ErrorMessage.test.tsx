import React from 'react'
import { shallow } from 'enzyme'

import ErrorMessage, { State } from '../ErrorMessage'

describe('ErrorMessage', () => {
    it('renders nothing if message is not set', () => {
        const errorMessage = shallow(getErrorMessage())
        expect(errorMessage).toMatchSnapshot()
    })

    it('renders nothing if message is empty', () => {
        const errorMessage = shallow(getErrorMessage({ message: '' }))
        expect(errorMessage).toMatchSnapshot()
    })

    it('renders the given message', () => {
        const errorMessage = shallow(getErrorMessage({ message: 'Oh noes' }))
        expect(errorMessage).toMatchSnapshot()
    })

    it('renders error message after receiving props', () => {
        const errorMessage = shallow(
            getErrorMessage({ message: 'first message' })
        )

        errorMessage.setProps({ message: 'second message' })
        expect(errorMessage).toMatchSnapshot()
    })

    it('renders nothing after receiving an empty new message', () => {
        const errorMessage = shallow(
            getErrorMessage({ message: 'first message' })
        )

        errorMessage.setProps({ message: '' })
        expect(errorMessage).toMatchSnapshot()
    })

    it('hides after reaching timeout', () => {
        jest.useFakeTimers()
        const errorMessage = shallow(getErrorMessage({ message: 'Oh noes' }))

        expect((errorMessage.state() as State).visible).toBe(true)
        jest.runAllTimers()
        expect((errorMessage.state() as State).visible).toBe(false)
    })

    it('calls onHide callback when hiding', () => {
        jest.useFakeTimers()
        const onHideSpy = jest.fn()
        shallow(getErrorMessage({ message: 'Oh noes', onHide: onHideSpy }))

        jest.runAllTimers()
        expect(onHideSpy).toHaveBeenCalled()
    })

    // Helpers ================================================================
    const getErrorMessage = (props = undefined) => <ErrorMessage {...props} />
})
