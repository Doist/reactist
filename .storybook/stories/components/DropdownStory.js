import React from 'react'

import { storiesOf } from '@storybook/react'

import { getPropTypesStory, optionsSourceOnly } from '../utils/StoryUtils'

import Dropdown from '../../../src/components/Dropdown'
import Button from '../../../src/components/Button'


// Story Definitions ==========================================================
const DropdownStory = () => (
    <section className='story'>
        <Dropdown.Box>
            <Dropdown.Trigger>
                <Button name='Trigger: Click to show dropdown' />
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
const DropdownChapter = {
    subtitle: 'Normal Dropdown',
    sections: [{ sectionFn: DropdownStory, options: optionsSourceOnly }]
}

const InteractiveDropdownStory = () => (
    <section className='story'>
        <Dropdown.Box allowBodyInteractions>
            <Dropdown.Trigger>
                <Button name='Trigger: Click to show interactive dropdown (will not close when clicking on it)' />
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
const InteractiveDropdownChapter = {
    subtitle: 'Interactive Dropdown',
    sections: [{ sectionFn: InteractiveDropdownStory, options: optionsSourceOnly }]
}

// Story setup ================================================================
const dropdown_story = () =>
storiesOf('Dropdown', module)
    .addWithChapters('Component Overview', {
        chapters: [
            DropdownChapter,
            InteractiveDropdownChapter
        ]
    })

export default dropdown_story
