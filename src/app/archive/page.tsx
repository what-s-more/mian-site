import { getPostsGroupedByYear } from '@/lib/posts';
import Link from 'next/link';
import { Calendar, Archive, Tag } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '归档 - 宀·mian',
  description: '按日期浏览所有文章',
};

export default function ArchivePage() {
  const postsByYear = getPostsGroupedByYear();
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));
  const totalPosts = Object.values(postsByYear).reduce((sum, posts) => sum + posts.length, 0);

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-6">
            <Archive className="w-4 h-4" />
            归档
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            文章<span className="text-indigo-600 dark:text-indigo-400">归档</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-slate-400">
            共 {totalPosts} 篇文章，跨越 {years.length} 年
          </p>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {years.map((year) => (
          <div key={year} className="mb-12 last:mb-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center text-xl font-bold shrink-0">
                {year}
              </div>
              <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700"></div>
              <span className="text-sm text-gray-500 dark:text-slate-500">
                {postsByYear[year].length} 篇
              </span>
            </div>

            <div className="ml-7 border-l-2 border-gray-100 dark:border-slate-700 pl-8 space-y-4">
              {postsByYear[year].map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}/`}
                  className="group block py-4 px-5 -ml-5 rounded-lg hover:bg-indigo-50/50 dark:hover:bg-indigo-500/5 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-500 shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {post.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 shrink-0">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{post.category}</span>
                    </div>
                  </div>
                  {post.description && (
                    <p className="text-sm text-gray-500 dark:text-slate-500 mt-1 line-clamp-1">
                      {post.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
