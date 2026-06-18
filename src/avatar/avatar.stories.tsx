import * as React from 'react'

import { Avatar, Box, Inline, Stack, Text } from '../index'

import { AVATAR_SIZES, getAvatarMetaColorIndex } from './utils'

import type { Meta, StoryObj } from '@storybook/react-vite'
import type { AvatarProps } from './avatar'

const sizes = AVATAR_SIZES

const contributors = [
    {
        name: 'doistbot',
        githubUserId: '37183429',
    },
    {
        name: 'pawel',
        githubUserId: '61894375',
    },
    {
        name: 'craig',
        githubUserId: '1305500',
    },
    {
        name: 'rui',
        githubUserId: '3165500',
    },
    {
        name: 'ricardo',
        githubUserId: '96476',
    },
    {
        name: 'scott',
        githubUserId: '25244878',
    },
    {
        name: 'francesca',
        githubUserId: '1509326',
    },
    {
        name: 'henning',
        githubUserId: '6048870',
    },
] as const

const initialsExamples = [
    {
        label: 'Single part',
        name: 'doistbot',
    },
    {
        label: 'First + last',
        name: 'Pawel Grimm',
    },
    {
        label: 'Whitespace',
        name: '  craig   reactist  ',
    },
    {
        label: 'Unicode',
        name: 'Åsa Núñez',
    },
] as const

const metaColorExamples = [
    'Ada 28',
    'Ben 15',
    'Cam 38',
    'Dee 3',
    'Eli 2',
    'Flo 17',
    'Gia 3',
    'Hao 27',
    'Ivy 26',
    'Jon 4',
    'Kai 3',
    'Lia 3',
    'Max 8',
    'Nia 3',
    'Oli 2',
    'Pia 3',
    'Quin 3',
    'Rae 7',
    'Sol 6',
    'Tia 3',
].map((name) => ({ name, index: getAvatarMetaColorIndex(name) }))

const playgroundImages = {
    None: '',
    'doistbot, 60px': getGithubAvatarUrl('37183429', 60),
    'pawel, 72px': getGithubAvatarUrl('61894375', 72),
    'craig, 96px': getGithubAvatarUrl('1305500', 96),
    'rui, 120px': getGithubAvatarUrl('3165500', 120),
    'ricardo, 144px': getGithubAvatarUrl('96476', 144),
    'scott, 180px': getGithubAvatarUrl('25244878', 180),
    'francesca, 216px': getGithubAvatarUrl('1509326', 216),
    'henning, 240px': getGithubAvatarUrl('6048870', 240),
    'Missing image': '/missing-avatar-playground.png',
} as const

function getContributor(index: number) {
    return contributors[index % contributors.length]
}

function getGithubAvatarUrl(githubUserId: string, width: number) {
    return `https://avatars.githubusercontent.com/u/${githubUserId}?s=${width}`
}

function getGithubSourceMap(githubUserId: string, width: number) {
    return {
        [width]: getGithubAvatarUrl(githubUserId, width),
        [width * 2]: getGithubAvatarUrl(githubUserId, width * 2),
        [width * 3]: getGithubAvatarUrl(githubUserId, width * 3),
    }
}

function StoryLayout({ children }: { children: React.ReactNode }) {
    return (
        <Stack as="section" exceptionallySetClassName="story" space="large">
            {children}
        </Stack>
    )
}

function StorySection({
    title,
    description,
    children,
}: {
    title: string
    description?: string
    children: React.ReactNode
}) {
    return (
        <Stack space="small">
            <Stack space="xsmall">
                <Text weight="semibold">{title}</Text>
                {description ? (
                    <Text size="copy" tone="secondary">
                        {description}
                    </Text>
                ) : null}
            </Stack>
            {children}
        </Stack>
    )
}

function AvatarExample({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <Box width="fitContent">
            <Stack space="xsmall" align="center">
                {children}
                <Text size="caption" tone="secondary" align="center">
                    {label}
                </Text>
            </Stack>
        </Box>
    )
}

function UserAvatar(props: Omit<AvatarProps, 'shape'>) {
    return <Avatar shape="circle" {...props} />
}

