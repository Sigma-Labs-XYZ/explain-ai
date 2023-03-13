import React from "react";
// eslint-disable-next-line
import { Helmet, HelmetProvider } from "react-helmet-async";
// import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <meta property="og:title" content="Explain AI" data-react-helmet="true" />
          <meta
            property="og:description"
            content="Explain it to me. Simply."
            data-react-helmet="true"
          />
          <meta
            property="og:image"
            content="https://example.com/my-image.jpg"
            data-react-helmet="true"
          />
          <link rel="canonical" href="https://deploy-preview-118--explain-ai.netlify.app/" />
        </Helmet>
        <h1>Homepage</h1>
        <a href="/javascript">javascript</a>
      </div>
    </HelmetProvider>
  );
}
