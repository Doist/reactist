import * as React from 'react';
import type { AlertTone } from '../utils/common-types';
type NoticeProps = {
    id?: string;
    children: React.ReactNode;
    tone: AlertTone;
};
declare function Notice({ id, children, tone }: NoticeProps): React.JSX.Element;
export { Notice };
export type { NoticeProps };
