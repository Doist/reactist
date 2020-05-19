/**
 * @typedef {Object} Config
 * @property {string} [locale]
 * @property {string} [longFormat]
 * @property {string} [shortFormatCurrentYear]
 * @property {string} [shortFormatPastYear]
 * @property {string} [daysSuffix]
 * @property {string} [hoursSuffix]
 * @property {string} [minutesSuffix]
 * @property {string} [momentsAgo]
 */
declare const TimeUtils: {
    SHORT_FORMAT_CURRENT_YEAR: string;
    SHORT_FORMAT_PAST_YEAR: string;
    LONG_FORMAT: string;
    /**
     * @param {number} timestamp
     * @param {Config} [config]
     */
    timeAgo(timestamp: any, config?: {}): any;
    /**
     * @param {number} timestamp
     * @param {Config} [config]
     */
    formatTime(timestamp: any, config?: {}): string;
    /**
     * @param {number} timestamp
     * @param {Config} [config]
     */
    formatTimeLong(timestamp: any, config?: {}): string;
};
export default TimeUtils;
