import React from 'react'
import classNames from 'classnames'

import './tabs.less'

type Props = {
    disabled?: boolean
    /** Whether the tabs should take all available space and distribute it evenly or use the minimum required **/
    spreadLayout?: boolean
    /** selects the tab whose value prop matches this prop */
    defaultTab?: number
    /** Callback for tab change event. Tab value will be passed */
    onChange?: (value: string | number | undefined) => void
}

type State = {
    activeTabIndex: number
}

class Tabs extends React.Component<React.PropsWithChildren<Props>, State> {
    public static displayName: string
    public static defaultProps: Props

    constructor(props: Props, context: unknown) {
        super(props, context)
        const { defaultTab, onChange } = props
        const children = React.Children.toArray(this.props.children) as React.Component<TabProps>[]

        const hasDefault = defaultTab || defaultTab === 0
        if (hasDefault || onChange) {
            if (children) {
                const missing = children.find(
                    (c: React.Component<TabProps>) => !c.props.value && c.props.value !== 0,
                )
                if (missing)
                    throw new Error(
                        '(Tab) Missing property: all Tab must have "value" set if "defaultTab" or "onChange" is used',
                    )
            }
        }

        if (hasDefault && children) {
            const i = children.findIndex(
                (x: React.Component<TabProps>) => x.props.value === defaultTab,
            )
            if (i === -1)
                throw new Error(
                    // `hasDefault` being `true` guarantees `defaultTab` being a `number`.
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    `(Tabs) Unable to find Tab with the matching defaultTab value "${defaultTab}"`,
                )

            this.state = { activeTabIndex: i }
        } else {
            this.state = { activeTabIndex: 0 }
        }
    }

    _switchActiveTab = (tab: React.Component<TabProps>, i: number) => {
        this.setState(() => ({ activeTabIndex: i }))
        if (this.props.onChange) this.props.onChange(tab.props.value)
    }

    _renderTabLinks = (tabs: React.Component<TabProps>[]) => {
        return tabs.map((t, i) => {
            const { title, disabled } = t.props
            const value = t.props.value || i
            const className = classNames('reactist_tabs__header--item', {
                disabled,
                active: i === this.state.activeTabIndex,
            })

            return (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                    className={className}
                    href=""
                    key={value}
                    onClick={(event) => {
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
        const children = React.Children.toArray(this.props.children) as React.Component<TabProps>[]
        const activeTab = children[this.state.activeTabIndex] || children[0] || null

        const cls = classNames(`reactist_tabs${this.props.spreadLayout ? '--spreadlayout' : ''}`)

        return (
            <div className={cls}>
                <div className="reactist_tabs__header">{this._renderTabLinks(children)}</div>
                <div className="reactist_tabs__body">{activeTab}</div>
            </div>
        )
    }
}
Tabs.displayName = 'Tabs'

Tabs.defaultProps = {
    spreadLayout: false,
}

type TabProps = {
    /** Additional css class applied to Tab. */
    className?: string
    /** Disabled tabs can't be selected. */
    disabled?: boolean
    /* It assigns a value to the tab so that it can be selected by the Tabs.*/
    value?: string | number
    /** Title of the tab. */
    title?: React.ReactNode
}

const Tab: React.FC<React.PropsWithChildren<TabProps>> = ({ children, className }) => (
    <div className={classNames('reactist_tabs__tab', className)}>{children}</div>
)
Tab.displayName = 'Tab'
Tab.defaultProps = {
    disabled: false,
}

export { Tabs, Tab }
