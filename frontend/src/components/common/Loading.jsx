import React from 'react';

export default function Loading({ fullScreen = true, size = 'md' }) {
  const sizes = { sm: 'h-5 w-5', md: 'h-10 w-10', lg: 'h-16 w-16' };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <div className={`${sizes[size]} animate-spin rounded-full border-4 border-blue-600 border-t-transparent`} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizes[size]} animate-spin rounded-full border-4 border-blue-600 border-t-transparent`} />
    </div>
  );
}
