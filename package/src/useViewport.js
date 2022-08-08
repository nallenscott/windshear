import * as React from 'react'
import { each, isArray, isPlainObject, isString, parseInt } from 'lodash'
import { screens } from 'tailwindcss/defaultTheme'

export const useViewport = (queries = screens) => {
  const [viewportSize, setViewportSize] = React.useState({
    currentWidth: undefined,
    currentHeight: undefined,
    isMobileAgent: undefined,
    activeBreakpoint: undefined
  })

  React.useEffect(() => {
    let b // breakpoint

    const handleResize = () => {
      const w = getWindowWidth()

      /**
       * Evaluates `min` against the current screen width.
       *
       * @param  {String} min Min breakpoint value
       * @param  {String} k   Key of breakpoint in query object
       * @return {String}     Key of active breakpoint
       */
      const min = (min, k) => {
        min = parseInt(min, 10)
        b = w >= min ? k : b
      }

      /**
       * Evaluates `max` against the current screen width.
       *
       * @param  {String} max Max breakpoint value
       * @param  {String} k   Key of breakpoint in query object
       * @return {String}     Key of active breakpoint
       */
      const max = (max, k) => {
        max = parseInt(max, 10)
        b = w <= max ? k : b
      }

      /**
       * Evaluates `min` and `max` against the current screen width.
       *
       * @param  {String} min Min breakpoint value
       * @param  {String} max Max breakpoint value
       * @param  {String} k   Key of breakpoint in query object
       * @return {String}     Key of active breakpoint
       */
      const rng = (min, max, k) => {
        min = parseInt(min, 10)
        max = parseInt(max, 10)
        b = w >= min && w <= max ? k : b
      }

      /**
       * Evaluates compound media query against the current screen width.
       *
       * @param  {Object} q Min/max breakpoint values
       * @param  {String} k Key of breakpoint in query object
       * @return {String}   Key of active breakpoint
       */
      const mlt = (q, k) => {
        if (q.min && !q.max) min(q.min, k)
        if (!q.min && q.max) max(q.max, k)
        if (q.min && q.max) rng(q.min, q.max, k)
      }

      each(queries, (v, k) => {
        if (isString(v)) { // min
          min(v, k)
        }
        if (isPlainObject(v)) { // max
          each(v, () => mlt(v, k))
        }
        if (isArray(v)) { // multi-range
          each(v, o => each(o, () => mlt(o, k)))
        }
      })

      function getWindowWidth () {
        return typeof window !== 'undefined'
          ? isMobileAgent()
            ? window.screen.width
            : window.innerWidth
          : 0
      }

      function getWindowHeight () {
        return typeof window !== 'undefined'
          ? isMobileAgent()
            ? window.screen.height
            : window.innerHeight
          : 0
      }

      /**
       * https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#mobile_tablet_or_desktop
       */
      function isMobileAgent () {
        return typeof navigator !== 'undefined'
          ? /Mobi/.test(navigator.userAgent)
          : false
      }

      setViewportSize({
        currentWidth: getWindowWidth(),
        currentHeight: getWindowHeight(),
        isMobileAgent: isMobileAgent(),
        activeBreakpoint: b
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return viewportSize
}