function WorkspaceAvatarExample(props: Omit<AvatarProps, 'shape'>) {
    return <Avatar shape="rounded" {...props} />
}

function AvatarColorExample({ index, name }: { index: number; name: string }) {
    return (
        <AvatarExample label={`fill-${index}`}>
            <UserAvatar size={36} name={name} />
        </AvatarExample>
    )
}

type PlaygroundImage = keyof typeof playgroundImages

type PlaygroundArgs = Omit<AvatarProps, 'image'> & {
    image?: PlaygroundImage
}

const meta = {
    title: '📊 Data display/Avatar',
    component: Avatar,
    parameters: {
        badges: ['accessible'],
        figma: {
            label: 'Global › Avatar',
            url: 'https://www.figma.com/design/xo9yAsH8PQUpi0eTJh9pmR/Product-Library---Global?node-id=6957-36532',
        },
    },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>
type PlaygroundStory = StoryObj<PlaygroundArgs>

export const Default = {
    render: () => (
        <StoryLayout>
            <StorySection
                title="User avatar"
                description="Use the default circle shape for people. Pass a name for labeling and initials fallback."
            >
                <Inline space="medium" alignY="top">
                    {contributors.slice(1, 6).map((contributor) => (
                        <AvatarExample key={contributor.name} label={contributor.name}>
                            <UserAvatar
                                size={36}
                                name={contributor.name}
                                image={getGithubAvatarUrl(contributor.githubUserId, 72)}
                            />
                        </AvatarExample>
                    ))}
                </Inline>
            </StorySection>
        </StoryLayout>
    ),
} satisfies Story

export const InitialsFallback = {
    render: () => (
        <StoryLayout>
            <StorySection
                title="Initials fallback"
                description="When no image is available, Avatar derives initials from the normalized name and assigns a deterministic meta color."
            >
                <Inline space="medium" alignY="top">
                    {initialsExamples.map(({ label, name }) => (
                        <AvatarExample key={label} label={label}>
                            <UserAvatar size={36} name={name} />
                        </AvatarExample>
                    ))}
                    <AvatarExample label="Failed image">
                        <UserAvatar size={36} name="Craig Reactist" image="/missing-avatar.png" />
                    </AvatarExample>
                </Inline>
            </StorySection>
        </StoryLayout>
    ),
} satisfies Story

export const WorkspaceAvatar = {
    render: () => (
        <StoryLayout>
            <StorySection
                title="Workspace avatars"
                description='Use shape="rounded" for workspace-like entities, either directly or through a small product wrapper.'
            >
                <Inline space="medium" alignY="top">
                    <AvatarExample label="Workspace image">
                        <WorkspaceAvatarExample
                            size={36}
                            name="Reactist"
                            image={getGithubAvatarUrl(contributors[0].githubUserId, 72)}
                        />
                    </AvatarExample>
                    <AvatarExample label="Workspace initials">
                        <WorkspaceAvatarExample size={36} name="Design System" />
                    </AvatarExample>
                    <AvatarExample label="Failed image">
                        <WorkspaceAvatarExample
                            size={36}
                            name="Todoist Web"
                            image="/missing-workspace-avatar.png"
                        />
                    </AvatarExample>
                    <AvatarExample label="Empty">
                        <Avatar size={36} shape="rounded" alt="" />
                    </AvatarExample>
                </Inline>
            </StorySection>
        </StoryLayout>
    ),
} satisfies Story

export const ImageSources = {
    render: () => (
        <StoryLayout>
            <StorySection
                title="Image sources"
                description="Pass a string for a single image, or a source map keyed by intrinsic image width. Source maps render native srcSet and sizes hints."
            >
                <Inline space="medium" alignY="top">
                    <AvatarExample label="String URL">
                        <UserAvatar
                            size={36}
                            name={contributors[1].name}
                            image={getGithubAvatarUrl(contributors[1].githubUserId, 72)}
                        />
                    </AvatarExample>
                    <AvatarExample label="Source map">
                        <UserAvatar
                            size={36}
                            name={contributors[2].name}
                            image={getGithubSourceMap(contributors[2].githubUserId, 36)}
                        />
                    </AvatarExample>
                    <AvatarExample label="Large source map">
                        <UserAvatar
                            size={72}
                            name={contributors[3].name}
                            image={getGithubSourceMap(contributors[3].githubUserId, 72)}
                        />
                    </AvatarExample>
                </Inline>
            </StorySection>
        </StoryLayout>
    ),
} satisfies Story

export const Sizes = {
    render: () => (
        <StoryLayout>
            <StorySection
                title="Supported sizes"
                description="Avatar supports this exact set of CSS pixel sizes. The same size value is also used in image source-map sizes hints."
            >
                <Inline space="medium" alignY="top">
                    {sizes.map((size, index) => {
                        const contributor = getContributor(index)

                        return (
                            <AvatarExample key={size} label={`${size}px`}>
                                <UserAvatar
                                    size={size}
                                    name={contributor!.name}
                                    image={getGithubSourceMap(contributor!.githubUserId, size)}
                                />
                            </AvatarExample>
                        )
                    })}
                </Inline>
            </StorySection>

            <StorySection
                title="Initials at every size"
                description="Initials scale with the avatar size and keep the same two-character derivation."
            >
                <Inline space="medium" alignY="top">
                    {sizes.map((size, index) => {
                        const contributor = getContributor(index)

                        return (
                            <AvatarExample key={size} label={`${size}px`}>
                                <UserAvatar size={size} name={contributor!.name} />
                            </AvatarExample>
                        )
                    })}
                </Inline>
            </StorySection>
        </StoryLayout>
    ),
} satisfies Story

export const Accessibility = {
    render: () => (
        <StoryLayout>
            <StorySection
                title="Accessible names"
                description='Images default to name for alt text. Pass alt for a custom label, or alt="" for decorative avatars.'
            >
                <Inline space="medium" alignY="top">
                    <AvatarExample label="Default from name">
                        <UserAvatar
                            size={36}
                            name={contributors[1].name}
                            image={getGithubAvatarUrl(contributors[1].githubUserId, 72)}
                        />
                    </AvatarExample>
                    <AvatarExample label="Custom alt">
                        <UserAvatar
                            size={36}
                            name={contributors[0].name}
                            image={getGithubAvatarUrl(contributors[0].githubUserId, 72)}
                            alt="Reactist automation account"
                        />
                    </AvatarExample>
                    <AvatarExample label="Decorative image">
                        <UserAvatar
                            size={36}
                            name={contributors[3].name}
                            image={getGithubAvatarUrl(contributors[3].githubUserId, 72)}
                            alt=""
                        />
                    </AvatarExample>
                    <AvatarExample label="Decorative initials">
                        <UserAvatar size={36} name="Jane Doe" alt="" />
                    </AvatarExample>
                    <AvatarExample label="Decorative empty">
                        <Avatar size={36} alt="" />
                    </AvatarExample>
                </Inline>
            </StorySection>
        </StoryLayout>
    ),
} satisfies Story

export const MetaColors = {
    render: () => (
        <StoryLayout>
            <StorySection
                title="Meta colors"
                description="Avatar assigns one of 20 meta fill colors deterministically from the provided name."
            >
                <Inline space="medium" alignY="top">
                    {metaColorExamples.map(({ index, name }) => (
                        <AvatarColorExample key={index} index={index} name={name} />
                    ))}
                </Inline>
            </StorySection>
        </StoryLayout>
    ),
} satisfies Story

export const Playground = {
    args: {
        size: 36,
        shape: 'circle',
        name: contributors[1].name,
        image: 'pawel, 72px',
        alt: undefined,
    },
    argTypes: {
        size: {
            control: { type: 'select' },
            options: sizes,
        },
        shape: {
            control: { type: 'select' },
            options: ['circle', 'rounded'],
        },
        name: {
            control: {
                type: 'text',
            },
        },
        image: {
            options: Object.keys(playgroundImages),
            control: {
                type: 'select',
            },
        },
        alt: {
            control: {
                type: 'text',
            },
        },
    },
    render: (args: PlaygroundArgs) => (
        <Box>
            <Avatar
                size={args.size}
                shape={args.shape}
                name={args.name}
                image={args.image ? playgroundImages[args.image] || undefined : undefined}
                alt={args.alt}
            />
        </Box>
    ),
} satisfies PlaygroundStory
