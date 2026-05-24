'use client';

import Link from 'next/link';
import { Menu, X, PenTool, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import SearchDialog from './SearchDialog';
import ThemeToggle from './ThemeToggle';
import type { SearchIndexItem } from '@/lib/posts';

interface HeaderProps {
  searchIndex: SearchIndexItem[];
}

export default function Header({ searchIndex }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/categories/', label: '分类' },
    { href: '/archive/', label: '归档' },
    { href: '/changelog/', label: '日志' },
    { href: '/about/', label: '关于' },
  ];

  return (
    <>
      <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-100 dark:border-slate-700 transition-colors">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <PenTool className="w-6 h-6" />
              <span>宀·mian</span>
            </Link>

            <div className="hidden md:flex items-center gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-slate-500 transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>搜索</span>
                <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-gray-400 dark:text-slate-500 bg-white dark:bg-slate-900 rounded border border-gray-200 dark:border-slate-600">
                  ⌘K
                </kbd>
              </button>
              <ThemeToggle />
            </div>

            <div className="flex md:hidden items-center gap-1">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 rounded-lg text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 dark:border-slate-700">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} searchIndex={searchIndex} />
    </>
  );
}
