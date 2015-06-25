React = require('react')

Tabs = React.createClass

    getInitialState: ->
        return { active_tab_index: 0 }

    _switchActiveTab: (index) ->
        @setState { active_tab_index: index }

    _getTabItemLink: ->
        React.Children.map @props.children, (child, index) =>
            className = ""
            className = "is_active" if index == @state.active_tab_index
            return  <a
                        className = className
                        href = "#"
                        onClick = {@_switchActiveTab.bind(this, index)}>
                            {child.props.title}
                    </a>

    render: ->
        links = @_getTabItemLink()


        <div className = "o-tabs">
            <div className = "o-tabs__link">
                {links}
            </div>
            {@props.children[@state.active_tab_index]}
        </div>

Item = React.createClass

    render: ->
        <div className = "o-tabs__content">
            {@props.children}
        </div>

Tabs.Item = Item

module.exports = Tabs
