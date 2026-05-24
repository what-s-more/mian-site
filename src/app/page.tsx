import { getSortedPostsData } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors">
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            欢迎
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-slate-100 mb-6">
            请输入文本1 <br className="hidden md:block" />
            <span className="text-indigo-600 dark:text-indigo-400">请输入文本2</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            请输入文本3
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">最近更新</h2>
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700"></div>
        </div>

        {allPostsData.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {allPostsData.map((post, index) => (
              <PostCard key={post.slug} post={post} featured={post.featured} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-slate-800 rounded-xl">
            <p className="text-gray-600 dark:text-slate-400">暂无内容，敬请期待！</p>
          </div>
        )}
      </section>
    </div>
  );
}
