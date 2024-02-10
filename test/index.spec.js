/**
 * @jest-environment jsdom
 */

import matchMediaPolyfill from 'mq-polyfill'
import * as screens from './fixtures/screens'
import { renderHook, act } from '@testing-library/react'
import { useViewport } from '../src'

beforeAll(() => {
  matchMediaPolyfill(window)

  window.resizeTo = function (width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height
    }).dispatchEvent(new this.Event('resize'))
  }

  Object.defineProperty(navigator, 'userAgent', (value => ({
    get () { return value },
    set (v) { value = v }
  }))(navigator.userAgent))
})

beforeEach(() => {
  window.resizeTo(1024, 768)
})

test('should return correct default dimensions', () => {
  const { result } = renderHook(() => useViewport())
  expect(result.current.currentWidth).toBe(1024)
  expect(result.current.currentHeight).toBe(768)
})

test('should return correct custom dimensions', () => {
  const { result } = renderHook(() => useViewport())
  act(() => window.resizeTo(1280, 720))
  expect(result.current.currentWidth).toBe(1280)
  expect(result.current.currentHeight).toBe(720)
})

test('should return correct min breakpoint', () => {
  const { result } = renderHook(() => useViewport(screens.min))
  expect(result.current.activeBreakpoint).toBe('lg')
})

test('should return correct max breakpoint', () => {
  const { result } = renderHook(() => useViewport(screens.max))
  expect(result.current.activeBreakpoint).toBe('xl')
})

test('should return correct min-max breakpoint', () => {
  const { result } = renderHook(() => useViewport(screens.minMax))
  act(() => window.resizeTo(800, 768))
  expect(result.current.activeBreakpoint).toBe('md')
})

test('should return correct multi-range breakpoint', () => {
  const { result } = renderHook(() => useViewport(screens.multiRange))
  act(() => window.resizeTo(700, 768))
  expect(result.current.activeBreakpoint).toBe('md')
})

test('should return true if mobile agent detected', () => {
  navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1'
  const { result } = renderHook(() => useViewport())
  act(() => window.resizeTo(2532, 1170))
  expect(result.current.isMobileAgent).toBe(true)
})
