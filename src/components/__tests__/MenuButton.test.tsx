import React from 'react'
import { shallow } from 'enzyme'

import { MenuButton, MenuButtonItem } from '../MenuButton'

describe('MenuButton', () => {
    describe('without items', () => {
        it('renders without items', () => {
            const menuButton = shallow(<MenuButton name="Test Menu" />)
            expect(menuButton).toMatchSnapshot()
        })

        it('calls onClick callback when rendering without items', () => {
            const onClickSpy = jest.fn()
            const menuButton = shallow(
                <MenuButton name="Test Menu" onClick={onClickSpy} />
            )

            menuButton.simulate('click')
            expect(onClickSpy).toHaveBeenCalled()
        })
    })

    describe('with items', () => {
        it('renders with items', () => {
            const menuButton = shallow(
                <MenuButton name="Test Menu">
                    <MenuButtonItem>Item 1</MenuButtonItem>
                    <MenuButtonItem>Item 2</MenuButtonItem>
                </MenuButton>
            )
            expect(menuButton).toMatchSnapshot()
        })

        it('calls onClick callbacks of items', () => {
            const onClickSpy1 = jest.fn()
            const onClickSpy2 = jest.fn()
            const menuButton = shallow(
                <MenuButton name="Test Menu">
                    <MenuButtonItem onClick={onClickSpy1}>
                        Item 1
                    </MenuButtonItem>
                    <MenuButtonItem onClick={onClickSpy2}>
                        Item 2
                    </MenuButtonItem>
                </MenuButton>
            )

            menuButton.find('MenuButtonItem').get(0).props.onClick()
            expect(onClickSpy1).toHaveBeenCalledTimes(1)
            expect(onClickSpy2).toHaveBeenCalledTimes(0)
            menuButton.find('MenuButtonItem').get(1).props.onClick()
            expect(onClickSpy1).toHaveBeenCalledTimes(1)
            expect(onClickSpy2).toHaveBeenCalledTimes(1)
        })

        it('can use item without menu', () => {
            const onClickSpy = jest.fn()
            const item = shallow(
                <MenuButtonItem onClick={onClickSpy}>Item 1</MenuButtonItem>
            )

            item.simulate('click')
            expect(onClickSpy).toHaveBeenCalled()
            expect(item.text()).toBe('Item 1')
        })
    })
})
