import * as React from 'react'
import classNames from 'classnames'
import {
    useTabStore,
    Tab as BaseTab,
    TabList as BaseTabList,
    TabPanel as BaseTabPanel,
    TabPanelProps as BaseTabPanelProps,
    TabStore,
    RoleProps,
} from '@ariakit/react'
import { Inline } from '../inline'
import type { ObfuscatedClassName, Space } from '../utils/common-types'

import styles from './tabs.module.css'
import { Box } from '../box'

type TabsContextValue = Required<Pick<TabsProps, 'variant'>> & {
    tabStore: TabStore
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

interface TabsProps {
    /**
     * The `<Tabs>` component must be composed from a `<TabList>` and corresponding `<TabPanel>`
     * components
     */
    children: React.ReactNode

    /**
     * Determines the look and feel of the tabs
     */
    variant?: 'themed' | 'neutral'

    /**
     * The id of the selected tab. Assigning a value makes this a controlled component
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
    const tabStore = useTabStore({
        defaultSelectedId,
        selectedId,
        setSelectedId: onSelectedIdChange,
    })
    const actualSelectedId = tabStore.useState('selectedId')

    const memoizedTabState = React.useMemo(
        () => ({ tabStore, variant, selectedId: selectedId ?? actualSelectedId ?? null }),
        [variant, tabStore, selectedId, actualSelectedId],
    )
    return <TabsContext.Provider value={memoizedTabState}>{children}</TabsContext.Provider>
}

interface TabProps extends ObfuscatedClassName, Pick<RoleProps, 'render'> {
    /**
     * The content to render inside of the tab button
     */
    children: React.ReactNode

    /**
     * The tab's identifier. This must match its corresponding `<TabPanel>`'s id
     */
    id: string

    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

/**
 * Represents the individual tab elements within the group. Each `<Tab>` must have a corresponding `<TabPanel>` component.
 */
const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab(
    { children, id, exceptionallySetClassName, render },
    ref,
): React.ReactElement | null {
    const tabContextValue = React.useContext(TabsContext)
    if (!tabContextValue) return null

    const { variant, tabStore } = tabContextValue
    const className = classNames(exceptionallySetClassName, styles.tab, styles[`tab-${variant}`])

    return (
        <BaseTab render={render} className={className} id={id} store={tabStore} ref={ref}>
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
function TabList({ children, space, ...props }: TabListProps): React.ReactElement | null {
    const tabContextValue = React.useContext(TabsContext)

    if (!tabContextValue) {
        return null
    }

    const { tabStore, variant } = tabContextValue

    return (
        // The extra <div> prevents <Inline>'s negative margins from collapsing when used in a flex container
        // which will render the track with the wrong height
        <div>
            <BaseTabList
                store={tabStore}
                render={<Box position="relative" width="maxContent" />}
                {...props}
            >
                <Box className={[styles.track, styles[`track-${variant}`]]} />
                <Inline space={space}>{children}</Inline>
            </BaseTabList>
        </div>
    )
}

interface TabPanelProps
    extends React.HTMLAttributes<HTMLDivElement>,
        Pick<BaseTabPanelProps, 'render'> {
    /** The content to be rendered inside the tab */
    children?: React.ReactNode

    /** The tabPanel's identifier. This must match its corresponding `<Tab>`'s id */
    id: string

    /**
     * By default, the tab panel's content is always rendered even when they are not active. This
     * behaviour can be changed to 'active', which renders only when the tab is active, and 'lazy',
     * meaning while inactive tab panels will not be rendered initially, they will remain mounted
     * once they are active until the entire Tabs tree is unmounted.
     */
    renderMode?: 'always' | 'active' | 'lazy'
}

/**
 * Used to define the content to be rendered when a tab is active. Each `<TabPanel>` must have a
 * corresponding `<Tab>` component.
 */
const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
    { children, id, renderMode = 'always', ...props },
    ref,
): React.ReactElement | null {
    const tabContextValue = React.useContext(TabsContext)
    const [tabRendered, setTabRendered] = React.useState(false)
    const selectedId = tabContextValue?.tabStore.useState('selectedId')
    const tabIsActive = selectedId === id

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

    const { tabStore } = tabContextValue
    const shouldRender =
        renderMode === 'always' ||
        (renderMode === 'active' && tabIsActive) ||
        (renderMode === 'lazy' && (tabIsActive || tabRendered))

    return shouldRender ? (
        <BaseTabPanel {...props} tabId={id} store={tabStore} ref={ref}>
            {children}
        </BaseTabPanel>
    ) : null
})

type TabAwareSlotProps = {
    /**
     * Render prop used to provide the content to be rendered inside the slot. The render prop will
     * be called with the current `selectedId`
     */
    children: (provided: { selectedId?: string | null }) => React.ReactElement | null
}

/**
 * Allows content to be rendered based on the current tab being selected while outside of the
 * TabPanel component. Can be placed freely within the main `<Tabs>` component.
 */
function TabAwareSlot({ children }: TabAwareSlotProps): React.ReactElement | null {
    const tabContextValue = React.useContext(TabsContext)
    const selectedId = tabContextValue?.tabStore.useState('selectedId')
    return tabContextValue ? children({ selectedId }) : null
}

export { Tab, Tabs, TabList, TabPanel, TabAwareSlot }
