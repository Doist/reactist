React = require('react')

Dropdown = React.createClass

    getInitialState: ->
        return {
          show_options: false
          force_options_on_bottom: false
        }

    _toggle: (event) ->
        force_options_on_bottom = false;

        if event
            event.stopPropagation()
            event.preventDefault()

            if @props.scroll_bottom_limit && @props.scroll_element
                scroll_offset = document.getElementsByClassName(@props.scroll_element)[0].scrollTop
                element_offset = event.target.offsetTop

                offset = element_offset - scroll_offset
                if offset < @props.scroll_bottom_limit
                    force_options_on_bottom = true

        if @state.show_options && @props.onDropdownClose
            @props.onDropdownClose()
        if !@state.show_options && @props.onDropdownOpen
            @props.onDropdownOpen()

        @setState {
          show_options: !@state.show_options
          force_options_on_bottom: force_options_on_bottom
        }

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
        on_top = (@props.options_on_top && !@state.force_options_on_bottom);

        React.Children.forEach @props.children, (child) =>
            if child.type == Options
                menu_options =
                    <div className = "o-dropdown__options_renderer">
                        {React.cloneElement(child, {hideOptions: @_toggle, on_top: on_top})}
                    </div>

        return menu_options

    render: ->
        <div className = "o-dropdown">
            { @_renderMenuOptions() if @props.options_on_top == true && !@state.force_options_on_bottom }
            { @_renderMenuTrigger() }
            { @_renderMenuOptions() if @props.options_on_top != true || @state.force_options_on_bottom }
        </div>

Trigger = React.createClass
    render: ->
        <div className = "o-dropdown__trigger", onClick = @props.onClick>
            { @props.children }
        </div>

Options = React.createClass
    _handleClick: (event) ->
        # if @getDOMNode().contains(event.target)
        #     return
        # else
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
