import * as React from 'react';
type Props = React.SVGProps<SVGSVGElement> & {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
};
declare function CheckboxIcon({ checked, indeterminate, disabled, ...props }: Props): React.JSX.Element;
export { CheckboxIcon };
