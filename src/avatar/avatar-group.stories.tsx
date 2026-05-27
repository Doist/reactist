import * as React from 'react'

import { Avatar, AvatarGroup, Box, Inline, Stack, Text } from '../index'

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

function CustomOverlayStyle() {
    return (
        <style>
            {`
                .avatarGroupCustomOverlay {
                    --reactist-avatar-group-count-overlay: rgba(220, 76, 62, 0.72);
                }
            `}
        </style>
    )
}

const meta = {
    title: 'Components/Avatar/AvatarGroup',
    component: AvatarGroup,
    parameters: {
        badges: ['accessible'],
    },
} satisfies Meta<typeof AvatarGroup>

export default meta

type Story = StoryObj<typeof meta>

export const People = {
    render: () => (
        <StoryLayout>
            <StorySection
                title="People groups"
                description="Circular groups use overlapping image avatars with a count overlay when more people are represented."
            >
                <Inline space="medium" alignY="top">
                    <AvatarExample label="Team">
                        <AvatarGroup size={36} count={4}>
                            {contributors.slice(0, 5).map((contributor) => (
                                <UserAvatar
                                    key={contributor.name}
                                    contributor={contributor}
                                    size={36}
                                />
                            ))}
                        </AvatarGroup>
                    </AvatarExample>
                    <AvatarExample label="Reviewers">
                        <AvatarGroup size={30}>
                            {contributors.slice(1, 4).map((contributor) => (
                                <UserAvatar
                                    key={contributor.name}
                                    contributor={contributor}
                                    size={30}
                                />
                            ))}
                        </AvatarGroup>
                    </AvatarExample>
                    <AvatarExample label="Compact">
                        <AvatarGroup size={24} count={8}>
                            {contributors.slice(2, 5).map((contributor) => (
                                <UserAvatar
                                    key={contributor.name}
                                    contributor={contributor}
                                    size={24}
                                />
                            ))}
                        </AvatarGroup>
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
                title="Workspace groups"
                description="Rounded groups preserve the workspace avatar corners while clipping the overlap."
            >
                <Inline space="medium" alignY="top">
                    <AvatarExample label="Product suite">
                        <AvatarGroup size={36} shape="rounded" count={2}>
                            {workspaceNames.map((name) => (
                                <WorkspaceAvatar key={name} size={36} name={name} />
                            ))}
                        </AvatarGroup>
                    </AvatarExample>
                    <AvatarExample label="Two workspaces">
                        <AvatarGroup size={40} shape="rounded">
                            <WorkspaceAvatar size={40} name="Reactist" />
                            <WorkspaceAvatar size={40} name="Todoist" />
                        </AvatarGroup>
                    </AvatarExample>
                    <AvatarExample label="Small rounded">
                        <AvatarGroup size={24} shape="rounded" count={5}>
                            {workspaceNames.slice(0, 3).map((name) => (
                                <WorkspaceAvatar key={name} size={24} name={name} />
                            ))}
                        </AvatarGroup>
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
                description="Overlap and mask margin scale with the avatar size."
            >
                <Inline space="medium" alignY="top">
                    {([80, 62, 50, 36, 24, 18, 12] as const).map((size, index) => (
                        <AvatarExample key={size} label={`${size}px`}>
                            <AvatarGroup size={size} count={3}>
                                {[0, 1, 2].map((offset) => (
                                    <UserAvatar
                                        key={getContributor(index + offset)!.name}
                                        contributor={getContributor(index + offset)!}
                                        size={size}
                                    />
                                ))}
                            </AvatarGroup>
                        </AvatarExample>
                    ))}
                </Inline>
            </StorySection>

            <StorySection
                title="Rounded sizes"
                description="Rounded masks use the avatar radius plus the mask margin."
            >
                <Inline space="medium" alignY="top">
                    {([80, 62, 50, 36, 24, 18, 12] as const).map((size, index) => (
                        <AvatarExample key={size} label={`${size}px`}>
                            <AvatarGroup size={size} shape="rounded" count={3}>
                                {[0, 1, 2].map((offset) => (
                                    <WorkspaceAvatar
                                        key={`${size}-${offset}`}
                                        size={size}
                                        name={
                                            workspaceNames[
                                                (index + offset) % workspaceNames.length
                                            ]!
                                        }
                                    />
                                ))}
                            </AvatarGroup>
                        </AvatarExample>
                    ))}
                </Inline>
            </StorySection>
        </StoryLayout>
    ),
} satisfies Story

export const CountOverlay = {
    render: () => (
        <StoryLayout>
            <CustomOverlayStyle />

            <StorySection
                title="Count overlays"
                description="The count overlay inherits the same clipping behavior as the final avatar."
            >
                <Inline space="medium" alignY="top">
                    <AvatarExample label="Default overlay">
                        <AvatarGroup size={36} count={9}>
                            {contributors.slice(0, 4).map((contributor) => (
                                <UserAvatar
                                    key={contributor.name}
                                    contributor={contributor}
                                    size={36}
                                />
                            ))}
                        </AvatarGroup>
                    </AvatarExample>
                    <AvatarExample label="Custom overlay">
                        <AvatarGroup
                            size={36}
                            count={9}
                            exceptionallySetClassName="avatarGroupCustomOverlay"
                        >
                            {contributors.slice(1, 5).map((contributor) => (
                                <UserAvatar
                                    key={contributor.name}
                                    contributor={contributor}
                                    size={36}
                                />
                            ))}
                        </AvatarGroup>
                    </AvatarExample>
                    <AvatarExample label="Rounded overlay">
                        <AvatarGroup size={36} shape="rounded" count={9}>
                            {workspaceNames.map((name) => (
                                <WorkspaceAvatar key={name} size={36} name={name} />
                            ))}
                        </AvatarGroup>
                    </AvatarExample>
                </Inline>
            </StorySection>
        </StoryLayout>
    ),
} satisfies Story
