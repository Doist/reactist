import * as React from 'react'
import { action as storybookAction } from '@storybook/addon-actions'
import { Button, ButtonProps } from '../button'
import { CheckboxField } from '../checkbox-field'
import { Heading } from '../heading'
import { AlertIcon } from '../icons/alert-icon'
import { Inline } from '../inline'
import { SelectField } from '../select-field'
import { Stack } from '../stack'
import { Toast, ToastProps } from './toast'
import { Spinner } from '../spinner'
import { PasswordVisibleIcon } from '../icons/password-visible-icon'

export default {
    title: 'Design system/Toast',
    parameters: {
        badges: ['accessible'],
    },
}

export function ToastsStory() {
    const [showIcon, setShowIcon] = React.useState(false)
    const [showDismiss, setShowDismiss] = React.useState(false)
    const [actionVariant, setActionVariant] = React.useState<
        ButtonProps['variant'] | 'default' | 'loading' | 'icon-button'
    >('default')

    const commonProps = {
        icon: showIcon ? <AlertIcon tone="info" /> : undefined,
        onDismiss: showDismiss ? () => undefined : undefined,
    }

    const onClick = storybookAction('Toast action')
    const action: ToastProps['action'] =
        actionVariant === 'default' ? (
            { label: 'Accept invitation', onClick }
        ) : actionVariant === 'loading' ? (
            <Spinner size={16} />
        ) : actionVariant === 'icon-button' ? (
            <Button
                variant="quaternary"
                icon={<PasswordVisibleIcon />}
                aria-label="Done"
                size="small"
                onClick={onClick}
            />
        ) : (
            <Button variant={actionVariant} onClick={onClick}>
                Accept invitation
            </Button>
        )

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
                <option value="default">default</option>
                <optgroup label="Custom button">
                    <option value="primary">primary</option>
                    <option value="secondary">secondary</option>
                    <option value="tertiary">tertiary</option>
                    <option value="quaternary">quaternary</option>
                </optgroup>
                <optgroup label="Custom element">
                    <option value="icon-button">icon-button</option>
                    <option value="loading">loading</option>
                </optgroup>
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
                    action={action}
                    {...commonProps}
                />
            </Stack>

            <Stack space="medium">
                <Heading level="2">Message, description, and action button</Heading>
                <Toast
                    message="Someone invited you to collaborate on a project"
                    description="You need to accept the invitation in order to collaborate."
                    action={action}
                    {...commonProps}
                />
            </Stack>
        </Stack>
    )
}
