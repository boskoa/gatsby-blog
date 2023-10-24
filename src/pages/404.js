import { Link } from "gatsby";
import * as React from "react";
import Seo from "../components/Seo";

function NotFoundPage() {
  return (
    <main>
      <h1>Page not found</h1>
      <Link to="/">Go home</Link>.
    </main>
  );
}

export function Head() {
  return <Seo title="Not Found" />;
}

export default NotFoundPage;
