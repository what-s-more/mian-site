import Link from 'next/link';
import { Calendar, ArrowRight, Tag, Pin, Clock } from 'lucide-react';
import { PostMetadata } from '@/lib/posts';

interface PostCardProps {
  post: PostMetadata;
  featured?: boolean;
  index?: number;
}

export default function PostCard({ post, featured = false, index = 0 }: PostCardProps) {
  return (
    <article
      className={`card-animate bg-white dark:bg-slate-800 rounded-xl overflow-hidden transition-all duration-200 ${
        featured
          ? 'shadow-md border-2 border-indigo-200 dark:border-indigo-500/40 hover:border-indigo-400 dark:hover:border-indigo-400 hover:shadow-lg'
          : 'shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500/40'
      }`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Link
            href={`/categories/${post.category.toLowerCase().replace(/\s+/g, '-')}/`}
            className="inline-flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            <Tag className="w-3.5 h-3.5" />
            <span>{post.category}</span>
          </Link>
          {featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-full">
              <Pin className="w-3 h-3" />
              置顶
            </span>
          )}
        </div>

        <Link href={`/posts/${post.slug}/`} className="block">
          <h2 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-gray-600 dark:text-slate-400 mb-4 line-clamp-2">
          {post.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-slate-500">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            {post.readingTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readingTime} 分钟</span>
              </div>
            )}
          </div>

          <Link
            href={`/posts/${post.slug}/`}
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 group"
          >
            阅读更多
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
