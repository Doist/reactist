React = require('react')

Dropdown = React.createClass

    getInitialState: ->
        return { show_options: false }

    _toggle: ->
        if @state.show_options && @props.onDropdownClose
            @props.onDropdownClose()
        if !@state.show_options && @props.onDropdownOpen
            @props.onDropdownOpen()
        @setState { show_options: !@state.show_options }

    _renderMenuTrigger: ->
        menu_trigger = null
        React.Children.forEach(@props.children, (child) =>
            if child.type == Trigger
                menu_trigger = React.cloneElement(child, {onClick: @_toggle})
        )
        return menu_trigger

    _renderMenuOptions: ->
        if !@state.show_options
            return false

        menu_options = null
        React.Children.forEach @props.children, (child) =>
            if child.type == Options
                menu_options =
                    <div className = "o-dropdown__options_renderer">
                        {React.cloneElement(child, {hideOptions: @_toggle, on_top: @props.options_on_top})}
                    </div>

        return menu_options

    render: ->
        <div className = "o-dropdown">
            { @_renderMenuOptions() if @props.options_on_top == true }
            { @_renderMenuTrigger() }
            { @_renderMenuOptions() if @props.options_on_top != true }
        </div>

Trigger = React.createClass
    render: ->
        <div className = "o-dropdown__trigger", onClick = @props.onClick>
            { @props.children }
        </div>

Options = React.createClass
    _handleClick: (event) ->
        if @getDOMNode().contains(event.target)
            return
        else
            @props.hideOptions()

    # when options are displaying will be listening for clicks.
    # will hide options if click outside.
    componentWillMount: ->
        document.addEventListener("click", @_handleClick, false)

    componentWillUnmount: ->
        document.removeEventListener("click", @_handleClick, false)

    render: ->
        className = "o-dropdown__options"
        className += " o-dropdown__options--on_top" if @props.on_top
        className += " o-dropdown__options--align_right" if @props.align == "right"

        <div className = className>
            <ul>
                { @props.children }
            </ul>
        </div>

OptionItem = React.createClass
    render: ->
        <li>
            { @props.children }
        </li>

Dropdown.Trigger = Trigger
Dropdown.Options = Options
Dropdown.OptionItem = OptionItem
module.exports = Dropdown
