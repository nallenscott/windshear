import Head from 'next/head'
import { screens } from 'tailwindcss/defaultTheme'
import { useViewport } from './../../package/src'

export default function Home () {
  const viewport = useViewport(screens)
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>{viewport.currentWidth}</p>

      <p>{viewport.activeBreakpoint}</p>
    </>
  )
}
