import { storiesOf } from '@storybook/react'

import documentation from './KeyCapturerStory.md'

// Story Definitions ==========================================================
const KeyCapturerDocumentationChapters = [{ subtitle: 'Documentation', info: documentation }]

// Story setup ================================================================
const KeyCapturerStory = () =>
    storiesOf('KeyCapturer', module).addWithChapters('Component Documentation', {
        chapters: KeyCapturerDocumentationChapters,
    })

export { KeyCapturerStory }
