import * as React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { graphql } from "gatsby";

function BlogDetails({ data }) {
  return (
    <Layout pageTitle={data.markdownRemark.frontmatter.title}>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Layout>
  );
}

export const query = graphql`
  query Blog($slug: String) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
      }
    }
  }
`;

export function Head({ data }) {
  return <Seo title={data.markdownRemark.frontmatter.title} />;
}

export default BlogDetails;
