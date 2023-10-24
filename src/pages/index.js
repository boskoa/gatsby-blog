import * as React from "react";
import Layout from "../components/Layout";
import { StaticImage } from "gatsby-plugin-image";
import Seo from "../components/Seo";

const IndexPage = () => {
  return (
    <Layout pageTitle="Home Page">
      <p>This will be changed</p>
      <StaticImage src="../images/typing-post.jpg" alt="Writing post" />
    </Layout>
  );
};

export function Head() {
  return <Seo title="Gatsby Blog Projct" />;
}

export default IndexPage;
