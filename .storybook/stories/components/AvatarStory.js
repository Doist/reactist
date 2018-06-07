import './styles/avatar_story.less'

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, select } from '@storybook/addon-knobs'

import {
    getPropTypesStory,
    optionsNoSourceNoProps,
    optionsSourceOnly
} from '../utils/StoryUtils'

import Avatar from '../../../src/components/Avatar'

const exampleData = [
    {
        size: 'xxs',
        user: { name: 'Henning Mu', email: 'henning@foo.com' },
        image: 'https://loremflickr.com/320/320'
    },
    {
        size: 'xs',
        user: { name: 'João Va', email: 'joao@foo.com' },
        image: 'https://loremflickr.com/320/320'
    },
    {
        size: 's',
        user: { name: 'Amir Sa', email: 'amir@foo.com' },
        image: 'https://loremflickr.com/320/320'
    },
    {
        size: 'm',
        user: { name: 'Alex Mu', email: 'alex@foo.com' },
        image: 'https://loremflickr.com/320/320'
    },
    {
        size: 'l',
        user: { name: 'Julia', email: 'julia@foo.com' },
        image: 'https://loremflickr.com/320/320'
    },
    {
        size: 'xl',
        user: { name: 'Janusz Gr', email: 'janusz@foo.com' },
        image: 'https://loremflickr.com/320/320'
    },
    {
        size: 'xxl',
        user: { name: 'Jaime Az', email: 'jaime@foo.com' },
        image: 'https://loremflickr.com/320/320'
    },
    {
        size: 'xxxl',
        user: { name: 'Igor Kh', email: 'igor@foo.com' },
        image: 'https://loremflickr.com/320/320'
    }
]

// Story Definitions ==========================================================
const AvatarPropTypesStory = getPropTypesStory(Avatar)
const AvatarPropTypesChapter = {
    subtitle: 'Component Usage',
    sections: [
        { sectionFn: AvatarPropTypesStory, options: optionsNoSourceNoProps }
    ]
}

const InitialsAvatarStory = () => (
    <section className="story avatars">
        {exampleData.map((data, index) => (
            <Avatar key={index} size={data.size} user={data.user} />
        ))}
    </section>
)
const InitialsAvatarChapter = {
    subtitle: 'Avatars with Initials',
    sections: [{ sectionFn: InitialsAvatarStory, options: optionsSourceOnly }]
}

const CustomColorAvatarStory = () => (
    <section className="story avatars">
        {exampleData.map((data, index) => (
            <Avatar
                colorList={[
                    'palevioletred',
                    'palegoldenrod',
                    'palegreen',
                    'paleturquoise'
                ]}
                key={index}
                size={data.size}
                user={data.user}
            />
        ))}
    </section>
)
const CustomColorAvatarChapter = {
    subtitle: 'Avatars with Initials and Custom Colors',
    sections: [
        { sectionFn: CustomColorAvatarStory, options: optionsSourceOnly }
    ]
}

const PictureAvatarStory = () => (
    <section className="story avatars">
        {exampleData.map((data, index) => (
            <Avatar
                key={index}
                size={data.size}
                user={data.user}
                avatarUrl={data.image}
            />
        ))}
    </section>
)
const PictureAvatarChapter = {
    subtitle: 'Avatars with Pictures',
    sections: [{ sectionFn: PictureAvatarStory, options: optionsSourceOnly }]
}

const AvatarPlaygroundStory = () => (
    <section className="story Avatar">
        <Avatar
            user={{
                name: text('User Name', ''),
                email: text('User Email', '')
            }}
            avatarUrl={text('Avatar URL', 'https://loremflickr.com/320/320')}
            size={select(
                'Avatar Size',
                ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'],
                'l'
            )}
        />
    </section>
)

// Story setup ================================================================
const Story = () =>
    storiesOf('Avatar', module)
        .addDecorator(withKnobs)
        .addWithChapters('Component Overview', {
            chapters: [
                AvatarPropTypesChapter,
                InitialsAvatarChapter,
                CustomColorAvatarChapter,
                PictureAvatarChapter
            ]
        })
        .add('Component Playground', AvatarPlaygroundStory)

export default Story
