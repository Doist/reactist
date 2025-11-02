import * as React from 'react'

import LinkTo from '@storybook/addon-links/react'

import { Banner } from '../../src/banner'
import Button from '../../src/components/deprecated-button'
import Dropdown from '../../src/components/deprecated-dropdown'
import { Stack } from '../../src/stack'

export default {
    title: 'Components/Dropdown',
    component: Dropdown,
    parameters: {
        badges: ['notAccessible', 'deprecated'],
    },
}

// Story Definitions ==========================================================
export const DropdownStory = () => (
    <section className="story">
        <Stack as="section" exceptionallySetClassName="story" space="large">
            <Banner
                tone="error"
                description={
                    <>
                        <strong>Deprecated:</strong> While not a 1:1 replacement, consider using{' '}
                        <LinkTo kind="design-system-menu">Menu</LinkTo> as an alternative
                    </>
                }
            />

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
        </Stack>
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
