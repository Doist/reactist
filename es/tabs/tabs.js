import {
    objectWithoutProperties as _objectWithoutProperties,
    objectSpread2 as _objectSpread2,
} from '../_virtual/_rollupPluginBabelHelpers.js'
import * as React from 'react'
import classNames from 'classnames'
import {
    useTabStore,
    Tab as Tab$1,
    TabList as TabList$1,
    TabPanel as TabPanel$1,
} from '@ariakit/react'
import { Inline } from '../inline/inline.js'
import modules_40c67f5b from './tabs.module.css.js'
import { Box } from '../box/box.js'

const _excluded = ['children', 'space'],
    _excluded2 = ['children', 'id', 'renderMode']
const TabsContext = /*#__PURE__*/ React.createContext(null)
/**
 * Used to group components that compose a set of tabs. There can only be one active tab within the same `<Tabs>` group.
 */

function Tabs({
    children,
    selectedId,
    defaultSelectedId,
    variant = 'neutral',
    onSelectedIdChange,
}) {
    const tabStore = useTabStore({
        defaultSelectedId,
        selectedId,
        setSelectedId: onSelectedIdChange,
    })
    const actualSelectedId = tabStore.useState('selectedId')
    const memoizedTabState = React.useMemo(() => {
        var _ref

        return {
            tabStore,
            variant,
            selectedId:
                (_ref = selectedId != null ? selectedId : actualSelectedId) != null ? _ref : null,
        }
    }, [variant, tabStore, selectedId, actualSelectedId])
    return /*#__PURE__*/ React.createElement(
        TabsContext.Provider,
        {
            value: memoizedTabState,
        },
        children,
    )
}
/**
 * Represents the individual tab elements within the group. Each `<Tab>` must have a corresponding `<TabPanel>` component.
 */

const Tab = /*#__PURE__*/ React.forwardRef(function Tab(
    { children, id, exceptionallySetClassName, render, onClick },
    ref,
) {
    const tabContextValue = React.useContext(TabsContext)
    if (!tabContextValue) return null
    const { variant, tabStore } = tabContextValue
    const className = classNames(
        exceptionallySetClassName,
        modules_40c67f5b.tab,
        modules_40c67f5b['tab-' + variant],
    )
    return /*#__PURE__*/ React.createElement(
        Tab$1,
        {
            id: id,
            ref: ref,
            store: tabStore,
            render: render,
            className: className,
            onClick: onClick,
        },
        children,
    )
})
/**
 * A component used to group `<Tab>` elements together.
 */

function TabList(_ref2) {
    let { children, space } = _ref2,
        props = _objectWithoutProperties(_ref2, _excluded)

    const tabContextValue = React.useContext(TabsContext)

    if (!tabContextValue) {
        return null
    }

    const { tabStore, variant } = tabContextValue
    return (
        /*#__PURE__*/
        // The extra <div> prevents <Inline>'s negative margins from collapsing when used in a flex container
        // which will render the track with the wrong height
        React.createElement(
            'div',
            null,
            /*#__PURE__*/ React.createElement(
                TabList$1,
                _objectSpread2(
                    {
                        store: tabStore,
                        render: /*#__PURE__*/ React.createElement(Box, {
                            position: 'relative',
                            width: 'maxContent',
                        }),
                    },
                    props,
                ),
                /*#__PURE__*/ React.createElement(Box, {
                    className: [modules_40c67f5b.track, modules_40c67f5b['track-' + variant]],
                }),
                /*#__PURE__*/ React.createElement(
                    Inline,
                    {
                        space: space,
                    },
                    children,
                ),
            ),
        )
    )
}
/**
 * Used to define the content to be rendered when a tab is active. Each `<TabPanel>` must have a
 * corresponding `<Tab>` component.
 */

const TabPanel = /*#__PURE__*/ React.forwardRef(function TabPanel(_ref3, ref) {
    let { children, id, renderMode = 'always' } = _ref3,
        props = _objectWithoutProperties(_ref3, _excluded2)

    const tabContextValue = React.useContext(TabsContext)
    const [tabRendered, setTabRendered] = React.useState(false)
    const selectedId =
        tabContextValue == null ? void 0 : tabContextValue.tabStore.useState('selectedId')
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
    return shouldRender
        ? /*#__PURE__*/ React.createElement(
              TabPanel$1,
              _objectSpread2(
                  _objectSpread2({}, props),
                  {},
                  {
                      tabId: id,
                      store: tabStore,
                      ref: ref,
                  },
              ),
              children,
          )
        : null
})
/**
 * Allows content to be rendered based on the current tab being selected while outside of the
 * TabPanel component. Can be placed freely within the main `<Tabs>` component.
 */

function TabAwareSlot({ children }) {
    const tabContextValue = React.useContext(TabsContext)
    const selectedId =
        tabContextValue == null ? void 0 : tabContextValue.tabStore.useState('selectedId')
    return tabContextValue
        ? children({
              selectedId,
          })
        : null
}

export { Tab, TabAwareSlot, TabList, TabPanel, Tabs }
//# sourceMappingURL=tabs.js.map
