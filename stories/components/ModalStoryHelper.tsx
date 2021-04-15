import React from 'react'
import ReactDOM from 'react-dom'

import './styles/modal_story.less'

import { default as Modal } from '../../src/components/modal'
import Button from '../../src/components/button'

// Helper =====================================================================
const renderModal = (modal) => {
    ReactDOM.render(modal, document.getElementById('modal_box'))
}
const getStory = (text, modal, title) => (
    <section className="story">
        <p>{title}</p>
        <div id="modal_box" />
        <Button variant="primary" onClick={() => renderModal(modal)}>
            {text}
        </Button>
    </section>
)

// Story setup ===============================================================

export default {
    title: 'Modal',
    docs: {
        page: './Modal.mdx',
    },
}

// Story Definitions ==========================================================

export const ModalHeaderOnlyStory = () => {
    const modal = (
        <Modal.Box closeOnOverlayClick>
            <Modal.Header title="Header of Modal" />
        </Modal.Box>
    )
    return getStory('Click me to launch a Modal with Header', modal, 'Header Only')
}

export const ModalHeaderAndBodyStory = () => {
    const modal = (
        <Modal.Box closeOnOverlayClick>
            <Modal.Header title="Header of Modal" subtitle="This is a smaller description" />
            <Modal.Body>The Body of a Modal can contain whatever you like!</Modal.Body>
        </Modal.Box>
    )
    return getStory('Click me to launch a Modal with Header and Body', modal, 'Header and Body')
}

export const ModalHeaderBodyAndActionsStory = () => {
    const modal = (
        <Modal.Box closeOnOverlayClick>
            <Modal.Header title="Header of Modal" subtitle="This is a smaller description" />
            <Modal.Body>
                The Body of a Modal can contain whatever you like! Like this very long Lorem Ipsum
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
            </Modal.Body>
            <Modal.Actions>
                <Button variant="secondary">Does nothing</Button>
                <Button variant="primary" close>
                    Close the Modal
                </Button>
            </Modal.Actions>
        </Modal.Box>
    )
    return getStory(
        'Click me to launch a Modal with Header, Body and Actions',
        modal,
        'Header, Body and Actions',
    )
}

export const ModalScrollableBodyStory = () => {
    const modal = (
        <Modal.Box closeOnOverlayClick>
            <Modal.Header title="Header of Modal with Scrollable Body" />
            <Modal.Body>
                The Body of a Modal can contain whatever you like! Like this very long Lorem Ipsum
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
            </Modal.Body>
        </Modal.Box>
    )
    return getStory('Click me to launch a Modal with Scrollable Body', modal, 'Scrollable Body')
}

export const PlainMediumModalStory = () => {
    const modal = (
        <Modal.Box medium closeOnOverlayClick>
            <Modal.Header title="Header of Modal" />
            <Modal.Body plain>
                The Body of a Modal can contain whatever you like! Like this very long Lorem Ipsum
                <br />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
            </Modal.Body>
        </Modal.Box>
    )
    return getStory(
        'Click me to launch a medium-sized Modal with Header and plain Body',
        modal,
        'Header, Body and Actions',
    )
}

export const ModalPlaygroundStory = (args) => {
    return (
        <section>
            <div id="modal_box" />
            <Modal.Box {...args} closeOnOverlayClick>
                <Modal.Header {...args} />
                <Modal.Body {...args}>Some Content</Modal.Body>
                <Modal.Actions>
                    <Button variant="secondary">Action 1</Button>
                    <Button variant="primary">Action 2</Button>
                </Modal.Actions>
            </Modal.Box>
        </section>
    )
}
