import React from 'react';

import { ModalBox, Header, Body, Actions } from '../../../dist/reactist';

class SimpleModalBox extends React.Component {
    render() {
        return (
            <ModalBox>
                <Header>Awesome Reactist Modal</Header>
                <Body>
                    <table>
                        <tbody>
                            <tr>
                                <td>Wow this</td>
                                <td>looks complex</td>
                            </tr>
                        </tbody>
                    </table>
                    <span>but it isn't</span>
                </Body>
                <Actions>
                    <div>I AM BUTTON</div>
                    <div>ME TOO</div>
                </Actions>
            </ModalBox>
        );
    }
}

export default SimpleModalBox;