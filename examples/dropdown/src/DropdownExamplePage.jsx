import React from 'react'

import { Dropdown } from '@doist/reactist'

class DropdownExamplePage extends React.Component {

    _renderSimpleDropdown() {
        return (
            <Dropdown.Box>
                    <Dropdown.Trigger>
                        <div>Trigger: Click to show dropdown</div>
                    </Dropdown.Trigger>
                    <Dropdown.Body>
                        <div>
                            <h2>Dropdown Content</h2>
                            <ul>
                                <li>You can add anything</li>
                                <li>you want to a dropdown</li>
                                <li>(e.g. lists and headings)</li>
                            </ul>
                        </div>
                    </Dropdown.Body>
                </Dropdown.Box>
        )
    }

    render() {
        return (
            <section>
                <div id='modal_box'></div>
                <h1>Dropdown Examples</h1>
                { this._renderSimpleDropdown() }
            </section>
        )
    }
}

export default DropdownExamplePage
