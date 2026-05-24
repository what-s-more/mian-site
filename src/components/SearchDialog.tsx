'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, FileText, Tag } from 'lucide-react';
import type { SearchIndexItem } from '@/lib/posts';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  searchIndex: SearchIndexItem[];
}

export default function SearchDialog({ isOpen, onClose, searchIndex }: SearchDialogProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchIndexItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting state when dialog opens is intentional
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const search = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const lowerQuery = searchQuery.toLowerCase();
    const filtered = searchIndex.filter((post) => {
      return (
        post.title.toLowerCase().includes(lowerQuery) ||
        post.description.toLowerCase().includes(lowerQuery) ||
        post.category.toLowerCase().includes(lowerQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    });

    setResults(filtered);
    setSelectedIndex(0);
  }, [searchIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        router.push(`/posts/${results[selectedIndex].slug}/`);
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, results, selectedIndex, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative max-w-xl mx-auto mt-[15vh] px-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-slate-700">
            <Search className="w-5 h-5 text-gray-400 dark:text-slate-500 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                search(e.target.value);
              }}
              placeholder="搜索文章..."
              className="flex-1 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 outline-none text-lg bg-transparent"
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {query.trim() && (
            <div className="max-h-80 overflow-y-auto">
              {results.length > 0 ? (
                <ul>
                  {results.map((post, index) => (
                    <li key={post.slug}>
                      <Link
                        href={`/posts/${post.slug}/`}
                        onClick={onClose}
                        className={`flex items-start gap-3 px-5 py-3.5 transition-colors ${
                          index === selectedIndex
                            ? 'bg-indigo-50 dark:bg-indigo-500/10'
                            : 'hover:bg-gray-50 dark:hover:bg-slate-700/50'
                        }`}
                      >
                        <FileText className="w-4 h-4 text-gray-400 dark:text-slate-500 mt-1 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-slate-100 truncate">
                            {post.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                            {post.description}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400">
                              <Tag className="w-3 h-3" />
                              {post.category}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-5 py-10 text-center">
                  <p className="text-gray-500 dark:text-slate-400 text-sm">
                    未找到与 &ldquo;{query}&rdquo; 相关的结果
                  </p>
                </div>
              )}
            </div>
          )}

          {!query.trim() && (
            <div className="px-5 py-6 text-center">
              <p className="text-gray-400 dark:text-slate-500 text-sm">
                输入关键词搜索文章标题、描述、分类或标签
              </p>
            </div>
          )}

          <div className="flex items-center gap-4 px-5 py-3 border-t border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 text-xs text-gray-400 dark:text-slate-500">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-gray-200 dark:border-slate-600 text-[10px] font-mono">↑↓</kbd>
              导航
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-gray-200 dark:border-slate-600 text-[10px] font-mono">↵</kbd>
              打开
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-700 rounded border border-gray-200 dark:border-slate-600 text-[10px] font-mono">esc</kbd>
              关闭
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
