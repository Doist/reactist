import React from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button } from 'reactist';

class ModalBoxExamplePage extends React.Component {

    _renderHeaderModalBox() {
        this._renderModalBox((
            <Modal.Box>
                <Modal.Header>Header of ModalBox</Modal.Header>
            </Modal.Box>
        ));
    }

    _renderHeaderContentModalBox() {
        this._renderModalBox((
            <Modal.Box>
                <Modal.Header title="Header of ModalBox" subtitle="This is a smaller description" />
                <Modal.Body>The Body of a ModalBox can contain whatever you like!</Modal.Body>
            </Modal.Box>
        ));
    }
    
    _renderFullModalBox() {
        this._renderModalBox((
            <Modal.Box>
                <Modal.Header title="Header of ModalBox" subtitle="This is a smaller description" />
                <Modal.Body>The Body of a ModalBox can contain whatever you like!</Modal.Body>
                <Modal.Actions>
                    <Button name="Action 1 - Closes the Modal" close />
                    <Button white name="Action 2" />
                </Modal.Actions>
            </Modal.Box>
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