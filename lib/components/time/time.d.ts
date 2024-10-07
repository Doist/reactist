import * as React from 'react';
import { TimeConfig } from './time-utils';
import './time.less';
type Props = {
    /** UNIX timestamp of the time to display. */
    time?: number;
    /** Configuration for localization. */
    config?: TimeConfig;
    /** Additional css class applied to the time element. */
    className?: string;
    tooltipOnHover?: boolean;
    /** Refresh the component every DELAY seconds. */
    refresh?: boolean;
    /** If you don't want to use the default time format on the tooltip use this prop to supply a custom text */
    tooltip?: React.ReactNode;
    /** When hovering over time it expands to short absolute version. */
    expandOnHover?: boolean;
    /** When hovering over time it expands to the full absolute version. */
    expandFullyOnHover?: boolean;
};
type State = {
    hovered: boolean;
    mouseX?: number;
    mouseY?: number;
};
declare class Time extends React.Component<Props, State> {
    static displayName: string;
    static defaultProps: Props;
    constructor(props: Props);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    componentWillUnmount(): void;
    refreshInterval?: ReturnType<typeof setTimeout>;
    _setHovered(hovered: boolean, event: React.MouseEvent): void;
    _renderTime(config: Props['config']): string | undefined;
    _refresh(): void;
    render(): React.JSX.Element;
}
export { Time };
