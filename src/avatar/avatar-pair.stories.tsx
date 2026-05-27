import * as React from 'react'

import { Avatar, AvatarPair, Box, Inline, Stack, Text } from '../index'

import type { Meta, StoryObj } from '@storybook/react-vite'

const contributors = [
    { name: 'pawel', githubUserId: '61894375' },
    { name: 'craig', githubUserId: '1305500' },
    { name: 'rui', githubUserId: '3165500' },
    { name: 'ricardo', githubUserId: '96476' },
    { name: 'scott', githubUserId: '25244878' },
    { name: 'francesca', githubUserId: '1509326' },
] as const

const workspaceNames = ['Reactist', 'Todoist', 'Twist', 'Doist'] as const

function getContributor(index: number): (typeof contributors)[number] {
    return contributors[index % contributors.length]!
}

function getWorkspaceName(index: number): (typeof workspaceNames)[number] {
    return workspaceNames[index % workspaceNames.length]!
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

function UserAvatar({
    contributor,
    size,
}: {
    contributor: (typeof contributors)[number]
    size: React.ComponentProps<typeof Avatar>['size']
}) {
    return (
        <Avatar
            size={size}
            name={contributor.name}
            image={getGithubSourceMap(contributor.githubUserId, size)}
        />
    )
}

function WorkspaceAvatar({
    name,
    size,
}: {
    name: string
    size: React.ComponentProps<typeof Avatar>['size']
}) {
    return <Avatar size={size} shape="rounded" name={name} />
}

const meta = {
    title: 'Components/Avatar/AvatarPair',
    component: AvatarPair,
    parameters: {
        badges: ['accessible'],
    },
} satisfies Meta<typeof AvatarPair>

export default meta

type Story = StoryObj<typeof meta>

export const People = {
    render: () => (
        <StoryLayout>
            <StorySection
                title="People pairs"
                description="Circular pairs represent two related people or identities in a compact diagonal layout."
            >
                <Inline space="medium" alignY="top">
                    <AvatarExample label="Image pair">
                        <AvatarPair size={28}>
                            <UserAvatar contributor={contributors[0]} size={28} />
                            <UserAvatar contributor={contributors[1]} size={28} />
                        </AvatarPair>
                    </AvatarExample>
                    <AvatarExample label="Initials pair">
                        <AvatarPair size={28}>
                            <Avatar size={28} name="Pawel Grimm" />
                            <Avatar size={28} name="Craig Reactist" />
                        </AvatarPair>
                    </AvatarExample>
                    <AvatarExample label="Mixed pair">
                        <AvatarPair size={36}>
                            <UserAvatar contributor={contributors[2]} size={36} />
                            <Avatar size={36} name="Review Bot" />
                        </AvatarPair>
                    </AvatarExample>
                </Inline>
            </StorySection>
        </StoryLayout>
    ),
} satisfies Story

export const Workspaces = {
    render: () => (
        <StoryLayout>
            <StorySection
                title="Workspace pairs"
                description="Rounded pairs use the same diagonal layout while preserving the workspace avatar radius."
            >
                <Inline space="medium" alignY="top">
                    <AvatarExample label="Workspace pair">
                        <AvatarPair size={28} shape="rounded">
                            <WorkspaceAvatar size={28} name="Reactist" />
                            <WorkspaceAvatar size={28} name="Todoist" />
                        </AvatarPair>
                    </AvatarExample>
                    <AvatarExample label="Large pair">
                        <AvatarPair size={50} shape="rounded">
                            <WorkspaceAvatar size={50} name="Twist" />
                            <WorkspaceAvatar size={50} name="Doist" />
                        </AvatarPair>
                    </AvatarExample>
                    <AvatarExample label="Mixed source">
                        <AvatarPair size={36} shape="rounded">
                            <Avatar
                                size={36}
                                shape="rounded"
                                name="doistbot"
                                image={getGithubSourceMap('37183429', 36)}
                            />
                            <WorkspaceAvatar size={36} name="Design System" />
                        </AvatarPair>
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
                title="Circle sizes"
                description="The pair spacing and circular mask margin scale with the avatar size."
            >
                <Inline space="medium" alignY="top">
                    {([80, 62, 50, 36, 28, 20, 16, 12] as const).map((size, index) => (
                        <AvatarExample key={size} label={`${size}px`}>
                            <AvatarPair size={size}>
                                <UserAvatar contributor={getContributor(index)} size={size} />
                                <UserAvatar contributor={getContributor(index + 1)} size={size} />
                            </AvatarPair>
                        </AvatarExample>
                    ))}
                </Inline>
            </StorySection>

            <StorySection
                title="Rounded sizes"
                description="Rounded pair masks are easiest to inspect across the supported size range."
            >
                <Inline space="medium" alignY="top">
                    {([80, 62, 50, 36, 28, 20, 16, 12] as const).map((size, index) => (
                        <AvatarExample key={size} label={`${size}px`}>
                            <AvatarPair size={size} shape="rounded">
                                <WorkspaceAvatar size={size} name={getWorkspaceName(index)} />
                                <WorkspaceAvatar size={size} name={getWorkspaceName(index + 1)} />
                            </AvatarPair>
                        </AvatarExample>
                    ))}
                </Inline>
            </StorySection>
        </StoryLayout>
    ),
} satisfies Story
