import { render, screen } from '@testing-library/react'

import { Prose } from './prose'

describe('Prose', () => {
    it('renders its children as its content', () => {
        render(
            <Prose data-testid="container" darkModeTypography={false}>
                <h1>Hello world</h1>
                <p>This is a paragraph rendered with React elements.</p>
            </Prose>,
        )
        expect(screen.getByTestId('container').innerHTML).toMatchInlineSnapshot(
            `"<h1>Hello world</h1><p>This is a paragraph rendered with React elements.</p>"`,
        )
    })

    it('renders raw HTML as its content via dangerouslySetInnerHTML', () => {
        render(
            <Prose
                data-testid="container"
                darkModeTypography={false}
                dangerouslySetInnerHTML={{
                    __html: '<h1>Hello world</h1><p>This is a paragraph in raw HTML.</p>',
                }}
            />,
        )
        expect(screen.getByTestId('container').innerHTML).toMatchInlineSnapshot(
            `"<h1>Hello world</h1><p>This is a paragraph in raw HTML.</p>"`,
        )
    })

    it('does not acknowledge the className prop, but exceptionallySetClassName instead', () => {
        render(
            <Prose
                data-testid="container"
                darkModeTypography={false}
                // @ts-expect-error
                className="wrong"
                exceptionallySetClassName="right"
            >
                <h1>Hello world</h1>
                <p>This is a paragraph.</p>
            </Prose>,
        )
        expect(screen.getByTestId('container')).toHaveClass('right')
        expect(screen.getByTestId('container')).not.toHaveClass('wrong')
    })

    it('does not render with dark-mode typography customizations when darkModeTypography={false}', () => {
        render(
            <Prose data-testid="container" darkModeTypography={false}>
                <h1>Hello world</h1>
                <p>This is a paragraph.</p>
            </Prose>,
        )
        expect(screen.getByTestId('container')).toHaveClass('prose')
        expect(screen.getByTestId('container')).not.toHaveClass('darkModeTypography')
    })

    it('renders with dark-mode typography customizations when darkModeTypography={true}', () => {
        render(
            <Prose data-testid="container" darkModeTypography={true}>
                <h1>Hello world</h1>
                <p>This is a paragraph.</p>
            </Prose>,
        )
        expect(screen.getByTestId('container')).toHaveClass('prose')
        expect(screen.getByTestId('container')).toHaveClass('darkModeTypography')
    })
})
