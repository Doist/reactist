import * as React from 'react';
type BadgeTone = 'info' | 'positive' | 'promote' | 'attention' | 'warning';
type BadgeProps = {
    /**
     * The label to show inside the badge element.
     */
    label: string;
    /**
     * The tone of the badge.
     */
    tone: BadgeTone;
};
declare function Badge({ tone, label, ...props }: BadgeProps): React.JSX.Element;
export { Badge };
export type { BadgeProps };
