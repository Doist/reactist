import * as React from 'react';
import { TabProps as BaseTabProps, TabPanelProps as BaseTabPanelProps } from '@ariakit/react';
import type { ObfuscatedClassName, Space } from '../utils/common-types';
interface TabsProps {
    /**
     * The `<Tabs>` component must be composed from a `<TabList>` and corresponding `<TabPanel>`
     * components
     */
    children: React.ReactNode;
    /**
     * Determines the look and feel of the tabs
     */
    variant?: 'themed' | 'neutral';
    /**
     * The id of the selected tab. Assigning a value makes this a controlled component
     */
    selectedId?: string | null;
    /**
     * The tab to initially select. This can be used if the component should not
     * be a controlled component but needs to have a tab selected
     */
    defaultSelectedId?: string | null;
    /**
     * Called with the tab id when a tab is selected
     */
    onSelectedIdChange?: (selectedId: string | null | undefined) => void;
}
/**
 * Used to group components that compose a set of tabs. There can only be one active tab within the same `<Tabs>` group.
 */
declare function Tabs({ children, selectedId, defaultSelectedId, variant, onSelectedIdChange, }: TabsProps): React.ReactElement;
interface TabProps extends ObfuscatedClassName, Omit<BaseTabProps, 'store' | 'className' | 'children' | 'id'> {
    /**
     * The content to render inside of the tab button
     */
    children: React.ReactNode;
    /**
     * The tab's identifier. This must match its corresponding `<TabPanel>`'s id
     */
    id: string;
}
/**
 * Represents the individual tab elements within the group. Each `<Tab>` must have a corresponding `<TabPanel>` component.
 */
declare const Tab: React.ForwardRefExoticComponent<Omit<TabProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
type TabListProps = ({
    /** Labels the tab list for assistive technologies. This must be provided if `aria-labelledby` is omitted. */
    'aria-label': string;
} | {
    /**
     * One or more element IDs used to label the tab list for assistive technologies. Required if
     * `aria-label` is omitted.
     */
    'aria-labelledby': string;
} | {
    /**
     * For cases where multiple instances of the tab list exists, the duplicates may be marked as aria-hidden
     */
    'aria-hidden': boolean;
}) & {
    /**
     * A list of `<Tab>` elements
     */
    children: React.ReactNode;
    /**
     * Controls the spacing between tabs
     */
    space?: Space;
};
/**
 * A component used to group `<Tab>` elements together.
 */
declare function TabList({ children, space, ...props }: TabListProps): React.ReactElement | null;
interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement>, Pick<BaseTabPanelProps, 'render'> {
    /** The content to be rendered inside the tab */
    children?: React.ReactNode;
    /** The tabPanel's identifier. This must match its corresponding `<Tab>`'s id */
    id: string;
    /**
     * By default, the tab panel's content is always rendered even when they are not active. This
     * behaviour can be changed to 'active', which renders only when the tab is active, and 'lazy',
     * meaning while inactive tab panels will not be rendered initially, they will remain mounted
     * once they are active until the entire Tabs tree is unmounted.
     */
    renderMode?: 'always' | 'active' | 'lazy';
}
/**
 * Used to define the content to be rendered when a tab is active. Each `<TabPanel>` must have a
 * corresponding `<Tab>` component.
 */
declare const TabPanel: React.ForwardRefExoticComponent<TabPanelProps & React.RefAttributes<HTMLDivElement>>;
type TabAwareSlotProps = {
    /**
     * Render prop used to provide the content to be rendered inside the slot. The render prop will
     * be called with the current `selectedId`
     */
    children: (provided: {
        selectedId?: string | null;
    }) => React.ReactElement | null;
};
/**
 * Allows content to be rendered based on the current tab being selected while outside of the
 * TabPanel component. Can be placed freely within the main `<Tabs>` component.
 */
declare function TabAwareSlot({ children }: TabAwareSlotProps): React.ReactElement | null;
export { Tab, Tabs, TabList, TabPanel, TabAwareSlot };
