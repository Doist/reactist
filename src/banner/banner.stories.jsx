import * as React from 'react'

import { Box } from '../box'
import { Button } from '../button'
import { CheckboxField } from '../checkbox-field'
import { Notice } from '../notice'
import { Stack } from '../stack'
import { Text } from '../text'

import { Banner } from './banner'
import { PromoImage } from './story-promo-image'

function ArchiveIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
            <path
                fill="#5E5E5E"
                fillRule="evenodd"
                d="M5 4.25h14a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2Zm-1 5v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9H4Zm5.5 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Z"
                clipRule="evenodd"
            />
        </svg>
    )
}

function getButton(buttonText) {
    return (
        <Button variant="primary" type="destructive">
            {buttonText}
        </Button>
    )
}

function getLongDescription() {
    return 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident cumque recusandae quibusdam, veniam cum illo? Inventore, doloremque necessitatibus! Sequi porro alias mollitia, temporibus quidem, aut modi tempora placeat laborum eos sapiente necessitatibus autem ipsum officia rerum distinctio consectetur tenetur qui! Perspiciatis ab corporis, itaque alias ex optio voluptatum nulla consequatur aut explicabo dolorem rerum ratione magnam. Mollitia dignissimos et ad commodi quasi molestias fugiat repellendus, magni distinctio voluptate neque quos esse asperiores iure excepturi eligendi eaque veniam voluptas blanditiis temporibus, omnis laborum quidem autem totam. Iure, numquam. Totam facilis dolorum, consequatur, eligendi est dolores modi dolore maiores ipsum magnam a.'
}

function PlaygroundTemplate({ type, title, description, action }) {
    return (
        <Stack space="large" maxWidth="medium">
            <Banner
                type={type}
                icon={<ArchiveIcon />}
                title={title}
                description={description}
                action={action}
            />
        </Stack>
    )
}

function BannerIconExamples({ theme }) {
    return (
        <Stack space="medium" align="start">
            <Stack space="large">
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    description="This is a neutral message"
                />
                <Banner type="neutral" description="This is a neutral message without an icon" />
                <Banner type="info" description="This is an info message" />
                <Banner type="upgrade" description="This is a upgrade message" />
                <Banner type="experiment" description="This is an experimentalist message" />
                <Banner type="warning" description="This is a warning message" />
                <Banner type="error" description="This is a error message" />
                <Banner type="success" description="This is a success message" />
            </Stack>
        </Stack>
    )
}

function BannerActionExamples({ theme }) {
    return (
        <Stack space="medium" align="start">
            <Stack space="large">
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    description="A read-only banner without any action"
                />
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    description="A banner with a dismiss action"
                    onClose={() => ({})}
                />
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    description="A banner with a primary CTA"
                    action={{
                        type: 'button',
                        label: 'Action',
                        variant: 'primary',
                    }}
                />
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    description="A banner with a tertiary CTA"
                    action={{
                        type: 'button',
                        label: 'Action',
                        variant: 'tertiary',
                    }}
                />
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    description="A banner with a primary CTA and a dismiss option"
                    action={{
                        type: 'button',
                        label: 'Action',
                        variant: 'primary',
                    }}
                    onClose={() => ({})}
                />
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    description="A banner with a tertiary CTA and a dismiss option"
                    action={{
                        type: 'button',
                        label: 'Action',
                        variant: 'tertiary',
                    }}
                    onClose={() => ({})}
                />
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    description="A banner with a inline link."
                    inlineLinks={[{ label: 'Learn more', href: '#' }]}
                />
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    title="This is a sample title"
                    description="A banner with a inline link in secondary copy."
                    inlineLinks={[{ label: 'Learn more', href: '#' }]}
                />
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    title="This is a sample title"
                    description="A banner with multiple inline links."
                    inlineLinks={[
                        { label: 'Learn more', href: '#' },
                        { label: 'Send feedback', href: '#' },
                    ]}
                />
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    title="This is a sample title"
                    description="Here’s the message below the title."
                />
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    title="This is a sample title"
                    description="Here’s the message below the title."
                    action={{
                        type: 'button',
                        label: 'Action',
                        variant: 'primary',
                    }}
                    onClose={() => ({})}
                />
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    title="This is a sample title"
                    description={getLongDescription()}
                    action={{
                        type: 'button',
                        label: 'Action',
                        variant: 'primary',
                    }}
                />
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    title="This is a sample title"
                    description={getLongDescription()}
                    action={{
                        type: 'button',
                        label: 'Action',
                        variant: 'primary',
                    }}
                    onClose={() => ({})}
                />
            </Stack>
        </Stack>
    )
}

