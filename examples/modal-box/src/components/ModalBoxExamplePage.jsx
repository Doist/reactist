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
                <Modal.Body icon={<img src="http://lorempixel.com/60/60/abstract" />}>
                    The Body of a ModalBox can contain whatever you like! Like this very long Lorem Ipsum<br />
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Modal.Body>
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