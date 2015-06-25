React = require('react')

ARROW_UP = 38
ARROW_DOWN = 40
ENTER = 13
BACKSPACE = 8
ESCAPE = 27

Selector = React.createClass
    getInitialState: ->
        return {
            show_filtered_items: false
            active_item_index: 0
            current: @_getItems(@props.children, Current)
            universe: @_getItems(@props.children, Universe)
        }

    componentWillReceiveProps: (nextProps) ->
        @setState {
            current: @_getItems(nextProps.children, Current)
            universe: @_getItems(nextProps.children, Universe)
        }

    _compare: (a, b) =>
        # we want special items to bubble up
        # if a.id < 0
        #     return -1
        # if b.id < 0
        #     return 1
        if a.props[@props.id].toLowerCase() < b.props[@props.id].toLowerCase()
            return -1
        else
            return 1

    _showFilteredItems: ->
        @setState { show_filtered_items: true }


    _hideFilteredItems: ->
        @_timeout = setTimeout ( =>
            @setState { show_filtered_items: false }
        ), 200


    _getItems: (children, type) ->
        items = null
        React.Children.forEach children, (child) =>
            if child.type == type
                items = child.props.children
        return items


    _renderItems: (items, order=false) ->
        _items = null
        return React.Children.map items, (child) =>
            React.cloneElement(child, {onClick: @_onItemClick.bind(null, child)})

    _onItemClick: (item) ->
        @props.onItemClick(item)
        clearTimeout(@_timeout)
        input = @refs.input.getDOMNode()
        input.focus()


    _processActions: (event) ->
        key = event.keyCode
        active_item_index = @state.active_item_index
        filtered = @state.filtered
        current = @state.current

        if key == ARROW_DOWN
            @_showFilteredItems()
            if active_item_index < filtered.length - 1
                @setState {active_item_index: active_item_index + 1}

        else if key == ARROW_UP
            @_showFilteredItems()
            if active_item_index > 0
                @setState {active_item_index: active_item_index - 1}

        else if key == ENTER
            active_item = filtered[active_item_index]
            @_onItemToggle(active_item) if active_item
            event.preventDefault()

        else if key == BACKSPACE && @state.query == '' && current.length > 0
            @_onItemToggle(current[current.length - 1])

        else if key == ESCAPE
            @_hideFilteredItems()

    _processQuery: ->
        console.log "process"

    render: ->
        <div className = "o-selector">
            <div className = "o-selector__current">
                { @_renderItems(@state.current) }
                <input
                    ref = "input"
                    value = {@state.query}
                    onFocus = {@_showFilteredItems}
                    onBlur = {@_hideFilteredItems}
                    onKeyDown = { @_processActions }
                    onChange = { @_processQuery }
                />
            </div>
            <div className = "o-selector__filtered">
                { @_renderItems(@state.universe) if @state.show_filtered_items }
            </div>
        </div>

Current = React.createClass
    getInitialState: ->
        return { query: "" }

    render: ->
        return false

Universe = React.createClass
    render: ->
        <div className = "o-selector__universe">
            {@props.children}
        </div>


Selector.Current = Current
Selector.Universe = Universe

module.exports = Selector
