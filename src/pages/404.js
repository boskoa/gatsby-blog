import { Link } from "gatsby";
import * as React from "react";

function NotFoundPage() {
  return (
    <main>
      <h1>Page not found</h1>
      <Link to="/">Go home</Link>.
    </main>
  );
}

export default NotFoundPage;
