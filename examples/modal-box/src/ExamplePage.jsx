import React from 'react';
import ReactDOM from 'react-dom';

import SimpleModalBox from './SimpleModalBox';

class ExamplePage extends React.Component {
    componentDidMount() {
        ReactDOM.render(<SimpleModalBox />, document.getElementById('modal_box'));
    }

    render() {
        return (
            <div>
                <div id='modal_box'></div>
            </div>
        );
    }
}

export default ExamplePage;