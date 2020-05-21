const howToText = `
    The **Modal** component consist of four subcomponents *Box, Header, Body, Actions* which are exported as keys of the Modal object. Hence, to use a Modal your code should look like this:
    \`\`\`jsx
    import { Modal } from 'reactist';
    ...
    &lt;Modal.Box&gt;
        &lt;Modal.Header&gt;...&lt;/Modal.Header&gt;
        &lt;Modal.Body&gt;...&lt;/Modal.Body&gt;
        &lt;Modal.Actions&gt;...&lt;/Modal.Actions&gt;
    &lt;/Modal.Box&gt;
    \`\`\`

    The Modal is always attached to an element with the id **modal_box**. You need to add this somewhere in your component hierarchy in order for the Modal to work correctly. It is sufficient to add this once near the top of your component hierarchy.
`

const modalBoxText = `
    The **Modal.Box** component simply acts as a container for the Modal and is responsible for rendering the dark overlay and all children components. You can pass it an optional *className* property to apply additional styles.

    The **Modal.Box** accepts an optional property *closeOnOverlayClick* when set to **true** a click on the overlay will close the modal. Defaults to **false**.
`

const modalHeaderText = `
    The **Modal.Header** component shows the Header of the Modal. It always show a close icon on the right side to close the Modal. It can display arbitrary content you pass to it as children. However, the recommended usage pattern is to supply the *title* and *subtitle* (string) properties. This displays nicely formatted headings inside the Header.

    Nevertheless, the **Modal.Header** will look the same whether you go for option 1 or option 2:
    \`\`\`
    // Option 1
    &lt;Modal.Header&gt;A Fancy Title&lt;/Modal.Header&gt;

    // Option 2
    &lt;Modal.Header title='A Fancy Title' /&gt;
    \`\`\`
`

const modalBodyText = `
    In the simplest case the **Modal.Body** just wraps all its children. However, it can be used to implement a more complex Dialog (i.e. if you do not want to render a Header). You can specify the *icon* property (any node, e.g. an *&lt;img /&gt;* or your custom *&lt;Icon /&gt;* component) which will be displayed on the left side of the Dialog's Body. When you set the *showCloseIcon* property to **true** the Body will display a close icon to dismiss the Dialog again. This should only be used when no Header is used.
`

const modalActionsText = `
    The **Modal.Actions** displays an action bar on the bottom of the Modal. It works best with the Reactist Buttons. If you set the *close* property to **true** on any of the supplied children it's *onClick* function will close the modal.

    \`\`\`
    &lt;Modal.Actions&gt;
        &lt;Button name='Clicking me will close the Modal' close /&gt;
    &lt;/Modal.Actions&gt;
    \`\`\`
`

export {
    howToText,
    modalBoxText,
    modalHeaderText,
    modalBodyText,
    modalActionsText,
}
