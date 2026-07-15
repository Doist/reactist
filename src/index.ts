/// <reference types="../types/css" />
/// <reference types="../types/less" />

// Bundles the product library's classless light palette so `var(--product-library-*)` resolves out
// of the box. Dark/accent themes override via the package's `.theme_*` classes (imported by apps).
// eslint-disable-next-line import/no-unresolved -- the `/css/*` subpath resolves at build time (Rollup and Vite) but not via eslint's default import resolver, which doesn't follow package `exports` maps (the stories override documents the same limitation).
import '@doist/product-libraries-tokens/css/td-light.css'

import './styles/design-tokens.css'

// layout components
export * from './box'
export * from './columns'
export * from './divider'
export * from './hidden'
export * from './hidden-visually'
export * from './inline'
export * from './stack'

// alerts, notifications, etc.
export * from './banner'
export * from './loading'
export * from './notice'
export * from './toast'

// text and typography
export * from './heading'
export * from './prose'
export * from './text'

// links
export * from './button'
export * from './text-link'

// form fields
export * from './checkbox-field'
export * from './password-field'
export * from './select-field'
export * from './switch-field'
export * from './text-area'
export * from './text-field'

// other components
export * from './avatar'
export * from './badge'
export * from './expansion-panel'
export * from './menu'
export * from './modal'
export * from './tabs'
export * from './tooltip'

//
// components not yet integrated with the design system
//

export { default as ColorPicker, COLORS } from './components/color-picker'
export { default as KeyCapturer, SUPPORTED_KEYS } from './components/key-capturer'
export { default as KeyboardShortcut } from './components/keyboard-shortcut'
export { default as ProgressBar } from './components/progress-bar'
export { default as Time } from './components/time'

//
// Deprecated components
//

export { default as DeprecatedInput } from './components/deprecated-input'
