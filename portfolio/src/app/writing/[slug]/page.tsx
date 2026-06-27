import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, publishedPosts, getPost } from "@/content/writing";
import Markdown from "@/components/Markdown";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return publishedPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.summary,
    openGraph: { type: "article", title: post.title, description: post.summary },
  };
}

export default function WritingPost({ params }: Params) {
  const post = posts.find((p) => p.slug === params.slug && !p.draft);
  if (!post) notFound();

  return (
    <div className="page">
      <div className="page-top">
        <Link className="back" href="/writing">
          ← all writing
        </Link>
      </div>

      <article>
        <header className="page-head">
          <div className="post-meta" style={{ marginBottom: 14 }}>
            <span>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1>{post.title}</h1>
          <p className="lede">{post.summary}</p>
          <div className="tags" style={{ marginTop: 18 }}>
            {post.tags.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        </header>

        <div className="cs-section">
          <Markdown>{post.body}</Markdown>
        </div>

        <div className="article-foot">
          <Link className="back" href="/writing">
            ← all writing
          </Link>
          <Link className="back" href="/">
            home →
          </Link>
        </div>
      </article>
    </div>
  );
}
