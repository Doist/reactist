/// <reference types="react" />
import './styles/avatar.less';
import PropTypes from 'prop-types';
/**
 * @typedef {Object} Props
 * @property {string | undefined} [className]
 * @property {string[] | undefined} [colorList]
 * @property {AvatarSize | undefined} [size]
 * @property {string | undefined} [avatarUrl]
 * @property {{name?: string, email?: string}} user
 */
/** @type {React.FC<Props>} */
declare const Avatar: {
    ({ user, avatarUrl, size, className, colorList, }: {
        user: any;
        avatarUrl: any;
        size: any;
        className: any;
        colorList?: string[];
    }): JSX.Element;
    displayName: string;
    defaultProps: {
        size: string;
    };
    propTypes: {
        /** Minimal required user shape for the avatar. */
        user: PropTypes.Validator<PropTypes.InferProps<{
            /** Name of the user. */
            name: PropTypes.Requireable<string>;
            /** Email of the user. Used to calculate avatar color and as fallback in case name is not set. */
            email: PropTypes.Requireable<string>;
        }>>;
        /** URL of the avatar image. In case nothing is set a colored circle with the user's initials is displayed. */
        avatarUrl: PropTypes.Requireable<string>;
        /** Size of the Avatar between XXS and XXXL. */
        size: PropTypes.Requireable<string>;
        /** Additional css class applied to the avatar. */
        className: PropTypes.Requireable<string>;
        /** Optional list of color codes used as fallback when image not available. Defaults to AVATAR_COLORS array. */
        colorList: PropTypes.Requireable<string[]>;
    };
};
export default Avatar;
