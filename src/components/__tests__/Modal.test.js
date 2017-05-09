jest.mock('react-dom');

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Modal from '../Modal';
import Button from '../Button'; // for more descriptive snapshots

describe('Modal.Box', () => {
    it('renders without crashing', () => {
        const box = shallow(<Modal.Box />);
        expect(toJson(box)).toMatchSnapshot();
    });

    it('renders all children without crashing', () => {
        const box = shallow(<Modal.Box>
            <Modal.Header>Realistic test</Modal.Header>
            <Modal.Body>... is very realistic</Modal.Body>
            <Modal.Actions>
                <Button name='Wow' />
                <Button name='So real' />
            </Modal.Actions>
        </Modal.Box>);
        expect(toJson(box)).toMatchSnapshot();
    });

    it('adds overlay-active class after a short timeout', () => {
        jest.useFakeTimers();
        const containsMock = jest.fn().mockReturnValue(false);
        const mockOverlay = { 
            className: 'reactist_overlay', 
            classList: { contains: containsMock } 
        };
        const box = mount(<Modal.Box />).instance();

        ReactDOM.findDOMNode.mockReturnValueOnce(mockOverlay);
        box.componentDidMount();
        jest.runAllTimers();

        expect(containsMock).toHaveBeenCalled();
        expect(mockOverlay.className).toBe('reactist_overlay reactist_overlay--active');
    });

    it('does not add overlay-active when already added', () => {
        jest.useFakeTimers();
        const containsMock = jest.fn().mockReturnValue(true);
        const mockOverlay = { 
            className: 'reactist_overlay reactist_overlay--active', 
            classList: { contains: containsMock } 
        };
        const box = mount(<Modal.Box />).instance();

        ReactDOM.findDOMNode.mockReturnValueOnce(mockOverlay);
        box.componentDidMount();
        jest.runAllTimers();

        expect(containsMock).toHaveBeenCalled();
        expect(mockOverlay.className).toBe('reactist_overlay reactist_overlay--active');
    });

    it('adds additionally supplied className prop', () => {
        const box = shallow(<Modal.Box className='applied-to-child-of-box' />);
        expect(toJson(box)).toMatchSnapshot(box);
    });
});

describe('Modal.Header', () => {
    it('renders without crashing', () => {
        const header = shallow(<Modal.Header />);
        expect(toJson(header)).toMatchSnapshot();
    });

    it('renders title and subtitle if available', () => {
        const headerTitle = shallow(<Modal.Header title='Modal Title' />);
        expect(toJson(headerTitle)).toMatchSnapshot();

        const headerSubtitle = shallow(<Modal.Header subtitle='Modal Subtitle' />);
        expect(toJson(headerSubtitle)).toMatchSnapshot();
    });

    it('renders all children without crashing', () => {
        const textHeader = shallow(<Modal.Header>
            Just a Text Header
        </Modal.Header>);
        expect(toJson(textHeader)).toMatchSnapshot();

        const complexHeader = shallow(<Modal.Header>
            <Button name='Wow this looks complex' />
            Some additional text as well
        </Modal.Header>);
        expect(toJson(complexHeader)).toMatchSnapshot();
    });

    it('clicking the close icon unmounts the modal_box', () => {
        const header = shallow(<Modal.Header />);

        const unmountCallCount = getCallCount(ReactDOM.unmountComponentAtNode);
        header.find('.close').simulate('click', { preventDefault: jest.fn() });
        expect(getCallCount(ReactDOM.unmountComponentAtNode)).toBe(unmountCallCount + 1);
    });
});

describe('Modal.Body', () => {
    it('renders without crashing', () => {
        const body = shallow(<Modal.Body />);
        expect(toJson(body)).toMatchSnapshot();
    });

    it('renders all children without crashing', () => {
        const body = shallow(<Modal.Body>
            <div><h1>This is a body</h1></div>
            <Button name='Button in Body' />
        </Modal.Body>);
        expect(toJson(body)).toMatchSnapshot();
    });

    it('renders an icon when supplied via props', () => {
        const body = shallow(<Modal.Body icon={ <img src='awesome/image.png' /> } />);
        expect(toJson(body)).toMatchSnapshot();
    });

    it('clicking the close icon unmounts the modal_box', () => {
        const body = shallow(<Modal.Body showCloseIcon />);

        const unmountCallCount = getCallCount(ReactDOM.unmountComponentAtNode);
        body.find('.close').simulate('click', { preventDefault: jest.fn() });
        expect(getCallCount(ReactDOM.unmountComponentAtNode)).toBe(unmountCallCount + 1); 
    });

    it('adds additionally supplied className prop', () => {
        const body = shallow(<Modal.Body className='applied-to-modal-body' />);
        expect(toJson(body)).toMatchSnapshot();
    });
});

describe('Modal.Actions', () => {
    it('renders without crashing', () => {
        const actions = shallow(<Modal.Actions />);
        expect(toJson(actions)).toMatchSnapshot();
    });

    it('renders all children without crashing', () => {
        const actions = shallow(<Modal.Actions>
            <Button name="Action 1" />
            <Button name="Action 2" />
        </Modal.Actions>);
        expect(toJson(actions)).toMatchSnapshot();
    });

    it('unmounts modal_box when child with close prop is clicked', () => {
        const clickSpy = jest.fn();
        const actions = shallow(<Modal.Actions>
            <Button name="Action 1" close onClick={ clickSpy } />
            <Button name="Action 2" />
        </Modal.Actions>);
        
        const unmountCallCount = getCallCount(ReactDOM.unmountComponentAtNode);
        actions.find('Button').first().simulate('click');
        expect(clickSpy).toHaveBeenCalled();
        expect(getCallCount(ReactDOM.unmountComponentAtNode)).toBe(unmountCallCount + 1);
    });

    it('unmounts modal_box when child with close prop is clicked even when no onClick is specified', () => {
        const actions = shallow(<Modal.Actions>
            <Button name="Action 1" close />
        </Modal.Actions>);

        const unmountCallCount = getCallCount(ReactDOM.unmountComponentAtNode);
        actions.find('Button').first().simulate('click');
        expect(getCallCount(ReactDOM.unmountComponentAtNode)).toBe(unmountCallCount + 1);
    });
});

// Helper functions ///////////////////////////////////////////////////////////
function getCallCount(mock) {
    return mock.mock.calls.length;
}