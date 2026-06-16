import * as React from 'react'

import classNames from 'classnames'

import { Box } from '../box'
import { Button, IconButton } from '../button'

import { AnimatedExpansionPanelContent } from './animated-expansion-panel-content'
import { ChevronDownIcon, ChevronDownSmallIcon } from './chevron-down-icon'

import styles from './expansion-panel.module.css'

/** Make the listed keys of `T` optional. */
type SetOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

function useControlledState(value = false, onToggle?: () => void): [boolean, () => void] {
    const [state, setState] = React.useState(value)
    return onToggle === undefined ? [state, () => setState(!state)] : [value, onToggle]
}

type ExpansionPanelState = {
    isExpanded: boolean
    id: string
    onToggleExpand: () => void
}

const ExpansionPanelStateContext = React.createContext<ExpansionPanelState>({
    isExpanded: true,
    id: '',
    onToggleExpand: () => undefined,
})

type ExpansionPanelProps = {
    /**
     * The id to apply to the expanded content, used by the toggle's
     * aria-controls attribute
     */
    id: string
    children: React.ReactNode
} & (
    | {
          /**
           * The default state of the expansion panel when used in uncontrolled
           * mode (e.g. without the `isExpanded` and `onToggleExpand` props)
           */
          initiallyExpanded?: boolean
          isExpanded?: never
          onToggleExpand?: never
      }
    | {
          /** Controlled expand/collapse state. Pair with `onToggleExpand`. */
          isExpanded: boolean
          /** Called when the toggle is clicked. Consumer flips `isExpanded`. */
          onToggleExpand: () => void
          initiallyExpanded?: never
      }
)

/**
 * Animated expand/collapse primitive. Compose with `ExpansionPanelHeader`,
 * `ExpansionPanelToggle`, and `ExpansionPanelContent` as children.
 *
 * Supports both controlled (`isExpanded` + `onToggleExpand`) and uncontrolled
 * (`initiallyExpanded`) modes; mixing the two logs a warning and falls back to
 * controlled.
 */
function ExpansionPanel({ children, initiallyExpanded, id, ...props }: ExpansionPanelProps) {
    if (
        initiallyExpanded !== undefined &&
        (props.isExpanded !== undefined || props.onToggleExpand !== undefined)
    ) {
        // eslint-disable-next-line no-console
        console.warn('[ExpansionPanel]: cannot use initiallyExpanded in controlled mode')
        initiallyExpanded = undefined
    }

    const [isExpanded, onToggleExpand] = useControlledState(
        props.isExpanded || initiallyExpanded,
        props.onToggleExpand,
    )
    const contextValue = React.useMemo(
        () => ({ isExpanded, onToggleExpand, id }),
        [isExpanded, onToggleExpand, id],
    )

    return (
        <ExpansionPanelStateContext.Provider value={contextValue}>
            <Box>{children}</Box>
        </ExpansionPanelStateContext.Provider>
    )
}

/**
 * Semantic wrapper for the panel's header row. A thin alias over `Box` — use it
 * to colocate the toggle with sibling controls (e.g. add/delete buttons) without
 * making the whole row clickable.
 */
function ExpansionPanelHeader({
    children,
    ...props
}: React.ComponentProps<typeof Box>): React.ReactElement {
    return <Box {...props}>{children}</Box>
}

type ExpansionPanelToggleProps = {
    /**
     * Required accessible label for the toggle button. The consumer owns
     * localization — typically something like `"Toggle list of Projects"`.
     */
    'aria-label': string
    'aria-describedby'?: string

    /** Chevron icon size. Defaults to `'24'`. */
    size?: '24' | '16'
} & (
    | ({
          children: React.ReactNode
      } & Omit<SetOptional<React.ComponentProps<typeof Button>, 'variant'>, 'size'>)
    | ({
          children?: never
      } & Omit<SetOptional<React.ComponentProps<typeof IconButton>, 'variant'>, 'size' | 'icon'>)
)

/**
 * Button that toggles the panel's expand/collapse state. Wires up
 * `aria-expanded` and `aria-controls` automatically from the parent
 * `ExpansionPanel`'s context.
 *
 * Renders an `IconButton` when no children are passed, or a full-width `Button`
 * with a chevron start icon otherwise. Remaining props forward to the underlying
 * button.
 */
function ExpansionPanelToggle({
    exceptionallySetClassName,
    children,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    size = '24',
    ...props
}: ExpansionPanelToggleProps) {
    const { id, isExpanded, onToggleExpand } = React.useContext(ExpansionPanelStateContext)

    const ChevronIcon = size === '24' ? ChevronDownIcon : ChevronDownSmallIcon

    if (!children) {
        return (
            <IconButton
                variant="quaternary"
                size="small"
                {...props}
                onClick={onToggleExpand}
                aria-expanded={isExpanded}
                aria-controls={id}
                aria-label={ariaLabel}
                aria-describedby={ariaDescribedBy}
                icon={<ChevronIcon className={styles.toggleIcon} />}
                exceptionallySetClassName={classNames(styles.toggle, exceptionallySetClassName)}
            />
        )
    }

    return (
        <Button
            variant="quaternary"
            width="full"
            align="start"
            {...props}
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
            aria-controls={id}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            startIcon={<ChevronIcon className={styles.toggleIcon} />}
            exceptionallySetClassName={classNames(styles.toggle, exceptionallySetClassName)}
        >
            {children}
        </Button>
    )
}

/**
 * Container for the panel's expandable content. Animates height on
 * expand/collapse driven by the parent `ExpansionPanel`'s state. Extra props
 * forward to the inner `Box`.
 */
function ExpansionPanelContent({
    children,
    onEntered,
    ...props
}: Omit<React.ComponentProps<typeof Box>, 'id'> & {
    /** Called once the expand animation finishes (not fired on collapse). */
    onEntered?: () => void
}) {
    const { isExpanded, id } = React.useContext(ExpansionPanelStateContext)
    return (
        <Box>
            <AnimatedExpansionPanelContent isExpanded={isExpanded} onEntered={onEntered}>
                <Box {...props} id={id}>
                    {children}
                </Box>
            </AnimatedExpansionPanelContent>
        </Box>
    )
}

export { ExpansionPanel, ExpansionPanelContent, ExpansionPanelHeader, ExpansionPanelToggle }