function BannerCopyExamples({ theme }) {
    return (
        <Stack space="medium" align="start">
            <Stack space="large">
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    description="This is a some body text. It can span over two lines or more."
                />
                <Banner
                    type="neutral"
                    icon={<ArchiveIcon />}
                    title="This is a sample title"
                    description="Here’s the message below the title. The copy can span over more than one line."
                />
            </Stack>
        </Stack>
    )
}

function BannerImageExamples({ theme }) {
    return (
        <Stack space="medium" align="start">
            <Stack space="large">
                <Banner
                    type="neutral"
                    title="This is a sample title"
                    description="Here’s the message below the title, sometimes the copy spans over two lines."
                    image={<PromoImage />}
                    inlineLinks={[{ label: 'Learn more', href: '#' }]}
                />
                <Banner
                    type="neutral"
                    description="Here’s the message below the title, sometimes the copy spans over two lines."
                    image={<PromoImage />}
                    inlineLinks={[{ label: 'Learn more', href: '#' }]}
                />
                <Banner
                    type="neutral"
                    title="This is a sample title"
                    description="Here’s the message below the title, sometimes the copy spans over two lines."
                    image={<PromoImage />}
                    inlineLinks={[{ label: 'Learn more', href: '#' }]}
                    onClose={() => ({})}
                />
                <div style={{ '--reactist-banner-min-width': '100%' }}>
                    <Banner
                        type="neutral"
                        description="Here’s the banner with image that fit the whole container width."
                        image={<PromoImage />}
                    />
                </div>
            </Stack>
        </Stack>
    )
}

function BannerContentExamples({ theme }) {
    return (
        <Stack space="medium" align="start">
            <Stack space="large">
                <Banner
                    type="neutral"
                    title="This is a sample title"
                    description="Here’s the message below the title, sometimes the copy spans over two lines."
                >
                    <Text tone="secondary">Some extra content here</Text>
                </Banner>
                <Banner
                    type="neutral"
                    title="This is a sample title"
                    description="Here’s the message below the title, sometimes the copy spans over two lines."
                    action={getButton('Click me!')}
                >
                    <Text tone="secondary">Some extra content here</Text>
                </Banner>
                <Banner
                    type="neutral"
                    title="This is a sample title"
                    description="Here’s the message below the title, sometimes the copy spans over two lines."
                    action={getButton('Click me!')}
                    onClose={() => ({})}
                >
                    <Text tone="secondary">Some extra content here</Text>
                </Banner>
                <Banner
                    type="neutral"
                    title="This is a sample title"
                    description="Here’s the message below the title, sometimes the copy spans over two lines."
                    icon={<ArchiveIcon />}
                >
                    <Text tone="secondary">Some extra content here</Text>
                </Banner>
                <Banner
                    type="neutral"
                    title="This is a sample title"
                    description="Here’s the message below the title, sometimes the copy spans over two lines."
                    inlineLinks={[{ label: 'Learn more', href: '#' }]}
                    icon={<ArchiveIcon />}
                    action={getButton('Click me!')}
                >
                    <Text tone="secondary">Some extra content here</Text>
                </Banner>
                <Banner
                    type="neutral"
                    title="This is a sample title"
                    description="Here’s the message below the title, sometimes the copy spans over two lines."
                    inlineLinks={[{ label: 'Learn more', href: '#' }]}
                    icon={<ArchiveIcon />}
                    action={getButton('Click me!')}
                >
                    <Stack space="large">
                        <Text tone="secondary">Some extra content here</Text>
                    </Stack>
                </Banner>
                <Banner
                    type="neutral"
                    title="This is a sample title"
                    description={getLongDescription()}
                    inlineLinks={[{ label: 'Learn more', href: '#' }]}
                    icon={<ArchiveIcon />}
                    action={getButton('Click me!')}
                >
                    <Stack space="large">
                        <Text tone="secondary">{getLongDescription()}</Text>
                        <Notice tone="info">
                            <Text>Please check the box to continue.</Text>
                        </Notice>
                        <CheckboxField label="Check me!" />
                    </Stack>
                </Banner>
                <Banner
                    type="neutral"
                    title="This is a sample title"
                    description={getLongDescription()}
                    inlineLinks={[{ label: 'Learn more', href: '#' }]}
                    icon={<ArchiveIcon />}
                    action={getButton('Click me!')}
                    onClose={() => ({})}
                >
                    <Stack space="large">
                        <Text tone="secondary">{getLongDescription()}</Text>
                        <Notice tone="info">
                            <Text>Please check the box to continue.</Text>
                        </Notice>
                        <CheckboxField label="Check me!" />
                    </Stack>
                </Banner>
            </Stack>
        </Stack>
    )
}

