import Link from "next/link";
import type { Metadata } from "next";
import { publishedPosts } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on machine learning, building from scratch, and getting models into production.",
};

export default function WritingPage() {
  return (
    <div className="page">
      <div className="page-top">
        <Link className="back" href="/">
          ← home
        </Link>
      </div>

      <header className="page-head">
        <p className="kicker">Writing</p>
        <h1>Notes from building things to understand them.</h1>
        <p className="lede">
          Short essays on machine learning, the habit of reimplementing ideas
          from scratch, and the quiet work of getting a model out of the
          notebook.
        </p>
      </header>

      <div style={{ marginTop: 18 }}>
        {publishedPosts.map((post) => (
          <Link key={post.slug} className="post-row" href={`/writing/${post.slug}`}>
            <div className="post-meta">
              <span>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
            <span className="pt">{post.title}</span>
            <p>{post.summary}</p>
            <div className="tags">
              {post.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
