import * as React from 'react'

import { selectWithNone } from '../utils/storybook-helper'

import { ControlActionButton } from './control-action-button'
import { ControlPresentation } from './control-presentation'

import type { ComponentProps } from 'react'

export default {
    title: 'Design system/ControlPresentation',
    component: ControlPresentation,
    parameters: {
        badges: ['accessible'],
    },
}

type PlaygroundArgs = {
    startSlot: boolean
    endSlot: boolean
    readOnly: boolean
    disabled: boolean
    invalid: boolean
    placeholder: string
    defaultValue: string
    maxWidth: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'full'
}

export function PlaygroundStory({
    startSlot,
    endSlot,
    readOnly,
    disabled,
    invalid,
    placeholder,
    defaultValue,
    maxWidth,
}: PlaygroundArgs) {
    return (
        <section className="story playground">
            <ControlPresentation
                maxWidth={maxWidth}
                startSlot={startSlot ? <InfoIcon /> : undefined}
                endSlot={endSlot ? <ChevronDownIcon /> : undefined}
            >
                <input
                    aria-label="Demo input"
                    placeholder={placeholder}
                    readOnly={readOnly}
                    disabled={disabled}
                    aria-invalid={invalid || undefined}
                    defaultValue={defaultValue}
                />
            </ControlPresentation>
        </section>
    )
}

PlaygroundStory.storyName = 'Playground'
PlaygroundStory.args = {
    startSlot: true,
    endSlot: true,
    readOnly: false,
    disabled: false,
    invalid: false,
    placeholder: 'Select a value',
    defaultValue: '',
}
PlaygroundStory.argTypes = {
    maxWidth: selectWithNone(['xsmall', 'small', 'medium', 'large', 'xlarge', 'full'], 'small'),
    startSlot: { control: { type: 'boolean' } },
    endSlot: { control: { type: 'boolean' } },
    readOnly: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    invalid: { control: { type: 'boolean' } },
    placeholder: { control: { type: 'text' } },
    defaultValue: { control: { type: 'text' } },
}
PlaygroundStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function PlaceholderStory() {
    return (
        <section className="story">
            <ControlPresentation
                maxWidth="small"
                startSlot={<InfoIcon />}
                endSlot={<ChevronDownIcon />}
            >
                <input aria-label="Placeholder" placeholder="Select a value" />
            </ControlPresentation>
        </section>
    )
}

PlaceholderStory.storyName = 'Placeholder'
PlaceholderStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function WithValueStory() {
    return (
        <section className="story">
            <ControlPresentation
                maxWidth="small"
                startSlot={<InfoIcon />}
                endSlot={<ChevronDownIcon />}
            >
                <input aria-label="With value" defaultValue="Sample value" />
            </ControlPresentation>
        </section>
    )
}

WithValueStory.storyName = 'With value'
WithValueStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function ReadOnlyStory() {
    return (
        <section className="story">
            <ControlPresentation
                maxWidth="small"
                startSlot={<InfoIcon />}
                endSlot={<ChevronDownIcon />}
            >
                <input aria-label="Read-only" defaultValue="Sample value" readOnly />
            </ControlPresentation>
        </section>
    )
}

ReadOnlyStory.storyName = 'Read-only'
ReadOnlyStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function DisabledStory() {
    return (
        <section className="story">
            <ControlPresentation
                maxWidth="small"
                startSlot={<InfoIcon />}
                endSlot={<ChevronDownIcon />}
            >
                <input aria-label="Disabled" defaultValue="Sample value" disabled />
            </ControlPresentation>
        </section>
    )
}

DisabledStory.storyName = 'Disabled'
DisabledStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function ErrorStory() {
    return (
        <section className="story">
            <ControlPresentation
                maxWidth="small"
                startSlot={<InfoIcon />}
                endSlot={<ChevronDownIcon />}
            >
                <input aria-label="Error" defaultValue="Invalid value" aria-invalid />
            </ControlPresentation>
        </section>
    )
}

ErrorStory.storyName = 'Error (aria-invalid)'
ErrorStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function EndSlotAsUnitStory() {
    return (
        <section className="story">
            <ControlPresentation maxWidth="small" startSlot={<InfoIcon />} endSlot="kg">
                <input aria-label="Weight" type="number" defaultValue="72" />
            </ControlPresentation>
        </section>
    )
}

EndSlotAsUnitStory.storyName = 'endSlot as trailing unit'
EndSlotAsUnitStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function EndSlotAsClearButtonStory() {
    return (
        <section className="story">
            <ControlPresentation
                maxWidth="small"
                startSlot={<InfoIcon />}
                endSlot={<ControlActionButton icon={<XIcon />} aria-label="Clear" />}
            >
                <input aria-label="Search" defaultValue="sample query" />
            </ControlPresentation>
        </section>
    )
}

EndSlotAsClearButtonStory.storyName = 'endSlot with clear button'
EndSlotAsClearButtonStory.parameters = {
    chromatic: { disableSnapshot: false },
}

export function WrappingSelectStory() {
    return (
        <section className="story">
            <ControlPresentation
                maxWidth="small"
                startSlot={<InfoIcon />}
                endSlot={<ChevronDownIcon />}
            >
                <select
                    aria-label="Favourite fruit"
                    defaultValue="banana"
                    style={{ appearance: 'none' }}
                >
                    <option value="apple">Apple</option>
                    <option value="banana">Banana</option>
                    <option value="cherry">Cherry</option>
                </select>
            </ControlPresentation>
        </section>
    )
}

WrappingSelectStory.storyName = 'Wrapping a <select>'
WrappingSelectStory.parameters = {
    chromatic: { disableSnapshot: false },
}

function ChevronDownIcon(props: ComponentProps<'svg'>) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M11.6464 5.64645C11.8417 5.45118 12.1583 5.45118 12.3536 5.64645C12.5488 5.84171 12.5488 6.15829 12.3536 6.35355L8.35355 10.3536C8.15829 10.5488 7.84171 10.5488 7.64645 10.3536L3.64645 6.35355C3.45118 6.15829 3.45118 5.84171 3.64645 5.64645C3.84171 5.45118 4.15829 5.45118 4.35355 5.64645L8 9.29289L11.6464 5.64645Z"
                fill="currentColor"
            />
        </svg>
    )
}

function InfoIcon(props: ComponentProps<'svg'>) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12.6006 10.0107C12.8285 10.0573 13 10.2593 13 10.501V15.001H14C14.2761 15.001 14.5 15.2248 14.5 15.501C14.4995 15.7767 14.2758 16.001 14 16.001H11C10.7242 16.001 10.5005 15.7767 10.5 15.501C10.5 15.2248 10.7239 15.001 11 15.001H12V11.001H11C10.7242 11.001 10.5005 10.7767 10.5 10.501C10.5 10.2248 10.7239 10.001 11 10.001H12.5L12.6006 10.0107ZM12.3398 7.32031C12.8037 7.32031 13.1796 7.69631 13.1797 8.16016C13.1794 8.62385 12.8036 9 12.3398 9C11.8762 8.99992 11.5003 8.6238 11.5 8.16016C11.5001 7.69636 11.876 7.3204 12.3398 7.32031Z"
                fill="currentColor"
            />
        </svg>
    )
}

function XIcon(props: ComponentProps<'svg'>) {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
            <path
                d="M4 4l8 8m0-8l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
        </svg>
    )
}
