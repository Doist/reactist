import PropTypes from 'prop-types'

const ThreeDotsIcon = ({ color = '#A5A5A5' }) => (
    <svg width="26px" height="26px" viewBox="0 0 26 26">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <circle fill={color} cx="19" cy="13" r="2" />
            <circle fill={color} cx="13" cy="13" r="2" />
            <circle fill={color} cx="7" cy="13" r="2" />
        </g>
    </svg>
)
ThreeDotsIcon.propTypes = {
    /** Color of the icon. */
    color: PropTypes.string,
}

export default ThreeDotsIcon
