import { getCategories, getPostsByCategory } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Link from 'next/link';
import { ArrowLeft, FolderOpen } from 'lucide-react';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({
    category: cat.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ');
  return {
    title: `${categoryName} - 宀·mian`,
    description: `${categoryName} 分类下的文章`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ');
  const posts = getPostsByCategory(categoryName);

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/categories/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All Categories
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 capitalize">
              {categoryName}
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-slate-400">
            {posts.length} 篇文章
          </p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-slate-800 rounded-xl">
            <p className="text-gray-600 dark:text-slate-400">该分类下暂无文章。</p>
          </div>
        )}
      </section>
    </div>
  );
}
