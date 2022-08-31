import * as React from 'react'
import { Button, ButtonProps } from '../button'
import { CheckboxField } from '../checkbox-field'
import { Heading } from '../heading'
import { AlertIcon } from '../icons/alert-icon'
import { Inline } from '../inline'
import { SelectField } from '../select-field'
// import { action } from '@storybook/addon-actions'
import { Stack } from '../stack'
import { Toast } from './toast'

export default {
    title: 'Design system/Toast',
    parameters: {
        badges: ['accessible'],
    },
}

export function ToastsStory() {
    const [showIcon, setShowIcon] = React.useState(false)
    const [showDismiss, setShowDismiss] = React.useState(false)
    const [actionVariant, setActionVariant] = React.useState<ButtonProps['variant']>('primary')

    const commonProps = {
        icon: showIcon ? <AlertIcon tone="info" /> : undefined,
        onDismiss: showDismiss ? () => undefined : undefined,
    }

    return (
        <Stack space="xxlarge">
            <Inline space="large">
                <CheckboxField
                    label="Show icon?"
                    checked={showIcon}
                    onChange={(event) => setShowIcon(event.target.checked)}
                />
                <CheckboxField
                    label="Show dismiss button?"
                    checked={showDismiss}
                    onChange={(event) => setShowDismiss(event.target.checked)}
                />
            </Inline>
            <SelectField
                label="Action button variant"
                value={actionVariant}
                onChange={(event) => setActionVariant(event.target.value as ButtonProps['variant'])}
                maxWidth="xsmall"
            >
                <option value="primary">primary</option>
                <option value="secondary">secondary</option>
                <option value="tertiary">tertiary</option>
                <option value="quaternary">quaternary</option>
            </SelectField>

            <Stack space="medium">
                <Heading level="2">Message only</Heading>
                <Toast message="Task was completed successfully" {...commonProps} />
            </Stack>

            <Stack space="medium">
                <Heading level="2">Message and description</Heading>
                <Toast
                    message="No connection"
                    description="You'll be able to post comments when online."
                    {...commonProps}
                />
            </Stack>

            <Stack space="medium">
                <Heading level="2">Message and action button</Heading>
                <Toast
                    message="Someone invited you to collaborate on a project"
                    action={<Button variant={actionVariant}>Accept invitation</Button>}
                    {...commonProps}
                />
            </Stack>

            <Stack space="medium">
                <Heading level="2">Message, description, and action button</Heading>
                <Toast
                    message="Someone invited you to collaborate on a project"
                    description="You need to accept the invitation in order to collaborate."
                    action={<Button variant={actionVariant}>Accept invitation</Button>}
                    {...commonProps}
                />
            </Stack>
        </Stack>
    )
}
