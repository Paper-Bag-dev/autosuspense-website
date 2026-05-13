"use client";

export const TextSkeleton = ({ lines = 3 }: { lines?: number }) => (
  <div className="animate-pulse space-y-4 w-full">
    {[...Array(lines)].map((_, i) => (
      <div 
        key={i} 
        className="h-4 bg-white/10 rounded-full" 
        style={{ width: i === lines - 1 ? '60%' : '100%' }}
      />
    ))}
  </div>
);

export const TitleSkeleton = () => (
  <div className="animate-pulse h-10 bg-white/10 rounded-lg w-3/4 mb-6" />
);

export const CodeContentSkeleton = () => (
  <div className="animate-pulse p-6 space-y-3 w-full">
    <div className="h-4 bg-white/10 rounded w-1/3" />
    <div className="h-4 bg-white/10 rounded w-2/3" />
    <div className="h-4 bg-white/10 rounded w-1/2" />
    <div className="h-4 bg-white/10 rounded w-3/4" />
    <div className="h-4 bg-white/10 rounded w-1/3" />
    <div className="h-4 bg-white/10 rounded w-2/3" />
  </div>
);

export const CodeSkeleton = () => (
  <div className="animate-pulse w-full h-[450px] bg-white/5 rounded-xl border border-white/10 flex flex-col">
    <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
      <div className="w-3 h-3 rounded-full bg-white/10" />
      <div className="w-3 h-3 rounded-full bg-white/10" />
      <div className="w-3 h-3 rounded-full bg-white/10" />
    </div>
    <CodeContentSkeleton />
  </div>
);
