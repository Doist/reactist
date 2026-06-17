import * as React from 'react'

import classNames from 'classnames'

import { Box } from '../box'
import { Button, IconButton } from '../button'

import { AnimatedExpansionPanelContent } from './animated-expansion-panel-content'
import { ChevronDownIcon, ChevronDownSmallIcon } from './chevron-down-icon'

import styles from './expansion-panel.module.css'

/**
 * Returns the `[isExpanded, toggle]` pair. Controlled mode is derived from
 * whether `isExpanded` is provided (not from `onToggleExpand`), so a controlled
 * panel always reflects later prop updates. The uncontrolled toggle is a stable
 * callback so the context value below doesn't change on every render.
 */
function useControlledState(
    controlledValue: boolean | undefined,
    onToggle: (() => void) | undefined,
    initiallyExpanded: boolean | undefined,
): [boolean, () => void] {
    const [internalState, setInternalState] = React.useState(initiallyExpanded ?? false)
    const toggleInternal = React.useCallback(() => setInternalState((expanded) => !expanded), [])

    if (controlledValue !== undefined) {
        return [controlledValue, onToggle ?? toggleInternal]
    }
    return [internalState, toggleInternal]
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
     * The id applied to the expanded content, used by the toggle's
     * `aria-controls` attribute. Defaults to an auto-generated id; provide one
     * only when you need a specific, stable DOM id.
     */
    id?: string
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
 * (`initiallyExpanded`) modes.
 */
const ExpansionPanel = React.forwardRef<HTMLDivElement, ExpansionPanelProps>(
    function ExpansionPanel({ children, initiallyExpanded, id: providedId, ...props }, ref) {
        if (
            initiallyExpanded !== undefined &&
            (props.isExpanded !== undefined || props.onToggleExpand !== undefined)
        ) {
            // eslint-disable-next-line no-console
            console.warn('[ExpansionPanel]: cannot use initiallyExpanded in controlled mode')
        }
        if (props.isExpanded !== undefined && props.onToggleExpand === undefined) {
            // eslint-disable-next-line no-console
            console.warn('[ExpansionPanel]: `isExpanded` must be paired with `onToggleExpand`')
        }

        const generatedId = React.useId()
        const id = providedId ?? generatedId

        const [isExpanded, onToggleExpand] = useControlledState(
            props.isExpanded,
            props.onToggleExpand,
            initiallyExpanded,
        )
        const contextValue = React.useMemo(
            () => ({ isExpanded, onToggleExpand, id }),
            [isExpanded, onToggleExpand, id],
        )

        return (
            <ExpansionPanelStateContext.Provider value={contextValue}>
                <Box ref={ref}>{children}</Box>
            </ExpansionPanelStateContext.Provider>
        )
    },
)

type ExpansionPanelHeaderProps = React.ComponentProps<typeof Box>

/**
 * Semantic wrapper for the panel's header row. A thin alias over `Box` — use it
 * to colocate the toggle with sibling controls (e.g. add/delete buttons) without
 * making the whole row clickable.
 */
const ExpansionPanelHeader = React.forwardRef<HTMLDivElement, ExpansionPanelHeaderProps>(
    function ExpansionPanelHeader({ children, ...props }, ref) {
        return (
            <Box ref={ref} {...props}>
                {children}
            </Box>
        )
    },
)

/**
 * Props the toggle owns internally and consumers must not override — omitted
 * from the public prop types. (`size` here refers to the chevron size below, not
 * the button's own `size`, which is also internal.)
 */
type InternalToggleProps =
    | 'variant'
    | 'size'
    | 'icon'
    | 'startIcon'
    | 'onClick'
    | 'aria-expanded'
    | 'aria-controls'
    | 'aria-label'
    | 'children'

type ButtonTogglePassthrough = Omit<React.ComponentProps<typeof Button>, InternalToggleProps>
type IconButtonTogglePassthrough = Omit<
    React.ComponentProps<typeof IconButton>,
    InternalToggleProps
>

type ExpansionPanelToggleProps =
    | ({
          /**
           * Visible label for the button. `aria-label` is optional here since
           * the children already name the button.
           */
          children: React.ReactNode
          'aria-label'?: string
          /** Chevron icon size. Defaults to `'24'`. */
          size?: '24' | '16'
      } & ButtonTogglePassthrough)
    | ({
          children?: never
          /** Required accessible label for the icon-only toggle. */
          'aria-label': string
          /** Chevron icon size. Defaults to `'24'`. */
          size?: '24' | '16'
      } & IconButtonTogglePassthrough)

/**
 * Button that toggles the panel's expand/collapse state. Wires up `onClick`,
 * `aria-expanded`, and `aria-controls` automatically from the parent
 * `ExpansionPanel`'s context.
 *
 * Renders an `IconButton` when no children are passed (`aria-label` required),
 * or a full-width `Button` with a chevron start icon otherwise. Remaining props
 * forward to the underlying button.
 */
const ExpansionPanelToggle = React.forwardRef<HTMLButtonElement, ExpansionPanelToggleProps>(
    function ExpansionPanelToggle(
        { exceptionallySetClassName, children, 'aria-label': ariaLabel, size = '24', ...props },
        ref,
    ) {
        const { id, isExpanded, onToggleExpand } = React.useContext(ExpansionPanelStateContext)

        const ChevronIcon = size === '24' ? ChevronDownIcon : ChevronDownSmallIcon

        // `props` is the toggle's discriminated union minus the destructured keys.
        // Destructuring `children` doesn't narrow the rest, so assert the variant
        // we've already branched on.
        if (!children) {
            return (
                <IconButton
                    ref={ref}
                    variant="quaternary"
                    size="small"
                    {...(props as unknown as Omit<
                        IconButtonTogglePassthrough,
                        'exceptionallySetClassName'
                    >)}
                    onClick={onToggleExpand}
                    aria-expanded={isExpanded}
                    aria-controls={id}
                    // Required by the icon-only variant's type; the `!children` branch guarantees it.
                    aria-label={ariaLabel as string}
                    icon={<ChevronIcon className={styles.toggleIcon} />}
                    exceptionallySetClassName={classNames(styles.toggle, exceptionallySetClassName)}
                />
            )
        }

        return (
            <Button
                ref={ref}
                variant="quaternary"
                width="full"
                align="start"
                {...(props as unknown as Omit<
                    ButtonTogglePassthrough,
                    'exceptionallySetClassName'
                >)}
                onClick={onToggleExpand}
                aria-expanded={isExpanded}
                aria-controls={id}
                aria-label={ariaLabel}
                startIcon={<ChevronIcon className={styles.toggleIcon} />}
                exceptionallySetClassName={classNames(styles.toggle, exceptionallySetClassName)}
            >
                {children}
            </Button>
        )
    },
)

type ExpansionPanelContentProps = Omit<React.ComponentProps<typeof Box>, 'id'> & {
    /** Called once the expand animation finishes (not fired on collapse). */
    onEntered?: () => void
}

/**
 * Container for the panel's expandable content. Animates height on
 * expand/collapse driven by the parent `ExpansionPanel`'s state. Extra props
 * forward to the inner `Box`.
 */
const ExpansionPanelContent = React.forwardRef<HTMLDivElement, ExpansionPanelContentProps>(
    function ExpansionPanelContent({ children, onEntered, ...props }, ref) {
        const { isExpanded, id } = React.useContext(ExpansionPanelStateContext)
        return (
            <Box>
                <AnimatedExpansionPanelContent isExpanded={isExpanded} onEntered={onEntered}>
                    <Box {...props} ref={ref} id={id}>
                        {children}
                    </Box>
                </AnimatedExpansionPanelContent>
            </Box>
        )
    },
)

export { ExpansionPanel, ExpansionPanelContent, ExpansionPanelHeader, ExpansionPanelToggle }
export type {
    ExpansionPanelContentProps,
    ExpansionPanelHeaderProps,
    ExpansionPanelProps,
    ExpansionPanelToggleProps,
}
