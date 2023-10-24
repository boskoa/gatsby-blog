import * as React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

function About() {
  return (
    <Layout pageTitle="About Me">
      <p>Something about me.</p>
    </Layout>
  );
}

export function Head() {
  return <Seo title="About" />;
}

export default About;
