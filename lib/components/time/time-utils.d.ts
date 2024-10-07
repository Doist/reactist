type TimeConfig = {
    locale?: string;
    longFormat?: string;
    shortFormatCurrentYear?: string;
    shortFormatPastYear?: string;
    daysSuffix?: string;
    hoursSuffix?: string;
    minutesSuffix?: string;
    momentsAgo?: string;
};
declare const TimeUtils: {
    SHORT_FORMAT_CURRENT_YEAR: string;
    SHORT_FORMAT_PAST_YEAR: string;
    LONG_FORMAT: string;
    timeAgo(timestamp: number, config?: TimeConfig): string;
    formatTime(timestamp: number, config?: TimeConfig): string;
    formatTimeLong(timestamp: number, config?: TimeConfig): string;
};
export { TimeUtils, TimeConfig };
