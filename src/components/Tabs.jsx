import './styles/tabs.less'

import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Tabs extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = { activeTab: props.defaultTab || 0 }
    }

    _switchActiveTab = (newTabIndex) => {
        this.setState(() => ({ activeTab: newTabIndex }))
    }

    _renderTabLinks = (children) => {
        return children.map((child, index) => {
            const { title, disabled } = child.props
            const className = classNames('reactist tabs__header--item',
                { disabled, active: index === this.state.activeTab }
            )
            return (
                <a
                    className={ className }
                    href=''
                    key={ index }
                    onClick={ (event) => {
                        event.preventDefault()
                        if (!disabled) {
                            this._switchActiveTab(index)
                        }
                    } }
                >
                    { title }
                </a>
            )
        })
    }

    render() {
        // ensures that single or no child components don't throw
        const children = React.Children.toArray(this.props.children)

        return (
            <div className='reactist tabs'>
                <div className='reactist tabs__header'>
                    { this._renderTabLinks(children) }
                </div>
                <div className='reactist tabs__body'>
                    { children[this.state.activeTab] }
                </div>
            </div>
        )
    }
}
Tabs.displayName = 'Tabs'
Tabs.defaultProps = {
    defaultTab: 0
}
Tabs.propTypes = {
    /** Index of the tab that should be selected on initial render. */
    defaultTab: PropTypes.number
}

const Tab = ({ children }) => <div className='reactist tabs__tab'>{ children }</div>
Tab.displayName = 'Tab'
Tab.defaultProps = {
    disabled: false
}
Tab.propTypes = {
    /** Title of the tab. */
    title: PropTypes.string.isRequired,
    /** Disabled tabs can't be selected. */
    disabled: PropTypes.bool
}


export { Tabs, Tab }
