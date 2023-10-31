import * as React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { Link, graphql } from "gatsby";

function BlogPage({ data }) {
  return (
    <Layout pageTitle="My Blog Posts">
      {data.allMarkdownRemark.nodes.map((n) => (
        <article key={n.id}>
          <h2>
            <Link to={`/blogs/${n.frontmatter.slug}`}>
              {n.frontmatter.title}
            </Link>
          </h2>
          <p>{n.excerpt}</p>
        </article>
      ))}
    </Layout>
  );
}

export const query = graphql`
  query Blogs {
    allMarkdownRemark {
      nodes {
        frontmatter {
          title
          slug
        }
        id
        excerpt
      }
    }
  }
`;

export function Head() {
  return <Seo title="My Blog Posts" />;
}

export default BlogPage;
