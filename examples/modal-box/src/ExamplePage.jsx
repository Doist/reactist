import React from 'react';

import ButtonExamplePage from './components/ButtonExamplePage';
import ModalBoxExamplePage from './components/ModalBoxExamplePage';

class ExamplePage extends React.Component {
    render() {
        return (
            <div>
                <ButtonExamplePage />
                <ModalBoxExamplePage />
            </div>
        );
    }
}
export default ExamplePage;