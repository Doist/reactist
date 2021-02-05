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
import { ExtractHTMLAttributes, RenderProp, As as ComponentTypes } from 'reakit-utils/types'

type PropsWithAs<P, T extends ComponentTypes> = P &
    Omit<React.ComponentProps<T>, 'component' | keyof P> & {
        component?: ComponentTypes
        children?: React.ReactNode | RenderProp<ExtractHTMLAttributes<any>>
    }

type PropsFromAs<ComponentProps, ComponentType extends ComponentTypes> = PropsWithAs<
    ComponentProps,
    ComponentType
> & { component: ComponentTypes }

type ElementTagNameMap = HTMLElementTagNameMap &
    Pick<SVGElementTagNameMap, Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>>

type ElementByTag<TagName extends keyof ElementTagNameMap> = ElementTagNameMap[TagName]

interface ForwardRefFunction<ComponentProps, ComponentType extends ComponentTypes> {
    (
        props: React.PropsWithChildren<PropsFromAs<ComponentProps, ComponentType>>,
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

interface ForwardRefComponentWithAs<ComponentProps, ComponentType extends ComponentTypes> {
    <TT extends ComponentTypes = ComponentType>(
        props: PropsWithAs<ComponentProps, TT>,
    ): React.ReactElement | null
    (props: PropsWithAs<ComponentProps, ComponentType>): React.ReactElement | null
    readonly $$typeof: symbol
    defaultProps?: Partial<PropsWithAs<ComponentProps, ComponentType>>
    propTypes?: React.WeakValidationMap<PropsWithAs<ComponentProps, ComponentType>>
    displayName?: string
}

function forwardRefWithAs<ComponentProps, ComponentType extends ComponentTypes = ComponentTypes>(
    render: ForwardRefFunction<ComponentProps, ComponentType>,
) {
    return React.forwardRef(render) as ForwardRefComponentWithAs<ComponentProps, ComponentType>
}

export type { ComponentTypes, ForwardRefComponentWithAs }
export { forwardRefWithAs }
