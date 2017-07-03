import React from 'react'

import { Dropdown } from '@doist/reactist'

class DropdownExamplePage extends React.Component {

    _renderSimpleDropdown() {
        return (
            <Dropdown.Box>
                <Dropdown.Trigger>
                    Trigger: Click to show dropdown
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

    _renderInteractiveBodyDropdown() {
        return (
            <Dropdown.Box allowBodyInteractions>
                <Dropdown.Trigger>
                    Trigger: Click to show interactive dropdown (won't close when clicking on it)
                </Dropdown.Trigger>
                <Dropdown.Body>
                    <div>
                        <h1>Wow this is interactive</h1>
                        <ul>
                            <li>Click outside</li>
                            <li>to close this</li>
                        </ul>
                    </div>
                </Dropdown.Body>
            </Dropdown.Box>
        )
    }

    render() {
        return (
            <section>
                <h1>Dropdown Examples</h1>
                <div className='dropdown-example'>
                    { this._renderSimpleDropdown() }
                </div>
                <div className='dropdown-example'>
                    { this._renderInteractiveBodyDropdown() }
                </div>
            </section>
        )
    }
}

export default DropdownExamplePage
