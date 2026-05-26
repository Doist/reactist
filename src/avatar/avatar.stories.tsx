import * as React from 'react'

import { Avatar, Box, Inline, Stack, Text } from '../index'

export default {
    title: 'Components/Avatar',
    component: Avatar,
}

const sizes = [80, 72, 62, 50, 40, 36, 30, 28, 24, 20, 18, 16, 12] as const

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

function UserAvatar(props: Omit<React.ComponentProps<typeof Avatar>, 'shape'>) {
    return <Avatar shape="circle" {...props} />
}

function WorkspaceAvatar(props: Omit<React.ComponentProps<typeof Avatar>, 'shape'>) {
    return <Avatar shape="rounded" {...props} />
}

type PlaygroundImage = keyof typeof playgroundImages

type AvatarPlaygroundStoryArgs = Omit<React.ComponentProps<typeof Avatar>, 'image'> & {
    image?: PlaygroundImage
}

export const OverviewStory = () => (
    <StoryLayout>
        <StorySection
            title="Common outcomes"
            description="Avatar handles image URLs, responsive image maps, initials, rounded shapes, failed images, and decorative empty states."
        >
            <Inline space="medium" alignY="top">
                <AvatarExample label="User image">
                    <UserAvatar
                        size={36}
                        name={contributors[1].name}
                        image={getGithubAvatarUrl(contributors[1].githubUserId, 72)}
                    />
                </AvatarExample>
                <AvatarExample label="Initials">
                    <UserAvatar size={36} name="Pawel Grimm" />
                </AvatarExample>
                <AvatarExample label="Workspace">
                    <WorkspaceAvatar size={36} name="Reactist" />
                </AvatarExample>
                <AvatarExample label="Source map">
                    <UserAvatar
                        size={36}
                        name={contributors[2].name}
                        image={getGithubSourceMap(contributors[2].githubUserId, 36)}
                    />
                </AvatarExample>
                <AvatarExample label="Failed image">
                    <UserAvatar size={36} name={contributors[3].name} image="/missing-avatar.png" />
                </AvatarExample>
                <AvatarExample label="Decorative">
                    <UserAvatar
                        size={36}
                        name={contributors[4].name}
                        image={getGithubAvatarUrl(contributors[4].githubUserId, 72)}
                        alt=""
                    />
                </AvatarExample>
                <AvatarExample label="Empty">
                    <Avatar size={36} alt="" />
                </AvatarExample>
            </Inline>
        </StorySection>
    </StoryLayout>
)

export const UserAvatarsStory = () => (
    <StoryLayout>
        <StorySection
            title="User avatars"
            description="Use the default circle shape for people. Pass a name for labeling and initials fallback."
        >
            <Inline space="medium" alignY="top">
                {contributors.slice(1).map((contributor) => (
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

        <StorySection
            title="Fallback initials"
            description="When an image is missing or fails to load, Avatar derives two characters from the provided name."
        >
            <Inline space="medium" alignY="top">
                <AvatarExample label="No image">
                    <UserAvatar size={36} name="Pawel Grimm" />
                </AvatarExample>
                <AvatarExample label="Failed image">
                    <UserAvatar size={36} name="Craig Reactist" image="/missing-user-avatar.png" />
                </AvatarExample>
            </Inline>
        </StorySection>
    </StoryLayout>
)

export const WorkspaceAvatarsStory = () => (
    <StoryLayout>
        <StorySection
            title="Workspace avatars"
            description='Workspace-like surfaces can encode their convention with a small wrapper that sets shape="rounded".'
        >
            <Inline space="medium" alignY="top">
                <AvatarExample label="Workspace image">
                    <WorkspaceAvatar
                        size={36}
                        name="Reactist"
                        image={getGithubAvatarUrl(contributors[0].githubUserId, 72)}
                    />
                </AvatarExample>
                <AvatarExample label="Workspace initials">
                    <WorkspaceAvatar size={36} name="Design System" />
                </AvatarExample>
                <AvatarExample label="Failed image">
                    <WorkspaceAvatar
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
)

export const ImageSourcesStory = () => (
    <StoryLayout>
        <StorySection
            title="Image sources"
            description="Pass a string for a single image, or a source map keyed by image width. These examples include 1x, 2x, and 3x source links."
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
                <AvatarExample label="Large avatar">
                    <UserAvatar
                        size={72}
                        name={contributors[3].name}
                        image={getGithubSourceMap(contributors[3].githubUserId, 72)}
                    />
                </AvatarExample>
            </Inline>
        </StorySection>
    </StoryLayout>
)

export const NamesAndInitialsStory = () => (
    <StoryLayout>
        <StorySection
            title="Names and initials"
            description="Initials are derived from normalized names and meta colors are assigned deterministically from the full name."
        >
            <Inline space="medium" alignY="top">
                {initialsExamples.map(({ label, name }) => (
                    <AvatarExample key={label} label={label}>
                        <UserAvatar size={36} name={name} />
                    </AvatarExample>
                ))}
            </Inline>
        </StorySection>

        <StorySection
            title="Deterministic meta colors"
            description="The same name receives the same meta color across sizes; different names spread across the configured palette."
        >
            <Inline space="medium" alignY="top">
                <AvatarExample label="Same name, 36">
                    <UserAvatar size={36} name="Pawel Grimm" />
                </AvatarExample>
                <AvatarExample label="Same name, 50">
                    <UserAvatar size={50} name="Pawel Grimm" />
                </AvatarExample>
                {contributors.slice(2, 6).map((contributor) => (
                    <AvatarExample key={contributor.name} label={contributor.name}>
                        <UserAvatar size={36} name={contributor.name} />
                    </AvatarExample>
                ))}
            </Inline>
        </StorySection>
    </StoryLayout>
)

export const SizesStory = () => (
    <StoryLayout>
        <StorySection
            title="Supported sizes"
            description="Avatar supports this exact set of CSS pixel sizes. Each image example includes 1x, 2x, and 3x source links."
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
)

export const AccessibilityStory = () => (
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
                <AvatarExample label="Decorative empty">
                    <Avatar size={36} alt="" />
                </AvatarExample>
            </Inline>
        </StorySection>
    </StoryLayout>
)

export const AvatarPlaygroundStory = (args: AvatarPlaygroundStoryArgs) => {
    return (
        <Box>
            <Avatar
                size={args.size}
                shape={args.shape}
                name={args.name}
                image={args.image ? playgroundImages[args.image] || undefined : undefined}
                alt={args.alt}
            />
        </Box>
    )
}

AvatarPlaygroundStory.args = {
    size: 36,
    shape: 'circle',
    name: contributors[1].name,
    image: 'pawel, 72px',
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
}
