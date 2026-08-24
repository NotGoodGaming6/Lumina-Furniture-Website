import React from 'react';

// Product Card Skeleton Loader
export const ProductCardSkeleton = () => {
  return (
    <div className="editorial-card rounded-3xl overflow-hidden animate-pulse flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-4">
      <div className="w-full aspect-[4/5] bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4" />
      <div className="space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3 mb-2" />
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4 mb-3" />
        </div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/5" />
        </div>
      </div>
    </div>
  );
};

// Product Detail Page Skeleton Loader
export const ProductDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 animate-pulse">
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-3xl w-full" />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4" />
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-1/3" />
          <div className="space-y-2 pt-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-4/6" />
          </div>
          <div className="h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full pt-6" />
        </div>
      </div>
    </div>
  );
};

// Table Row Skeleton Loader
export const TableRowSkeleton = ({ rows = 5 }) => {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="h-14 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
      ))}
    </div>
  );
};
