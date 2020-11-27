import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'

import { getPropTypesStory, optionsSourceOnly, optionsNoSourceNoProps } from '../utils/StoryUtils'

import TodoistQuickAdd from '../../src/components/TodoistQuickAdd'
import Button from '../../src/components/Button'

// Story Definitions ==========================================================
const TodoistQuickAddPropTypesStory = getPropTypesStory(TodoistQuickAdd)
const TodoistQuickAddPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        {
            sectionFn: TodoistQuickAddPropTypesStory,
            options: optionsNoSourceNoProps,
        },
    ],
}

const TodoistQuickAddStory = () => {
    const [showQuickAdd, setShowQuickAdd] = useState<boolean>(false)

    return (
        <section className="story">
            <div>
                {showQuickAdd && (
                    <TodoistQuickAdd
                        content={'Do this then that'}
                        theme={6}
                        onAdd={() => setShowQuickAdd(false)}
                        onClose={() => setShowQuickAdd(false)}
                    />
                )}
                <Button variant="primary" onClick={() => setShowQuickAdd(!showQuickAdd)}>
                    Toggle Todoist Quick Add
                </Button>
            </div>
        </section>
    )
}

const TodoistQuickAddChapter = {
    subtitle: 'Todoist Quick Add',
    sections: [{ sectionFn: () => <TodoistQuickAddStory />, options: optionsSourceOnly }],
}

// Story setup ================================================================
const Story = () =>
    storiesOf('TodoistQuickAdd', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [TodoistQuickAddPropTypesChapter, TodoistQuickAddChapter],
        })

export { Story as TodoistQuickAddStory }
