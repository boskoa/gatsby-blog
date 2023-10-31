import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

function Seo({ title }) {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <html lang="en" />
      <title>
        {title} | {data.site.siteMetadata.title}
      </title>
      <meta name="description" content="Gatsby blog tutorial"></meta>
    </>
  );
}

export default Seo;
