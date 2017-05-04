import React from 'react';
import ReactDOM from 'react-dom';

import { ModalBox, Header, Body, Actions, Button } from 'reactist';

class ModalBoxExamplePage extends React.Component {

    _renderHeaderModalBox() {
        this._renderModalBox((
            <ModalBox>
                <Header>Header of ModalBox</Header>
            </ModalBox>
        ));
    }

    _renderHeaderContentModalBox() {
        this._renderModalBox((
            <ModalBox>
                <Header>Header of ModalBox</Header>
                <Body>The Body of a ModalBox can contain whatever you like!</Body>
            </ModalBox>
        ));
    }
    
    _renderFullModalBox() {
        this._renderModalBox((
            <ModalBox>
            <Header>Header of ModalBox</Header>
                <Body>The Body of a ModalBox can contain whatever you like!</Body>
                <Actions>
                    <Button name="Action 1" />
                    <Button white name="Action 2" />
                </Actions>
            </ModalBox>
        ));
    }

    _renderModalBox(modalBox) {
        ReactDOM.render(modalBox, document.getElementById('modal_box'));
    }
    

    render() {
        return (
            <section>
                <div id='modal_box'></div>
                <h1>ModalBox Examples</h1>
                <Button name='Click me to launch a ModalBox with Header' 
                        onClick={() => this._renderHeaderModalBox()} />
                <Button name='Click me to launch a ModalBox with Header and Content'
                        onClick={() => this._renderHeaderContentModalBox()} />
                <Button name='Click me to launch a ModalBox with Header, Content and Actions'
                        onClick={() => this._renderFullModalBox()} />
            </section>
        );
    }
};

export default ModalBoxExamplePage;