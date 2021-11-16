import React from 'react'
import { shallow } from 'enzyme'

import { Avatar } from './avatar'

describe('Avatar', () => {
    it('renders a background image when avatarUrl is supplied', () => {
        const avatar = shallow(getAvatar({ avatarUrl: 'https://foo.bar/com.png' }))
        expect(avatar).toMatchSnapshot()
    })

    it('renders initials of user name when avatarUrl is not supplied', () => {
        const avatar = shallow(getAvatar())
        expect(avatar).toMatchSnapshot()
        expect(avatar.text()).toBe('HM')
    })

    it('renders initials on custom color', () => {
        const avatar = shallow(getAvatar({ colorList: ['red', 'green', '#0000FF'] }))
        expect(avatar).toMatchSnapshot()
        expect(avatar.text()).toBe('HM')
    })

    it('renders initials of user email when avatarUrl is not supplied', () => {
        const avatar = shallow(getAvatar({ user: { email: 'henning@doist.com' } }))
        expect(avatar).toMatchSnapshot()
        expect(avatar.text()).toBe('H')
    })

    it('supports responsive values', () => {
        const avatar = shallow(
            getAvatar({
                size: {
                    mobile: 's',
                    desktop: 'xl',
                    tablet: 'xxl',
                },
            }),
        )
        expect(avatar.hasClass('size-s')).toBe(true)
        expect(avatar.hasClass('desktop-size-xl')).toBe(true)
        expect(avatar.hasClass('tablet-size-xxl')).toBe(true)
    })

    // Helpers ================================================================
    const getAvatar = (
        props?: Omit<React.ComponentProps<typeof Avatar>, 'user'> & {
            user?: { name?: string; email: string }
        },
    ) => <Avatar user={{ name: 'Henning Mus', email: 'henning@doist.com' }} size="xl" {...props} />
})
