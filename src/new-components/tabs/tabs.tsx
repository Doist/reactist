import * as React from 'react'
import classNames from 'classnames'
import {
    useTabState,
    Tab as BaseTab,
    TabList as BaseTabList,
    TabPanel as BaseTabPanel,
    TabStateReturn,
} from 'reakit/Tab'
import { Inline } from '../inline'
import type { ResponsiveProp } from '../responsive-props'
import type { Space } from '../common-types'

import styles from './tabs.module.css'

const TabsContext = React.createContext<(TabStateReturn & Omit<TabsProps, 'children'>) | null>(null)

type TabsProps = {
    /** The `<Tabs>` component must be composed from a `<TabList>` and corresponding `<TabPanel>` components */
    children: React.ReactElement
    /**
     * Determines the primary colour of the tabs
     */
    color: 'primary' | 'secondary' | 'tertiary'
    /**
     * Determines the style of the tabs
     */
    variant: 'normal' | 'plain'
}

/**
 * Used to group components that compose a set of tabs. There can only be one active tab within the same `<Tabs>` group.
 */
function Tabs({ children, color = 'primary', variant = 'normal' }: TabsProps): React.ReactElement {
    const tabState = useTabState()
    const memoizedTabState = React.useMemo(
        function memoizeTabState() {
            return {
                ...tabState,
                color,
                variant,
            }
        },
        // There is no guarantee that useTabState returns a stable object when there are no changes, so
        // following reakit/Tab's example we only return a new objet when any of its values have changed
        // eslint-disable-next-line
        [color, variant, ...Object.values(tabState)],
    )

    return <TabsContext.Provider value={memoizedTabState}>{children}</TabsContext.Provider>
}

type TabProps = {
    /** The content to render inside of the tab button */
    children: React.ReactElement
}

/**
 * Represents the individual tab elements within the group. Each `<Tab>` must have a corresponding `<TabPanel>` component.
 */
function Tab({ children }: TabProps): React.ReactElement | null {
    const tabContextValue = React.useContext(TabsContext)

    if (!tabContextValue) {
        return null
    }

    const { color, variant, ...tabState } = tabContextValue

    return (
        <BaseTab
            className={classNames(styles.tab, styles[`tab-${variant}`], styles[`tab-${color}`])}
            {...tabState}
        >
            {children}
        </BaseTab>
    )
}

type TabListProps = (
    | {
          /** Label the tab list for assistive technologies. This must be provided if `aria-labelledby` is omitted */
          'aria-label': string
      }
    | {
          /**
           * One or more element ID's used to label the tab list for assistive technologies. Required if
           * `aria-label` is omitted
           * */
          'aria-labelledby': string
      }
) & {
    /**
     * A list of `<Tab>` elements
     */
    children: React.ReactElement

    /**
     * Controls the spacing between tabs
     */
    space?: ResponsiveProp<Space>
}

/**
 * A component used to group `<Tab>` elements together.
 */
function TabList({ children, space = 'medium', ...props }: TabListProps): React.ReactElement {
    const tabState = React.useContext(TabsContext)
    return (
        <BaseTabList {...props} {...tabState}>
            <Inline space={space}>{children}</Inline>
        </BaseTabList>
    )
}

type TabPanelProps = {
    /** The content to be rendered inside the tab */
    children: React.ReactElement
}

/**
 * Used to define the content to be rendered when a tab is active. Each `<TabPanel>` must have a corresponding `<Tab>` component.
 */
function TabPanel({ children }: TabPanelProps): React.ReactElement {
    const tabState = React.useContext(TabsContext)
    return <BaseTabPanel {...tabState}>{children}</BaseTabPanel>
}

export { Tabs, TabList, Tab, TabPanel }
