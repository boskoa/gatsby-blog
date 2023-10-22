import * as React from "react";
import Layout from "../components/Layout";

function About() {
  return (
    <Layout pageTitle="About Me">
      <p>Something about me.</p>
    </Layout>
  );
}

export function Head() {
  return <title>About</title>;
}

export default About;
