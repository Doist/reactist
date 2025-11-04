import './styles/avatar_story.less'

import * as React from 'react'

import { withKnobs } from '@storybook/addon-knobs'

import { Avatar, Box, Inline } from '../../src'

export default {
    title: 'Components/Avatar',
    decorators: [withKnobs],
    component: Avatar,
}

const exampleData = [
    {
        size: 'xxs',
        user: { name: 'Henning Mu', email: 'henning@foo.com' },
        image: 'https://loremflickr.com/320/320',
    },
    {
        size: 'xs',
        user: { name: 'João Va', email: 'joao@foo.com' },
        image: 'https://loremflickr.com/320/320',
    },
    {
        size: 's',
        user: { name: 'Amir Sa', email: 'amir@foo.com' },
        image: 'https://loremflickr.com/320/320',
    },
    {
        size: 'm',
        user: { name: 'Alex Mu', email: 'alex@foo.com' },
        image: 'https://loremflickr.com/320/320',
    },
    {
        size: 'l',
        user: { name: 'Julia', email: 'julia@foo.com' },
        image: 'https://loremflickr.com/320/320',
    },
    {
        size: 'xl',
        user: { name: 'Janusz Gr', email: 'janusz@foo.com' },
        image: 'https://loremflickr.com/320/320',
    },
    {
        size: 'xxl',
        user: { name: 'Jaime Az', email: 'jaime@foo.com' },
        image: 'https://loremflickr.com/320/320',
    },
    {
        size: 'xxxl',
        user: { name: 'Igor Kh', email: 'igor@foo.com' },
        image: 'https://loremflickr.com/320/320',
    },
] as const

// Story Definitions ==========================================================

export const InitialsAvatarStory = () => (
    <Inline space="small">
        {exampleData.map((data, index) => (
            <Avatar key={index} size={data.size} user={data.user} />
        ))}
    </Inline>
)

export const CustomColorAvatarStory = () => (
    <Inline space="small">
        {exampleData.map((data, index) => (
            <Avatar
                colorList={['palevioletred', 'palegoldenrod', 'palegreen', 'paleturquoise']}
                key={index}
                size={data.size}
                user={data.user}
            />
        ))}
    </Inline>
)

export const PictureAvatarStory = () => (
    <Inline space="small">
        {exampleData.map((data, index) => (
            <Avatar key={index} size={data.size} user={data.user} avatarUrl={data.image} />
        ))}
    </Inline>
)

export const AvatarPlaygroundStory = (args) => {
    return (
        <Box className="story Avatar">
            <Avatar
                {...args}
                user={{
                    name: args.userName,
                    email: args.email,
                }}
            />
        </Box>
    )
}

AvatarPlaygroundStory.args = {
    size: 'l',
    avatarUrl: 'https://loremflickr.com/320/320',
    userName: '',
    email: '',
}

AvatarPlaygroundStory.argTypes = {
    size: {
        type: 'select',
        options: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'],
    },
    avatarUrl: {
        control: {
            type: 'text',
        },
    },
    userName: {
        control: {
            type: 'text',
        },
    },
    email: {
        control: {
            type: 'text',
        },
    },
    className: {
        control: {
            type: null,
        },
    },
    user: {
        control: {
            type: null,
        },
    },
    colorList: {
        control: {
            type: null,
        },
    },
}
