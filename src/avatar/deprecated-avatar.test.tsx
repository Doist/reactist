import * as React from 'react'

import { render, screen } from '@testing-library/react'

import { DeprecatedAvatar } from './index'

describe('DeprecatedAvatar', () => {
    it('keeps the legacy avatarUrl API under the deprecated export name', () => {
        render(
            <DeprecatedAvatar
                data-testid="avatar"
                user={{ name: 'Henning Mus', email: 'henning@doist.com' }}
                avatarUrl="https://example.com/avatar.png"
            />,
        )

        expect(screen.getByTestId('avatar')).toHaveStyle({
            backgroundImage: 'url(https://example.com/avatar.png)',
            textIndent: '-9999px',
        })
    })

    it('keeps the legacy initials and responsive size behavior', () => {
        render(
            <DeprecatedAvatar
                data-testid="avatar"
                user={{ email: 'henning@doist.com' }}
                size={{ mobile: 's', tablet: 'xxl', desktop: 'xl' }}
            />,
        )

        const avatar = screen.getByTestId('avatar')
        expect(avatar).toHaveTextContent('H')
        expect(avatar).toHaveClass('deprecated-size-s')
        expect(avatar).toHaveClass('tablet-deprecated-size-xxl')
        expect(avatar).toHaveClass('desktop-deprecated-size-xl')
    })
})
