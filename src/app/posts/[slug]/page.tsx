import { getAllPostSlugs, getPostData } from '@/lib/posts';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { highlightMarkdown } from '@/lib/shiki-highlight';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostData(slug);
  return {
    title: `${post.title} - 宀·mian`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostData(slug);
  const highlightedContent = await highlightMarkdown(post.content);

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          返回文章列表
        </Link>

        <header className="mb-10">
          <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-3">
            <Tag className="w-4 h-4" />
            <span>{post.category}</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-500 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} 分钟阅读</span>
            </div>
          </div>

          <p className="text-lg text-gray-600 dark:text-slate-400 border-l-4 border-indigo-500 dark:border-indigo-400 pl-4">
            {post.description}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-400 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <hr className="border-gray-200 dark:border-slate-700 mb-10" />

        <MarkdownRenderer content={highlightedContent} />
      </article>
    </div>
  );
}
