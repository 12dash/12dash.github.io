import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <div className="page-top">
        <Link className="back" href="/">
          ← home
        </Link>
      </div>
      <header className="page-head">
        <p className="kicker">404</p>
        <h1>This page hasn&apos;t been built yet.</h1>
        <p className="lede">
          The link is broken or the page moved. Try the{" "}
          <Link href="/projects" style={{ borderBottom: "1px solid var(--accent-line)", color: "var(--accent)" }}>
            projects
          </Link>{" "}
          page, or hit ⌘K to jump anywhere.
        </p>
      </header>
    </div>
  );
}
