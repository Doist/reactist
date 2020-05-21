/// <reference types="react" />
import './styles/menu_button.less';
import PropTypes from 'prop-types';
/**
 * @typedef {Object} Props
 * @property {string | undefined} [className]
 * @property {React.MouseEventHandler | undefined} [onClick]
 * @property {React.ReactNode} [name]
 * @property {React.ReactNode[] | undefined} [children]
 */
/** @type {React.FC<Props>} */
declare const MenuButton: {
    ({ className, name, onClick, children }: {
        className: any;
        name: any;
        onClick: any;
        children: any;
    }): JSX.Element;
    displayName: string;
    propTypes: {
        /** Name that is displayed as trigger of the MenuButton.  */
        name: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /** When not providing any children you can control what happens when the MenuButton is clicked. */
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        /** Children are displayed as items after clicking on the MenuButton. */
        children: PropTypes.Requireable<PropTypes.ReactNodeLike[]>;
        /** Additional css class applied to the MenuButton. */
        className: PropTypes.Requireable<string>;
    };
};
/**
 * @typedef {Object} MenuButtonItemProps
 * @property {string | undefined} [className]
 * @property {React.MouseEventHandler | undefined} [onClick]
 */
/** @type {React.FC<React.PropsWithChildren<MenuButtonItemProps>>} */
declare const MenuButtonItem: {
    ({ className, onClick, children }: {
        className: any;
        onClick: any;
        children: any;
    }): JSX.Element;
    displayName: string;
    propTypes: {
        /** Callback when MenuButtonItem is clicked. */
        onClick: PropTypes.Requireable<(...args: any[]) => any>;
        /** Content of the MenuButtonItem. */
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        /** Additional css class applied to the MenuButtonItem. */
        className: PropTypes.Requireable<string>;
    };
};
export { MenuButton, MenuButtonItem };
