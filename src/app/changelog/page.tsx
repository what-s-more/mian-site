import { History, Wrench, Sparkles, Palette, Search, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '更新日志 - 宀·mian',
  description: '网站更新记录',
};

interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    type: 'feature' | 'improve' | 'fix';
    icon: typeof Sparkles;
    text: string;
  }[];
}

const changelog: ChangelogEntry[] = [
  {
    version: '0.0.1',
    date: '2026-05-24',
    changes: [
      { type: 'feature', icon: Sparkles, text: '基于 Next.js 搭建博客框架' },
      { type: 'feature', icon: BookOpen, text: '文章分类、搜索、归档功能' },
      { type: 'feature', icon: Sparkles, text: '精选文章置顶' },
      { type: 'feature', icon: Palette, text: '明暗主题切换' },
      { type: 'feature', icon: Wrench, text: '阅读时间估算、代码高亮（Shiki）' },
      { type: 'feature', icon: Wrench, text: '阅读进度条、返回顶部按钮' },
      { type: 'feature', icon: Palette, text: '页面过渡动画' },
      { type: 'feature', icon: Search, text: '代码块复制按钮' },
      { type: 'feature', icon: Sparkles, text: '图片 Lightbox 放大查看' },
      { type: 'feature', icon: Wrench, text: 'Footer 显示加载用时、访客数、运行天数' },
    ],
  },
];

const typeStyles = {
  feature: 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-300',
  improve: 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300',
  fix: 'bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300',
};

const typeLabels = {
  feature: '新增',
  improve: '优化',
  fix: '修复',
};

export default function ChangelogPage() {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-6">
            <History className="w-4 h-4" />
            更新日志
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            网站<span className="text-indigo-600 dark:text-indigo-400">更新记录</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-slate-400">
            记录每一次迭代与改进
          </p>
        </div>
      </div>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {changelog.map((entry) => (
          <div key={entry.version} className="mb-12 last:mb-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center text-lg font-bold shrink-0">
                {entry.version}
              </div>
              <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700"></div>
              <span className="text-sm text-gray-500 dark:text-slate-500 shrink-0">
                {entry.date}
              </span>
            </div>

            <div className="ml-7 border-l-2 border-gray-100 dark:border-slate-700 pl-8 space-y-3">
              {entry.changes.map((change, i) => {
                const Icon = change.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-3 px-4 -ml-4 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-gray-400 dark:text-slate-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700 dark:text-slate-300">{change.text}</span>
                    <span className={`ml-auto px-2 py-0.5 rounded text-xs font-medium shrink-0 ${typeStyles[change.type]}`}>
                      {typeLabels[change.type]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
