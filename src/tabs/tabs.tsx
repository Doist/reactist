import * as React from 'react'

import {
    Tab as BaseTab,
    TabList as BaseTabList,
    TabPanel as BaseTabPanel,
    useStoreState,
    useTabStore,
} from '@ariakit/react'
import classNames from 'classnames'

import { Box } from '../box'
import { Inline } from '../inline'

import styles from '../segmented-control/segmented-control.module.css'

import type {
    TabPanelProps as BaseTabPanelProps,
    TabProps as BaseTabProps,
    TabStore,
} from '@ariakit/react'
import type { BoxJustifyContent } from '../box'
import type { ObfuscatedClassName, Space } from '../utils/common-types'

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

    return <TabsContext.Provider value={{ tabStore, variant }}>{children}</TabsContext.Provider>
}

interface TabProps
    extends ObfuscatedClassName,
        Omit<BaseTabProps, 'store' | 'className' | 'children' | 'id'> {
    /**
     * The content to render inside of the tab button
     */
    children: React.ReactNode

    /**
     * The tab's identifier. This must match its corresponding `<TabPanel>`'s id
     */
    id: string

    /**
     * Defines wether or not the tab is disabled.
     */
    disabled?: boolean
}

/**
 * Represents the individual tab elements within the group. Each `<Tab>` must have a corresponding `<TabPanel>` component.
 */
const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab(
    {
        children,
        id,
        disabled,
        exceptionallySetClassName,
        accessibleWhenDisabled = false,
        render,
        ...props
    },
    ref,
): React.ReactElement | null {
    const tabContextValue = React.useContext(TabsContext)
    if (!tabContextValue) return null

    const { variant, tabStore } = tabContextValue
    const className = classNames(exceptionallySetClassName, styles.item, styles[`item-${variant}`])

    return (
        <BaseTab
            id={id}
            ref={ref}
            disabled={disabled}
            store={tabStore}
            className={className}
            accessibleWhenDisabled={accessibleWhenDisabled}
            render={render ?? (({ style, ...renderProps }) => <button {...renderProps} />)}
            {...props}
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

    /**
     * The width of the tab list.
     *
     * - `'maxContent'`: Each tab will be as wide as its content.
     * - `'full'`: Each tab will be as wide as the tab list.
     *
     * @default 'maxContent'
     */
    width?: 'maxContent' | 'full'

    /**
     * How to align the tabs within the tab list.
     *
     * @default 'start'
     */
    align?: 'start' | 'center' | 'end'
} & ObfuscatedClassName

/**
 * A component used to group `<Tab>` elements together.
 */
function TabList({
    children,
    space,
    width = 'maxContent',
    align = 'start',
    exceptionallySetClassName,
    ...props
}: TabListProps): React.ReactElement | null {
    const tabContextValue = React.useContext(TabsContext)

    if (!tabContextValue) {
        return null
    }

    const { tabStore, variant } = tabContextValue

    const justifyContentAlignMap: Record<typeof align, BoxJustifyContent> = {
        start: 'flexStart',
        end: 'flexEnd',
        center: 'center',
    }

    return (
        // This extra <Box> not only provides alignment for the tabs, but also prevents <Inline>'s
        // negative margins from collapsing when used in a flex container which will render the
        // track with the wrong height
        <Box
            display="flex"
            justifyContent={width === 'full' ? 'center' : justifyContentAlignMap[align]}
        >
            <BaseTabList
                store={tabStore}
                render={
                    <Box
                        display="flex"
                        position="relative"
                        width={width}
                        className={classNames(
                            exceptionallySetClassName,
                            styles.list,
                            styles[`list-${variant}`],
                        )}
                    />
                }
                {...props}
            >
                <Inline
                    space={space}
                    exceptionallySetClassName={classNames(
                        space === undefined ? styles['items-default-spacing'] : null,
                        width === 'full' ? styles['full-items'] : null,
                    )}
                >
                    {children}
                </Inline>
            </BaseTabList>
        </Box>
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
    const selectedId = useStoreState(tabContextValue?.tabStore, 'selectedId')
    const tabIsActive = selectedId === id

    React.useEffect(
        function trackTabRenderedState() {
            if (!tabRendered && tabIsActive) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
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
    const selectedId = useStoreState(tabContextValue?.tabStore, 'selectedId')
    return tabContextValue ? children({ selectedId }) : null
}

export { Tab, TabAwareSlot, TabList, TabPanel, Tabs }
