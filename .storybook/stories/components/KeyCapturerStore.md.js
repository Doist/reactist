const documentation = `
    Use this component to wrap anything you want to handle key events for (e.g. an input).

    You can specify the **eventName** to capture (defaults to **onKeyDown**).

    Check the **SUPPORTED_KEYS** map to see which keys are supported and supply the respective **on\${Key}** prop (i.e. **onEnter** or **onArrowDown**).

    If you want the default behaviour to be preserved (i.e. only want to hook into the event instead of replacing it) set the **propagate\${Key}** prop (e.g. **propagateBackspace**).

    Example of an **<input>** handling normal keystrokes by acting on **onChange** as well as on enter and backspace presses with dedicated handlers. By propagating the backspace key users are still able to delete the last typed character while you can also implement additional logic on top.
    \`\`\`js
    &lt;KeyCapturer
        onEnter={ this._handleEnter }
        onBackspace={ this._handleBackspace }
        propagateBackspace
    &gt;
        &lt;input value={ value } onChange={ this._handleChange } /&gt;
    &lt;/KeyCapturer&gt;
    \`\`\`
`

export default documentation
