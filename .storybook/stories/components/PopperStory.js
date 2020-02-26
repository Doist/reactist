import React, { useState, useRef } from 'react'
import { storiesOf } from '@storybook/react'
import Popper from '../../../src/components/Popper'

function PopperStory() {
    const btn = useRef()
    const [isShown, setIsShown] = useState(false)

    return (
        <>
            <button
                ref={btn}
                style={{
                    width: '100px',
                    height: '100px',
                    cursor: 'pointer',
                    border: '1px solid black'
                }}
                onClick={() => setIsShown(true)}
            >
                click to open
            </button>
            <Popper
                referenceElement={btn.current}
                isShown={isShown}
                onClose={() => setIsShown(false)}
            >
                <p style={{ border: '1px solid black', margin: '0' }}>
                    The content of the Popper.
                </p>
            </Popper>
        </>
    )
}

const Story = () =>
    storiesOf('Popper', module).add('default', () => <PopperStory />)

export default Story
