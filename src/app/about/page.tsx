import { User, Mail, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium mb-6">
            <User className="w-4 h-4" />
            关于
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-6">
            关于本站
          </h1>

          <p className="text-lg text-gray-600 dark:text-slate-400 mb-6">
            这里是我记录生活、存档资源的地方。
          </p>

          <p className="text-gray-600 dark:text-slate-400 mb-8">
            没什么特别的，就是随手写写、随手存存。
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-8 border border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100 mb-4">
            联系我
          </h2>

          <div className="space-y-3">
            <a
              href="mailto:oo4272601@gmail.com"
              className="flex items-center gap-3 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>oo4272601@gmail.com</span>
            </a>
            <a
              href="https://github.com/what-s-more"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Globe className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
