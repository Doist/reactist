export default Avatar;
export type AvatarSize = "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
export type Props = {
    className?: string;
    colorList?: string[];
    size?: "xxs" | "xs" | "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
    avatarUrl?: string;
    user: {
        name?: string;
        email?: string;
    };
};
/**
 * @typedef {Object} Props
 * @property {string | undefined} [className]
 * @property {string[] | undefined} [colorList]
 * @property {AvatarSize | undefined} [size]
 * @property {string | undefined} [avatarUrl]
 * @property {{name?: string, email?: string}} user
 */
/** @type {React.FC<Props>} */
declare const Avatar: React.FC<Props>;
import React from "react";
