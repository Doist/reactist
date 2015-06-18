React = require('react')

Button = React.createClass
    render: ->
        className = "o-button"
        className += " o-button--secondary" if @props.secondary
        className += " u-flex_grow" if @props.fill

        <button
            className = className
            onClick = @props.onClick
            style = @props.style
        >
            {@props.children}
        </button>

module.exports = Button
