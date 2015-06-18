React = require('react')

ESCAPE_KEY_CODE = 27

Modal = React.createClass

    _listenForESC: (event) ->
        if event.keyCode == ESCAPE_KEY_CODE
            event.preventDefault()
            @_close()

    _close: (event) ->
        @props.onClose()
        event.preventDefault() if event


    _handleClick: (event) ->
        if @getDOMNode().isEqualNode(event.target)
            @_close(event)

    componentWillMount: ->
        document.addEventListener("keydown", @_listenForESC, false)
        document.addEventListener("click", @_handleClick, false)

    componentWillUnmount: ->
        document.removeEventListener("keydown", @_listenForESC, false)
        document.removeEventListener("click", @_handleClick, false)

    render: ->
        modal_className = "o-modal"
        if @props.size == "small"
            modal_className += " o-modal--small"
        else if @props.size == "medium"
            modal_className += " o-modal--medium"
        else
            modal_className += " o-modal--large"

        <div ref = "modal_overlay" className = "o-modal__wrapper">
            <div className = modal_className>
                <header className = "o-modal__header">
                    <h1>{@props.title}</h1>
                    <a href = "#" className = "o-modal__header__close" onClick = @_close>Close</a>
                </header>
                {@props.children}
            </div>
        </div>

Content = React.createClass
    render: ->
        <main className = "o-modal__main">
            {@props.children}
        </main>

Actions = React.createClass
    _addMarginLeft: (action) ->
        return React.cloneElement(action, {style: {marginLeft: 10}})

    render: ->
        actions = React.Children.map(@props.children, @_addMarginLeft)
        <section className = "o-modal__actions">
            {actions}
        </section>

Modal.Content = Content
Modal.Actions = Actions

module.exports = Modal
