import React from 'react'
import ReactDOM from 'react-dom'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsSourceOnly, optionsNoSourceNoProps } from '../utils/StoryUtils'

import Modal from '../../../src/components/Modal'
import Button from '../../../src/components/Button'
import { howToText, modalBoxText, modalHeaderText, modalBodyText, modalActionsText } from './ModalStory.md'

// Helper =====================================================================
const renderModal = (modal) => {
    ReactDOM.render(modal, document.getElementById('modal_box'))
}
const getStory = (text, modal) => (
    <section className='story'>
        <div id='modal_box' />
        <Button
            name={ text }
            onClick={ () => renderModal(modal) }
        />
    </section>
)


// Story Definitions ==========================================================
const ModalDocumentationChapters = [
    { subtitle: 'How to use', info: howToText },
    { subtitle: 'Modal Box', info: modalBoxText },
    { subtitle: 'Modal Header', info: modalHeaderText },
    { subtitle: 'Modal Body', info: modalBodyText },
    { subtitle: 'Modal Actions', info: modalActionsText }
]

const ModalHeaderOnlyStory = () => {
    const modal = (
        <Modal.Box>
            <Modal.Header title='Header of Modal' />
        </Modal.Box>
    )
    return getStory('Click me to launch a Modal with Header', modal)
}
const ModalHeaderOnlyChapter = {
    subtitle: 'Header Only',
    sections: [{ sectionFn: ModalHeaderOnlyStory, options: optionsNoSourceNoProps }]
}

const ModalHeaderAndBodyStory = () => {
    const modal = (
        <Modal.Box>
            <Modal.Header title='Header of Modal' subtitle='This is a smaller description' />
            <Modal.Body>The Body of a Modal can contain whatever you like!</Modal.Body>
        </Modal.Box>
    )
    return getStory('Click me to launch a Modal with Header and Body', modal)
}
const ModalHeaderAndBodyChapter = {
    subtitle: 'Header and Body',
    sections: [{ sectionFn: ModalHeaderAndBodyStory, options: optionsNoSourceNoProps }]
}

const ModalHeaderBodyAndActionsStory = () => {
    const modal = (
        <Modal.Box>
            <Modal.Header title='Header of Modal' subtitle='This is a smaller description' />
            <Modal.Body>
                The Body of a Modal can contain whatever you like! Like this very long Lorem Ipsum<br />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Modal.Body>
            <Modal.Actions>
                <Button white name='Does nothing' />
                <Button name='Close the Modal' close />
            </Modal.Actions>
        </Modal.Box>
    )
    return getStory('Click me to launch a Modal with Header, Body and Actions', modal)
}
const ModalHeaderBodyAndActionsChapter = {
    subtitle: 'Header, Body and Actions',
    sections: [{ sectionFn: ModalHeaderBodyAndActionsStory, options: optionsNoSourceNoProps }]
}

const ModalPlaygroundStory = () => {
    return (
        <section>
            <div id='modal_box' />
            <Modal.Box large={ boolean('Box: Large', false)}>
                <Modal.Header
                    title={ text('Header: Title', 'Header of Modal')}
                    subtitle={ text('Header: Subitle', 'This is a smaller description')}
                />
                <Modal.Body showCloseIcon={ boolean('Body: Close Icon', false)}>Some Content</Modal.Body>
                <Modal.Actions>
                    <Button white name='Action 1' />
                    <Button name='Action 2' />
                </Modal.Actions>
            </Modal.Box>
        </section>
    )
}

// Story setup ================================================================
const Story = () =>
storiesOf('Modal', module)
    .addDecorator(withKnobs)
    .addWithChapters('Component Documentation', {
        chapters: ModalDocumentationChapters
    })
    .addWithChapters('Component Overview', {
        chapters: [
            ModalHeaderOnlyChapter,
            ModalHeaderAndBodyChapter,
            ModalHeaderBodyAndActionsChapter
        ]
    })
    .add('Component Playground', ModalPlaygroundStory)


export default Story
