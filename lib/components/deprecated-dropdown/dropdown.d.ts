import * as React from 'react';
import './dropdown.less';
type BoxProps = {
    onShowBody?: () => void;
    onHideBody?: () => void;
    allowBodyInteractions?: boolean;
    top?: boolean;
    right?: boolean;
    scrolling_parent?: string;
    children?: [
        React.ReactElement<TriggerProps>,
        React.ReactElement<BodyProps> | ((props: BodyProps) => JSX.Element)
    ];
    className?: string;
};
type BoxState = {
    top: boolean;
    showBody: boolean;
};
declare class Box extends React.Component<BoxProps, BoxState> {
    static displayName: string;
    constructor(props: BoxProps, context: React.Context<unknown>);
    componentWillUnmount(): void;
    _timeout?: ReturnType<typeof setTimeout>;
    _handleClickOutside: (event: MouseEvent) => void;
    _toggleShowBody: () => void;
    _getTriggerComponent(): React.ReactElement<TriggerProps, string | React.JSXElementConstructor<any>> | undefined;
    _setPosition: (body: HTMLElement | null) => void;
    _getBodyComponent(): React.JSX.Element | null;
    render(): React.JSX.Element;
}
type NativeButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type TriggerProps = Omit<NativeButtonProps, 'title' | 'onClick'> & {
    tooltip?: React.ReactNode;
    /**
     * @private the onClick prop is not to be used externally
     */
    onClick?: NativeButtonProps['onClick'];
};
type BodyProps = {
    setPosition?: React.Ref<HTMLDivElement>;
    children?: React.ReactNode;
    top?: boolean;
    right?: boolean;
};
declare function Body({ top, right, children, setPosition }: BodyProps): React.JSX.Element;
declare namespace Body {
    var displayName: string;
}
declare const Dropdown: {
    Box: typeof Box;
    Trigger: React.ForwardRefExoticComponent<Omit<TriggerProps, "ref"> & React.RefAttributes<HTMLButtonElement>>;
    Body: typeof Body;
};
export { Dropdown };
