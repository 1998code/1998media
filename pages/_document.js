import { Html, Head, Main, NextScript } from 'next/document';

export default function Document(props) {
  const locale = props?.__NEXT_DATA__?.query?.locale || 'en';
  return (
    <Html lang={locale}>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.1998.media/css/fontawesome.css"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Flex:wght@100..1000&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
