import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="date-chat-pro" key="title"/>
        <meta property="og:description" content="perfect replies for your match" key="description"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
