import * as React from 'react'
import { test, expect } from '@playwright/experimental-ct-react'
import { Button } from './button'

test.use({ viewport: { width: 500, height: 500 } })

test('renders a button with the given label', async ({ mount, page }) => {
    await mount(<Button variant="primary">Click me</Button>)
    expect(await page.screenshot()).toMatchSnapshot()
})
