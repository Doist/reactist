import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import Avatar from '../../src/components/avatar'
import Tip from '../../src/components/tip'
import { optionsSourceOnly } from '../utils/StoryUtils'
import { Notification } from '../../src/components/notification/notification'
import './styles/notification_story.less'

const StandardNotificationChapter = {
    subtitle: 'Standard Notification',
    sections: [{ sectionFn: StandardNotificationStory, options: optionsSourceOnly }],
}

function StandardNotificationStory() {
    return (
        <section className="story">
            <Notification
                id="standard-notification"
                icon={<span className="notification-story-notification-dot"></span>}
                title="You have a new message!"
                subtitle="Click here to view."
                onClose={action('onClose')}
                onClick={action('onClick')}
            />
        </section>
    )
}

const NonClickableNotificationChapter = {
    subtitle: 'Non-clickable Notification',
    sections: [{ sectionFn: NonClickableNotificationStory, options: optionsSourceOnly }],
}

function NonClickableNotificationStory() {
    return (
        <section className="story">
            <Notification
                id="non-clickable-notification"
                title="Your task is due in 5 hours"
                subtitle="Keep going!"
                onClose={action('onClose')}
            />
        </section>
    )
}

const CustomContentNotificationChapter = {
    subtitle: 'Custom Content Notification',
    sections: [{ sectionFn: CustomContentNotificationStory, options: optionsSourceOnly }],
}

function CustomContentNotificationStory() {
    return (
        <section className="story">
            <Notification
                id="custom-content-notification"
                icon={<Avatar size="s" user={{ name: 'Brock Lesnar', email: 'brock@twist.com' }} />}
                onClose={action('onClose')}
                className="notification-story-notification-container"
            >
                <div className="notification-story-content">
                    <p className="notification-story-text">You received a message from Brock</p>
                    <h4 className="notification-story-heading">
                        Better not leave him hanging
                        <Tip
                            title="Using the notification component"
                            message="Content will be laid out horizontally by default, but you can render any custom content in here, as well as provide your own custom CSS class names."
                        />
                    </h4>
                </div>
            </Notification>
        </section>
    )
}

function NotificationPlaygroundStory() {
    const onClose = boolean('use onClose?', true) ? action('onClose') : undefined
    const onClick = boolean('use onClick?', true) ? action('onClick') : undefined
    const icon = boolean('use icon?', true) ? (
        <div className="notification-story-avatar-container">
            <Avatar size="s" user={{ name: 'Ada bot', email: 'adabot@twist.com' }} />
        </div>
    ) : null
    const children = boolean('use children?', false) ? (
        <div className="notification-story-notification-container">
            <p className="notification-story-text">
                If children is provided, then{' '}
                <strong>it will be rendered instead of the title and subtitle</strong>
            </p>
        </div>
    ) : null

    return (
        <section className="story playground">
            <Notification
                id="playground-notification"
                title={text('title', 'You have a new notification')}
                subtitle={text('subtitle', 'Click to open')}
                closeAltText={text('closeAltText', 'Close me!')}
                onClose={onClose}
                onClick={onClick}
                icon={icon}
            >
                {children}
            </Notification>
        </section>
    )
}

function NotificationStory() {
    storiesOf('Notification', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [
                StandardNotificationChapter,
                NonClickableNotificationChapter,
                CustomContentNotificationChapter,
            ],
        })
        .add('Component Playground', NotificationPlaygroundStory)
}

export { NotificationStory }
