import React from 'react';

import { Button } from 'reactist';

import './alternate-branding.less';

class ButtonExamplePage extends React.Component {
    render() {
        return (
            <section>
                <h1>Button Examples</h1>
                
                <h2>Basic Buttons</h2>
                <Button name='Primary Button' />
                <Button secondary name='Secondary Button' />
                <Button loading name='Loading'/>
                
                <h2>Small Buttons</h2>
                <Button small name='Small Primary Button' />
                <Button small secondary name='Small Secondary Button' />

                <h2>White Buttons</h2>
                <Button white name='White Primary Button' />
                <Button white secondary name='White Secondary Button' />

                <section className="alternate-branding">
                    <h1>Alternate Branding Button Examples</h1>

                    <h2>Basic Buttons</h2>
                    <Button name='Primary Button' />
                    <Button secondary name='Secondary Button' />
                    <Button loading name='Loading' />

                    <h2>Small Buttons</h2>
                    <Button small name='Small Primary Button' />
                    <Button small secondary name='Small Secondary Button' />

                    <h2>White Buttons</h2>
                    <Button white name='White Primary Button' />
                    <Button white secondary name='White Secondary Button' /></section>
            </section>
        );
    }
}

export default ButtonExamplePage;