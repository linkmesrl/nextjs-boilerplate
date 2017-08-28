
import Head from 'next/head'
import React from 'react'

export default class extends React.Component {
  render () {
    /*
    const pathToCSS = '/bootstrap/css/bootstrap.min.css'
    const stylesheet = <link rel="stylesheet" type="text/css" href={pathToCSS} />
    */

    return (
      <Head>
        {this.props.meta ? <title>{this.props.meta.title}</title> : null}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="application-name" content="Riot" />
        { /* 
        < link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-TileImage" content="/img/favicomatic/mstile-144x144.png" />
        <meta name="msapplication-square70x70logo" content="/img/favicomatic/mstile-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/img/favicomatic/mstile-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/img/favicomatic/mstile-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/img/favicomatic/mstile-310x310.png" />
        <link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/img/favicomatic/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/img/favicomatic/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/img/favicomatic/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/img/favicomatic/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/img/favicomatic/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/img/favicomatic/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/img/favicomatic/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/img/favicomatic/apple-touch-icon-152x152.png" />
        <link rel="icon" type="image/png" href="/img/favicomatic/favicon-196x196.png" sizes="196x196" />
        <link rel="icon" type="image/png" href="/img/favicomatic/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/img/favicomatic/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/img/favicomatic/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/img/favicomatic/favicon-128.png" sizes="128x128" />
        {stylesheet}
        */ }

      </Head>
    )
  }
}
