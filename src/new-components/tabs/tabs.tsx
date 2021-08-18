import * as React from 'react'
import {
    useTabState,
    Tab as BaseTab,
    TabList as BaseTabList,
    TabPanel as BaseTabPanel,
    TabStateReturn,
} from 'reakit/Tab'

import styles from './tabs.module.css'

const TabsContext = React.createContext<TabStateReturn | null>(null)

type TabsProps = {
    /** The `<Tabs>` component must be composed from a `<TabList>` and corresponding `<TabPanel>` components */
    children: React.ReactElement
}

function Tabs({ children }: TabsProps): React.ReactElement {
    const tabState = useTabState()
    const memoizedTabState = React.useMemo(
        function memoizeTabState() {
            return tabState
        },
        // There is no guarantee that useTabState returns a stable object when there are no changes, so
        // following reakit/Tab's example we only return a new objet when any of its values have changed
        // eslint-disable-next-line
        Object.values(tabState),
    )

    return <TabsContext.Provider value={memoizedTabState}>{children}</TabsContext.Provider>
}

type TabProps = {
    /** The content to render inside of the tab button */
    children: React.ReactElement
}

function Tab({ children }: TabProps): React.ReactElement {
    const tabState = React.useContext(TabsContext)
    return (
        <BaseTab className={styles.tab} {...tabState}>
            {children}
        </BaseTab>
    )
}

type TabListProps =
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

function TabList(props: TabListProps): React.ReactElement {
    const tabState = React.useContext(TabsContext)
    return <BaseTabList {...props} {...tabState} />
}

type TabPanelProps = {
    /** The content to be rendered as the content of the tab */
    children: React.ReactElement
}

function TabPanel({ children }: TabPanelProps): React.ReactElement {
    const tabState = React.useContext(TabsContext)
    return <BaseTabPanel {...tabState}>{children}</BaseTabPanel>
}

export { Tabs, TabList, Tab, TabPanel }