function DarkModeTemplate() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            padding="xlarge"
            style={{
                backgroundColor: '#202020',
                '--reactist-banner-background-color': '#282828',
                '--reactist-banner-border-color': '#3D3D3D',
                '--reactist-banner-divider-color': '#3D3D3D',
                '--reactist-banner-main-copy-color': '#FFFFFF',
                '--reactist-banner-secondary-copy-color': '#B3B3B3',
            }}
            gap="large"
        >
            <Banner type="neutral" icon={<ArchiveIcon />} description="This is a neutral message" />
            <Banner type="info" description="This is an info message" />
            <Banner type="upgrade" description="This is a upgrade message" />
            <Banner type="experiment" description="This is an experimentalist message" />
            <Banner type="warning" description="This is a warning message" />
            <Banner type="error" description="This is a error message" />
            <Banner type="success" description="This is a success message" />
            <Banner
                type="neutral"
                image={<PromoImage theme="dark" />}
                description="This is a neutral message"
                onClose={() => ({})}
            />
        </Box>
    )
}

export default {
    title: '💬 Feedback/Banner',
    component: Banner,

    parameters: {
        badges: ['accessible'],
        figma: {
            path: 'Web › Components / Todoist › Banner › Banner',
            url: 'https://www.figma.com/design/LYlWNzvhMDh907l07mPPQk/Product-Library---Web?node-id=15487-102766',
        },
    },
}

export const Playground = {
    render: PlaygroundTemplate.bind({}),
    name: 'Playground',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },
    },

    args: {
        type: 'info',
        title: 'Title of the Banner',
        description: 'Description of the Banner.',
    },

    argTypes: {
        type: {
            options: ['neutral', 'info', 'upgrade', 'experiment', 'warning', 'error', 'success'],

            control: {
                type: 'inline-radio',
            },

            defaultValue: 'info',
        },

        image: {
            control: false,
        },

        icon: {
            control: false,
        },

        title: {
            control: {
                type: 'text',
            },

            defaultValue: 'Title of the Banner',
        },

        description: {
            control: {
                type: 'text',
            },

            defaultValue: 'Description of the Banner.',
        },

        action: {
            control: false,
        },

        id: {
            control: false,
        },
    },
}

export const IconVariants = {
    render: () => <BannerIconExamples theme="light" />,
    name: 'Icon variants',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },

        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const Actions = {
    render: () => <BannerActionExamples theme="light" />,
    name: 'Actions',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },

        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const Copy = {
    render: () => <BannerCopyExamples theme="light" />,
    name: 'Copy',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },

        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const Image = {
    render: () => <BannerImageExamples theme="light" />,
    name: 'Image',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },

        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const Content = {
    render: () => <BannerContentExamples theme="light" />,
    name: 'Content',

    parameters: {
        docs: {
            source: {
                type: 'code',
            },
        },

        chromatic: {
            disableSnapshot: false,
        },
    },
}

export const DarkMode = {
    render: DarkModeTemplate.bind({}),
    name: 'Dark mode',

    parameters: {
        docs: {
            source: {
                type: 'dynamic',
            },
        },

        chromatic: {
            disableSnapshot: false,
        },
    },
}
