'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { SITE_BIRTH_DATE } from '@/lib/site-config';

function calcRunningDays(): number {
  return Math.floor((Date.now() - SITE_BIRTH_DATE.getTime()) / 86400000);
}

export default function Footer() {
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const [runningDays] = useState(calcRunningDays);
  const pathname = usePathname();
  const prevPathnameRef = useRef<string>(pathname);

  useEffect(() => {
    const isNewRoute = prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    if (!isNewRoute) return;

    const startMark = `route-start-${pathname}`;
    const endMark = `route-end-${pathname}`;
    const measureName = `route-duration-${pathname}`;

    performance.mark(startMark);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        performance.mark(endMark);
        try {
          performance.measure(measureName, startMark, endMark);
          const entries = performance.getEntriesByName(measureName);
          if (entries.length > 0) {
            setLoadTime(Math.round(entries[entries.length - 1].duration));
          }
        } catch {
          const markEntry = performance.getEntriesByName(startMark)[0];
          setLoadTime(markEntry ? Math.round(performance.now() - markEntry.startTime) : 0);
        }
        performance.clearMarks(startMark);
        performance.clearMarks(endMark);
        performance.clearMeasures(measureName);
      });
    });
  }, [pathname]);

  useEffect(() => {
    const [nav] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (nav && nav.domContentLoadedEventEnd > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading Performance API is external system sync
      setLoadTime(Math.round(nav.domContentLoadedEventEnd - nav.fetchStart));
    }
  }, []);

  return (
    <footer className="bg-gray-50 dark:bg-slate-800/50 border-t border-gray-200 dark:border-slate-700 mt-auto transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-sm text-gray-500 dark:text-slate-500 leading-relaxed">
          <span>本页加载用时：<span className="text-gray-700 dark:text-slate-300 font-medium">{loadTime ?? '--'}</span> ms</span>
          <span className="mx-2 text-gray-300 dark:text-slate-600">·</span>
          <span>本站已稳定运行 <span className="text-gray-700 dark:text-slate-300 font-medium">{runningDays}</span> 天</span>
        </p>
      </div>
    </footer>
  );
}
