import './styles/tabs.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Tabs extends React.Component {
    constructor(props, context) {
        super(props, context)
        const { defaultTab, onChange } = props
        const children = React.Children.toArray(this.props.children)

        const hasDefault = defaultTab || defaultTab === 0
        if (hasDefault || onChange) {
            const missing = children.find(
                c => !c.props.value && c.props.value !== 0
            )
            if (missing)
                throw new Error(
                    '(Tab) Missing property: all Tab must have "value" set if "defaultTab" or "onChange" is used'
                )
        }

        if (hasDefault) {
            const i = children.findIndex(x => x.props.value === defaultTab)
            if (i === -1)
                throw new Error(
                    `(Tabs) Unable to find Tab with the matching defaultTab value "${defaultTab}"`
                )

            this.state = { activeTabIndex: i }
        } else {
            this.state = { activeTabIndex: 0 }
        }
    }

    _switchActiveTab = (tab, i) => {
        this.setState(() => ({ activeTabIndex: i }))
        if (this.props.onChange) this.props.onChange(tab.props.value)
    }

    _renderTabLinks = tabs => {
        return tabs.map((t, i) => {
            const { title, disabled } = t.props
            const value = t.props.value || i
            const className = classNames('reactist_tabs__header--item', {
                disabled,
                active: i === this.state.activeTabIndex
            })

            return (
                <a
                    className={className}
                    href=""
                    key={value}
                    onClick={event => {
                        event.preventDefault()
                        if (!disabled) {
                            this._switchActiveTab(t, i)
                        }
                    }}
                >
                    {title}
                </a>
            )
        })
    }

    render() {
        // ensures that single or no child components don't throw
        const children = React.Children.toArray(this.props.children)
        const activeTab =
            children[this.state.activeTabIndex] || children[0] || null

        const cls = classNames(
            'reactist_tabs',
            this.props.spreadLayout ? 'tabs--spreadlayout' : null
        )

        return (
            <div className={cls}>
                <div className="reactist_tabs__header">
                    {this._renderTabLinks(children)}
                </div>
                <div className="reactist_tabs__body">{activeTab}</div>
            </div>
        )
    }
}
Tabs.displayName = 'Tabs'

Tabs.propTypes = {
    /** selects the tab whose value prop matches this prop */
    defaultTab: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /** Whether the tabs should take all available space and distribute it evenly or use the minimum required **/
    spreadLayout: PropTypes.bool,
    /** Callback for tab change event. Tab value will be passed */
    onChange: PropTypes.func,
    /** Children of the Tabs component. Most commonly an array of Tab components. */
    children: PropTypes.any
}
Tabs.defaultProps = {
    spreadLayout: false
}

const Tab = ({ children, className }) => (
    <div className={classNames('reactist_tabs__tab', className)}>
        {children}
    </div>
)
Tab.displayName = 'Tab'
Tab.defaultProps = {
    disabled: false
}
Tab.propTypes = {
    /* It assigns a value to the tab so that it can be selected by the Tabs.*/
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** Title of the tab. */
    title: PropTypes.string.isRequired,
    /** Disabled tabs can't be selected. */
    disabled: PropTypes.bool,
    /** Additional css class applied to Tab. */
    className: PropTypes.string,
    /** Children of the Tab component. Can be a simple string or other component(s). */
    children: PropTypes.any
}

export { Tabs, Tab }
