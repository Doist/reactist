import React from 'react'
import { shallow } from 'enzyme'

import Icon from '../Icon'
import CloseIcon from '../icons/CloseIcon.svg'

describe('Icon', () => {
    const image = 'https://fake.image.com/foo.png'
    const imageHovered = 'https://fake.image.com/foo_hovered.png'

    it('renders icon component when supplied and no image is supplied', () => {
        const icon = shallow(<Icon icon={<CloseIcon />} />)
        expect(icon).toMatchSnapshot()
    })

    it('renders default icon (three dots) when neither image nor component is supplied', () => {
        const icon = shallow(<Icon />)
        expect(icon).toMatchSnapshot()
    })

    it('renders darker default icon (three dots) when neither image nor component is supplied and is hovered', () => {
        const icon = shallow(<Icon />)
        icon.simulate('mouseEnter')
        expect(icon).toMatchSnapshot()
        expect(icon.find('ThreeDotsIcon').props().color).toBe('#474747')
    })

    it('renders image when unhovered and hoveredImage is supplied', () => {
        const icon = shallow(<Icon image={image} hoveredImage={imageHovered} />)
        expect(icon.props().style.backgroundImage).toBe(`url(${image})`)
    })

    it('renders image when hovered but no hoveredImage is supplied', () => {
        const icon = shallow(<Icon image={image} />)
        icon.simulate('mouseEnter')
        expect(icon.props().style.backgroundImage).toBe(`url(${image})`)
    })

    it('renders hoveredImage when supplied and hovered', () => {
        const icon = shallow(<Icon image={image} hoveredImage={imageHovered} />)
        icon.simulate('mouseEnter')
        expect(icon.props().style.backgroundImage).toBe(`url(${imageHovered})`)
    })

    it('switches back to image after unhovering', () => {
        const icon = shallow(<Icon image={image} hoveredImage={imageHovered} />)

        icon.simulate('mouseEnter')
        expect(icon.props().style.backgroundImage).toBe(`url(${imageHovered})`)

        icon.simulate('mouseLeave')
        expect(icon.props().style.backgroundImage).toBe(`url(${image})`)
    })

    it('calls onClick callback when not disabled', () => {
        const onClickSpy = jest.fn()
        const icon = shallow(<Icon onClick={onClickSpy} />)

        icon.simulate('click', { preventDefault: jest.fn() })
        expect(onClickSpy).toHaveBeenCalled()
    })

    it('does not call onClick callback when disabled', () => {
        const onClickSpy = jest.fn()
        const icon = shallow(<Icon onClick={onClickSpy} disabled />)

        icon.simulate('click', { preventDefault: jest.fn() })
        expect(onClickSpy).not.toHaveBeenCalled()
    })

    it('wraps icon in a tooltip when tooltip is supplied', () => {
        const icon = shallow(<Icon tooltip="Tooltip text" />)
        expect(icon).toMatchSnapshot()
    })

    it('applies additionally provided class name', () => {
        const icon = shallow(<Icon className="additional class" />)
        expect(icon.hasClass('additional')).toBe(true)
        expect(icon.hasClass('class')).toBe(true)
    })

    // Helpers ================================================================
    // const getIcon = (props) => (
    //     <Icon

    //         { ...props }
    //     />
    // )
})
