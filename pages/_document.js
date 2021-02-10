import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      snipcartApiKey: process.env.SNIPCART_API_KEY
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://app.snipcart.com" />
          <link rel="preconnect" href="https://cdn.snipcart.com" />
          <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0.27/default/snipcart.css" />
        </Head>
        <body>
          <Main />

          <script async src="https://cdn.snipcart.com/themes/v3.0.27/default/snipcart.js"></script>
          <div hidden id="snipcart" data-api-key={this.props.snipcartApiKey}></div>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument