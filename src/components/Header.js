import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import styled from "styled-components";

const StyleTitle = styled.div`
  text-align: center;
  background-color: gold;
  font-size: 24px;
`;

function Header() {
  const data = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          description
          title
          siteUrl
        }
      }
    }
  `);

  return (
    <StyleTitle>
      <h1>{data.site.siteMetadata.title}</h1>
    </StyleTitle>
  );
}

export default Header;
