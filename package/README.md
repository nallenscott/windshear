<h1 align="center">
  <img src="windshear.png" alt=""><br>
  windshear
</h1>

Windshear is a React hook for just-in-time component rendering, with first-class support for [Tailwind CSS](https://tailwindcss.com/docs). Easily bind visibility and other events to viewport dimensions and breakpoints with pinpoint accuracy.

## Installation

```
npm install windshear
```

## Usage

### Viewport dimensions

Windshear provides realtime viewport information that can be used to control the visibility of components or any feature that relies on the width/height of the viewport. Just call `useViewport`, and Windshear will continuously update the `currentWidth` and `currentHeight` properties using the global `window.innerWidth` and `window.innerHeight` for desktop browsers, and `window.screen.width` and `window.screen.height` for mobile browsers.

```js
import { useViewport } from 'windshear'

export default function Component () {
  const viewport = useViewport()
  return (
    <>
      {
        viewport.currentWidth > 1280 ?
          (<p>ComponentA</p>) :
          (<p>ComponentB</p>)
      }
    </>
  )
}
```

### Tailwind breakpoints

Windshear accepts breakpoint definitions using the [Tailwind breakpoint schema](https://tailwindcss.com/docs/breakpoints). Simply drop your breakpoints into `useViewport`, and Windshear will continuously update the `activeBreakpoint` property with the key of the active breakpoint. Supports Tailwind's standard, max-width, and multi-range breakpoints.

```js
import { screens } from 'tailwindcss/defaultTheme'
import { useViewport } from 'windshear'

export default function Component () {
  const viewport = useViewport(screens)
  return (
    <>
      {
        viewport.activeBreakpoint === 'lg' ?
          (<p>ComponentA</p>) :
          (<p>ComponentB</p>)
      }
    </>
  )
}
```

### Mobile user agents

Windshear provides basic detection for mobile user agents, and currently supports user agent strings containing the keywords Android, webOS, iPhone, iPad, iPod, or BlackBerry.

```js
import { useViewport } from 'windshear'

export default function Component () {
  const viewport = useViewport()
  return (
    <>
      {
        viewport.isMobileAgent ?
          (<p>ComponentA</p>) :
          (<p>ComponentB</p>)
      }
    </>
  )
}
```
