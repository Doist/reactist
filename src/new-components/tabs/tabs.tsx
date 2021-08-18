import * as React from 'react'
import {
    useTabState,
    Tab as BaseTab,
    TabList as BaseTabList,
    TabPanel as BaseTabPanel,
    TabStateReturn,
} from 'reakit/Tab'

const TabsContext = React.createContext<TabStateReturn | null>(null)

type TabsProps = {
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
    children: React.ReactElement
}

function Tab({ children }: TabProps): React.ReactElement {
    const tabState = React.useContext(TabsContext)
    return <BaseTab {...tabState}>{children}</BaseTab>
}

type TabListProps = { 'aria-label': string } | { 'aria-labelledby': string }

function TabList(props: TabListProps): React.ReactElement {
    const tabState = React.useContext(TabsContext)
    return <BaseTabList {...props} {...tabState} />
}

type TabPanelProps = {
    children: React.ReactElement
}

function TabPanel({ children }: TabPanelProps): React.ReactElement {
    const tabState = React.useContext(TabsContext)
    return <BaseTabPanel {...tabState}>{children}</BaseTabPanel>
}

export { Tabs, TabList, Tab, TabPanel }
