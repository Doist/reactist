import React from 'react'
import { shallow } from 'enzyme'

import Avatar from '../Avatar'

describe('Avatar', () => {
    it('renders a background image when avatarUrl is supplied', () => {
        const avatar = shallow(
            getAvatar({ avatarUrl: 'https://foo.bar/com.png' })
        )
        expect(avatar).toMatchSnapshot()
    })

    it('renders initials of user name when avatarUrl is not supplied', () => {
        const avatar = shallow(getAvatar())
        expect(avatar).toMatchSnapshot()
        expect(avatar.text()).toBe('HM')
    })

    it('renders initials on custom color', () => {
        const avatar = shallow(
            getAvatar({ colorList: ['red', 'green', '#0000FF'] })
        )
        expect(avatar).toMatchSnapshot()
        expect(avatar.text()).toBe('HM')
    })

    it('renders initials of user email when avatarUrl is not supplied', () => {
        const avatar = shallow(
            getAvatar({ user: { email: 'henning@doist.com' } })
        )
        expect(avatar).toMatchSnapshot()
        expect(avatar.text()).toBe('H')
    })

    it('falls back to size `l` when invalid value is supplied', () => {
        // eslint-disable-next-line
        console.error = jest.fn() // silence errors caused by faulty required prop
        const avatar = shallow(getAvatar({ size: 'medium' }))
        expect(avatar.hasClass('reactist_avatar_size--l')).toBe(true)
    })

    // Helpers ================================================================
    const getAvatar = props => (
        <Avatar
            user={{ name: 'Henning Mus', email: 'henning@doist.com' }}
            size="xl"
            {...props}
        />
    )
})
