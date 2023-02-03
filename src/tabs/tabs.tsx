import * as React from 'react'
import classNames from 'classnames'
import {
    useTabState,
    Tab as BaseTab,
    TabList as BaseTabList,
    TabPanel as BaseTabPanel,
    TabState,
} from 'ariakit/tab'
import { Inline } from '../inline'
import { usePrevious } from '../hooks/use-previous'
import { polymorphicComponent } from '../utils/polymorphism'
import type { Space } from '../common-types'

import styles from './tabs.module.css'
import { Box } from '../box'

type TabsContextValue = {
    tabState: TabState
} & Required<Pick<TabsProps, 'variant'>>

const TabsContext = React.createContext<TabsContextValue | null>(null)

type TabsProps = {
    /** The `<Tabs>` component must be composed from a `<TabList>` and corresponding `<TabPanel>` components */
    children: React.ReactNode
    /**
     * Determines the look and feel of the tabs.
     */
    variant?: 'themed' | 'neutral'
    /**
     * The id of the selected tab. Assigning a value makes this a
     * controlled component
     */
    selectedId?: string | null
    /**
     * The tab to initially select. This can be used if the component should not
     * be a controlled component but needs to have a tab selected
     */
    defaultSelectedId?: string | null
    /**
     * Called with the tab id when a tab is selected
     */
    onSelectedIdChange?: (selectedId: string | null | undefined) => void
}

/**
 * Used to group components that compose a set of tabs. There can only be one active tab within the same `<Tabs>` group.
 */
function Tabs({
    children,
    selectedId,
    defaultSelectedId,
    variant = 'neutral',
    onSelectedIdChange,
}: TabsProps): React.ReactElement {
    const tabState = useTabState({ selectedId, setSelectedId: onSelectedIdChange })
    const previousDefaultSelectedId = usePrevious(defaultSelectedId)
    const { selectedId: actualSelectedId, select } = tabState

    React.useEffect(
        function selectDefaultTab() {
            if (
                !selectedId &&
                defaultSelectedId !== previousDefaultSelectedId &&
                defaultSelectedId !== actualSelectedId &&
                defaultSelectedId !== undefined
            ) {
                select(defaultSelectedId)
            }
        },
        [selectedId, defaultSelectedId, actualSelectedId, select, previousDefaultSelectedId],
    )

    const memoizedTabState = React.useMemo(
        function memoizeTabState() {
            return {
                tabState,
                variant,
            }
        },
        [variant, tabState],
    )

    return <TabsContext.Provider value={memoizedTabState}>{children}</TabsContext.Provider>
}

type TabProps = {
    /** The content to render inside of the tab button */
    children: React.ReactNode

    /** The tab's identifier. This must match its corresponding `<TabPanel>`'s id */
    id: string
}

/**
 * Represents the individual tab elements within the group. Each `<Tab>` must have a corresponding `<TabPanel>` component.
 */
const Tab = polymorphicComponent<'button', TabProps>(function Tab(
    { as, children, id, exceptionallySetClassName, ...props },
    ref,
): React.ReactElement | null {
    const tabContextValue = React.useContext(TabsContext)

    if (!tabContextValue) {
        return null
    }

    const { variant, tabState } = tabContextValue

    return (
        <BaseTab
            {...props}
            as={as}
            className={classNames(exceptionallySetClassName, styles.tab, styles[`tab-${variant}`])}
            id={id}
            state={tabState}
            ref={ref}
        >
            {children}
        </BaseTab>
    )
})

type TabListProps = (
    | {
          /** Labels the tab list for assistive technologies. This must be provided if `aria-labelledby` is omitted. */
          'aria-label': string
      }
    | {
          /**
           * One or more element IDs used to label the tab list for assistive technologies. Required if
           * `aria-label` is omitted.
           */
          'aria-labelledby': string
      }
    | {
          /**
           * For cases where multiple instances of the tab list exists, the duplicates may be marked as aria-hidden
           */
          'aria-hidden': boolean
      }
) & {
    /**
     * A list of `<Tab>` elements
     */
    children: React.ReactNode

    /**
     * Controls the spacing between tabs
     */
    space?: Space
}

/**
 * A component used to group `<Tab>` elements together.
 */
function TabList({
    children,
    space = 'xsmall',
    ...props
}: TabListProps): React.ReactElement | null {
    const tabContextValue = React.useContext(TabsContext)

    if (!tabContextValue) {
        return null
    }

    const { tabState, variant } = tabContextValue

    return (
        // The extra <Box> prevents <Inline>'s negative margins from collapsing when used in a flex container
        // which will render the track with the wrong height
        <Box>
            <BaseTabList
                state={tabState}
                as={Box}
                position="relative"
                width="maxContent"
                {...props}
            >
                <Box className={[styles.track, styles[`track-${variant}`]]} />
                <Inline space={space}>{children}</Inline>
            </BaseTabList>
        </Box>
    )
}

type TabPanelProps = {
    /** The content to be rendered inside the tab */
    children?: React.ReactNode

    /** The tabPanel's identifier. This must match its corresponding `<Tab>`'s id */
    id: string

    /**
     * By default, the tab panel's content is always rendered even when they are not active. This behaviour can be changed to
     * 'active', which renders only when the tab is active, and 'lazy', meaning while inactive tab panels will not be rendered
     * initially, they will remain mounted once they are active until the entire Tabs tree is unmounted.
     */
    render?: 'always' | 'active' | 'lazy'
}

/**
 * Used to define the content to be rendered when a tab is active. Each `<TabPanel>` must have a corresponding `<Tab>` component.
 */
const TabPanel = polymorphicComponent<'div', TabPanelProps, 'omitClassName'>(function TabPanel(
    { children, id, as, render = 'always', ...props },
    ref,
): React.ReactElement | null {
    const tabContextValue = React.useContext(TabsContext)
    const [tabRendered, setTabRendered] = React.useState(false)
    const tabIsActive = tabContextValue?.tabState.selectedId === id

    React.useEffect(
        function trackTabRenderedState() {
            if (!tabRendered && tabIsActive) {
                setTabRendered(true)
            }
        },
        [tabRendered, tabIsActive],
    )

    if (!tabContextValue) {
        return null
    }

    const { tabState } = tabContextValue
    const shouldRender =
        render === 'always' ||
        (render === 'active' && tabIsActive) ||
        (render === 'lazy' && (tabIsActive || tabRendered))

    return shouldRender ? (
        <BaseTabPanel tabId={id} {...props} state={tabState} as={as} ref={ref}>
            {children}
        </BaseTabPanel>
    ) : null
})

type TabAwareSlotProps = {
    /**
     * Render prop used to provide the content to be rendered inside the slot. The render prop will be
     * called with the current `selectedId`
     */
    children: (provided: { selectedId?: string | null }) => React.ReactElement | null
}

/**
 * Allows content to be rendered based on the current tab being selected while outside of the TabPanel
 * component. Can be placed freely within the main `<Tabs>` component.
 */
function TabAwareSlot({ children }: TabAwareSlotProps): React.ReactElement | null {
    const tabContextValue = React.useContext(TabsContext)
    return tabContextValue ? children({ selectedId: tabContextValue?.tabState.selectedId }) : null
}

export { Tab, Tabs, TabList, TabPanel, TabAwareSlot }
