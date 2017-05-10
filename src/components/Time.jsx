import React from 'react';
import PropTypes from 'prop-types';

import TimeUtils from './utils/TimeUtils';

class Time extends React.Component {
    render() {
        let className = '';
        if (this.props.className) {
            className = this.props.className;
        }

        return (
            <time className={className}>
                {TimeUtils.timeAgo(this.props.time)}
            </time>
        );
    }
}
Time.propTypes = {
    className: PropTypes.string,
    time: PropTypes.number.isRequired,
    expandOnHover: PropTypes.bool,
    expandFullyOnHover: PropTypes.bool
};
Time.defaultProps = {
    expandOnHover: false,
    expandFullyOnHover: false
};

export default Time;
