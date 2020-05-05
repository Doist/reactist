export default TimeUtils;
export type Config = {
    locale?: string;
    longFormat?: string;
    shortFormatCurrentYear?: string;
    shortFormatPastYear?: string;
    daysSuffix?: string;
    hoursSuffix?: string;
    minutesSuffix?: string;
    momentsAgo?: string;
};
declare namespace TimeUtils {
    export const SHORT_FORMAT_CURRENT_YEAR: string;
    export const SHORT_FORMAT_PAST_YEAR: string;
    export const LONG_FORMAT: string;
    /**
     * @param {number} timestamp
     * @param {Config} [config]
     */
    export function timeAgo(timestamp: number, config?: Config): string;
    /**
     * @param {number} timestamp
     * @param {Config} [config]
     */
    export function timeAgo(timestamp: number, config?: Config): string;
    /**
     * @param {number} timestamp
     * @param {Config} [config]
     */
    export function formatTime(timestamp: number, config?: Config): string;
    /**
     * @param {number} timestamp
     * @param {Config} [config]
     */
    export function formatTime(timestamp: number, config?: Config): string;
    /**
     * @param {number} timestamp
     * @param {Config} [config]
     */
    export function formatTimeLong(timestamp: number, config?: Config): string;
    /**
     * @param {number} timestamp
     * @param {Config} [config]
     */
    export function formatTimeLong(timestamp: number, config?: Config): string;
}
