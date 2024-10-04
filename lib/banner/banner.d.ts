import * as React from 'react';
export type BannerTone = 'info' | 'promotion';
type BannerProps = {
    id?: string;
    /**
     * The tone of the Banner. Affects the background color and the outline.
     */
    tone: BannerTone;
    /**
     * The icon that should be added inside the Banner.
     */
    icon: React.ReactElement | string | number;
    /**
     * The title to be displayed at the top of the Banner.
     */
    title: React.ReactNode;
    /**
     * An optional description to be displayed inside the Banner.
     */
    description?: React.ReactNode;
    /**
     * An optional action to displayed inside the Banner.
     */
    action?: React.ReactElement | string | number;
};
declare const Banner: React.ForwardRefExoticComponent<BannerProps & React.RefAttributes<HTMLDivElement>>;
export { Banner };
export type { BannerProps };
