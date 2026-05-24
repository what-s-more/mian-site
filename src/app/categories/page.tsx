import { getCategories } from '@/lib/posts';
import Link from 'next/link';
import { FolderOpen, FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '分类 - 宀·mian',
  description: '浏览所有分类',
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-6">
            <FolderOpen className="w-4 h-4" />
            分类
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            按分类<span className="text-indigo-600 dark:text-indigo-400">浏览</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            按主题分类浏览文章，找到你感兴趣的内容。
          </p>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categories.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}/`}
                className="group block p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-colors">
                      <FolderOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {category.name}
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-500">
                    <FileText className="w-4 h-4" />
                    <span>{category.count}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-slate-800 rounded-xl">
            <p className="text-gray-600 dark:text-slate-400">暂无分类。</p>
          </div>
        )}
      </section>
    </div>
  );
}
