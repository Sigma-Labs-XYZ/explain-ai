import React from "react";
// eslint-disable-next-line
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <div>
      <Helmet>
        {/* <title>My Title</title> */}
        <title>Explain AI</title>
        <meta
          property="og:description"
          content="Explain it to me. Simply."
          data-react-helmet="true"
        />
      </Helmet>
      <h1>Homepage</h1>
      <a href="/javascript">javascript</a>
    </div>
  );
}
