import * as React from 'react';
import './progress-bar.less';
type Props = {
    /** Additional css class applied to the progress bar. */
    className?: string;
    /** How much of the progress bar should be filled. Number between 0 and 100 inclusive. */
    fillPercentage?: number;
    /** Defines the human readable text alternative for assitive technologies. */
    'aria-valuetext'?: string;
};
declare function ProgressBar({ fillPercentage, className, 'aria-valuetext': ariaValuetext }: Props): React.JSX.Element;
declare namespace ProgressBar {
    var displayName: string;
}
export { ProgressBar };
