import React from 'react'

import Dropdown from '../../src/components/dropdown'
import Button from '../../src/components/deprecated-button'

export default {
    title: 'Components/Dropdown',
    component: Dropdown,
    parameters: {
        badges: ['notAccessible'],
    },
}

// Story Definitions ==========================================================
export const DropdownStory = () => (
    <section className="story">
        <Dropdown.Box>
            <Dropdown.Trigger>
                <Button variant="primary">Trigger: Click to show dropdown</Button>
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
    </section>
)

export const InteractiveDropdownStory = () => (
    <section className="story">
        <Dropdown.Box allowBodyInteractions>
            <Dropdown.Trigger>
                <Button variant="primary">
                    Trigger: Click to show interactive dropdown (will not close when clicking on it)
                </Button>
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
    </section>
)
