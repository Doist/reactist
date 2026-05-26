import * as React from 'react'

import { Avatar, Box, Inline, Stack } from '../../src'

export default {
    title: 'Components/Avatar',
    component: Avatar,
}

const sizes = [80, 72, 62, 50, 40, 36, 30, 28, 24, 20, 18, 16, 12] as const

const sourceMap = {
    36: 'https://loremflickr.com/36/36',
    72: 'https://loremflickr.com/72/72',
    144: 'https://loremflickr.com/144/144',
}

const metaColorNames = ['Ada Lovelace', 'Grace Hopper', 'Mary Jackson', 'Katherine Johnson']

function UserAvatar(props: Omit<React.ComponentProps<typeof Avatar>, 'shape'>) {
    return <Avatar shape="circle" {...props} />
}

function WorkspaceAvatar(props: Omit<React.ComponentProps<typeof Avatar>, 'shape'>) {
    return <Avatar shape="rounded" {...props} />
}

function PersonAvatar(props: Omit<React.ComponentProps<typeof Avatar>, 'shape'>) {
    return <Avatar shape="circle" {...props} />
}

function PeopleAvatar(props: Omit<React.ComponentProps<typeof Avatar>, 'shape'>) {
    return <Avatar shape="circle" {...props} />
}

export const InitialsAvatarStory = () => (
    <Inline space="small">
        {sizes.map((size) => (
            <Avatar key={size} size={size} name="Jane Doe" />
        ))}
    </Inline>
)

export const MetaColorAvatarStory = () => (
    <Inline space="small">
        {metaColorNames.map((name) => (
            <Avatar key={name} size={36} name={name} />
        ))}
    </Inline>
)

export const RoundedAvatarStory = () => (
    <Inline space="small">
        {sizes.map((size) => (
            <Avatar key={size} size={size} shape="rounded" name="Design System" />
        ))}
    </Inline>
)

export const PictureAvatarStory = () => (
    <Inline space="small">
        {sizes.map((size) => (
            <Avatar
                key={size}
                size={size}
                name="Jane Doe"
                image={`https://loremflickr.com/${size}/${size}`}
            />
        ))}
    </Inline>
)

export const SourceMapAvatarStory = () => (
    <Inline space="small">
        <Avatar size={36} name="Jane Doe" image={sourceMap} />
        <Avatar size={72} name="Jane Doe" image={sourceMap} />
        <Avatar size={36} shape="rounded" name="Design" image={sourceMap} />
    </Inline>
)

export const FailedImageFallbackStory = () => (
    <Inline space="small">
        <Avatar size={36} name="Jane Doe" image="/missing-avatar-image.png" />
        <Avatar size={36} shape="rounded" name="Design" image="/missing-workspace-image.png" />
    </Inline>
)

export const ProductWrapperExamplesStory = () => (
    <Stack space="small">
        <Inline space="small" alignY="center">
            <UserAvatar size={36} name="Jane Doe" image={sourceMap} />
            <WorkspaceAvatar size={36} name="Design" image={sourceMap} />
            <PersonAvatar size={24} name="Person" image={sourceMap} alt="Person" />
            <PeopleAvatar size={24} name="People" image={sourceMap} alt="People" />
        </Inline>
    </Stack>
)

export const EmptyAvatarStory = () => (
    <Inline space="small">
        <Avatar size={36} />
        <Avatar size={36} shape="rounded" />
    </Inline>
)

export const AvatarPlaygroundStory = (args) => {
    return (
        <Box>
            <Avatar
                size={args.size}
                shape={args.shape}
                name={args.name}
                image={args.image || undefined}
                alt={args.alt}
            />
        </Box>
    )
}

AvatarPlaygroundStory.args = {
    size: 36,
    shape: 'circle',
    name: 'Jane Doe',
    image: 'https://loremflickr.com/144/144',
    alt: undefined,
}

AvatarPlaygroundStory.argTypes = {
    size: {
        type: 'select',
        options: sizes,
    },
    shape: {
        type: 'select',
        options: ['circle', 'rounded'],
    },
    name: {
        control: {
            type: 'text',
        },
    },
    image: {
        control: {
            type: 'text',
        },
    },
    alt: {
        control: {
            type: 'text',
        },
    },
}
