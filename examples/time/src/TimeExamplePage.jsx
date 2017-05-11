import React from 'react';
import moment from 'moment';

import { Time } from '@doist/reactist';

class TimeExamplePage extends React.Component {
    render() {
        const exampleTimes = [
            { title: 'Now', time: moment().unix() },
            { title: 'Now - 2 Minutes', time: moment().subtract(2, 'minutes').unix() },
            { title: 'Now - 2 Hours', time: moment().subtract(2, 'hours').unix() },
            { title: 'Now - 18 Hours', time: moment().subtract(18, 'hours').unix() },
            { title: 'Now - 2 Days', time: moment().subtract(2, 'days').unix() },
            { title: 'Now - 2 Weeks', time: moment().subtract(2, 'weeks').unix() },
            { title: 'Now - 2 Years', time: moment().subtract(2, 'years').unix() }
        ];

        return (
            <section>
                <h1>Time Examples</h1>
                <h2>Normal Time (no hover effects)</h2>
                {exampleTimes.map((time, index) => (
                    <div key={index}>
                        <span>{time.title}</span>
                        <Time time={time.time} />
                    </div>
                ))}

                <h2>Time expands on hover</h2>
                {exampleTimes.map((time, index) => (
                    <div key={index}>
                        <span>{time.title}</span>
                        <Time time={time.time} expandOnHover />
                    </div>
                ))}
                <h2>Time expands fully on hover</h2>
                {exampleTimes.map((time, index) => (
                    <div key={index}>
                        <span>{time.title}</span>
                        <Time time={time.time} expandFullyOnHover />
                    </div>
                ))}
            </section>
        );
    }
}

export default TimeExamplePage;
