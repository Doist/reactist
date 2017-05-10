import React from 'react';

import { Time } from '@doist/reactist';

class TimeExamplePage extends React.Component {
    render() {
        return (
            <section>
                <h1>Time Examples</h1>
                <Time time={0} />
            </section>
        );
    }
}

export default TimeExamplePage;
