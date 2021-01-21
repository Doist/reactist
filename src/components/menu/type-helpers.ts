/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

//
// The content of this file is heavily influenced by the similar and even more extensive type
// definitions found in https://github.com/reach/reach-ui/tree/develop/packages/utils/src. That
// library is said to not be kept stable and meant to be used internally by other reach-ui libs, so
// instead of using it as a dependency we copied over the bits that we needed. The amount of copied
// code was small but substantial enough to merit including here the copyright notice.
//
// The MIT License (MIT)
//
// Copyright (c) 2018-present, React Training LLC
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
// associated documentation files (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or
// substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
// NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import * as React from 'react'
import { PropsWithAs as ReakitPropsWithAs, As } from 'reakit-utils/types'

/**
 * We revert here the order from how reakit declares it. This is to be more aligned with how
 * React.fowardRef generic arguments order is defined (element type first, props last).
 */
type PropsWithAs<ComponentType extends As, ComponentProps = {}> = ReakitPropsWithAs<
    ComponentProps,
    ComponentType
>

type PropsFromAs<ComponentType extends As, ComponentProps> = (PropsWithAs<
    ComponentType,
    ComponentProps
> & { as: ComponentType }) &
    PropsWithAs<ComponentType, ComponentProps>

type ElementTagNameMap = HTMLElementTagNameMap &
    Pick<SVGElementTagNameMap, Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>>

type ElementByTag<TagName extends keyof ElementTagNameMap> = ElementTagNameMap[TagName]

interface ForwardRefFunction<ComponentType extends As, ComponentProps = {}> {
    (
        props: React.PropsWithChildren<PropsFromAs<ComponentType, ComponentProps>>,
        ref:
            | ((
                  instance:
                      | (ComponentType extends keyof ElementTagNameMap
                            ? ElementByTag<ComponentType>
                            : any)
                      | null,
              ) => void)
            | React.MutableRefObject<
                  | (ComponentType extends keyof ElementTagNameMap
                        ? ElementByTag<ComponentType>
                        : any)
                  | null
              >
            | null,
    ): React.ReactElement | null
    displayName?: string
}

export interface ForwardRefComponentWithAs<ComponentType extends As, ComponentProps> {
    <TT extends As = ComponentType>(
        props: PropsWithAs<TT, ComponentProps>,
    ): React.ReactElement | null
    readonly $$typeof: symbol
    defaultProps?: Partial<PropsWithAs<ComponentType, ComponentProps>>
    propTypes?: React.WeakValidationMap<PropsWithAs<ComponentType, ComponentProps>>
    displayName?: string
}

export function forwardRefWithAs<ComponentType extends As = 'div', ComponentProps = {}>(
    render: ForwardRefFunction<ComponentType, ComponentProps>,
) {
    return React.forwardRef(render) as ForwardRefComponentWithAs<ComponentType, ComponentProps>
}
