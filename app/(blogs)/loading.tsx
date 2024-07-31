import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="relative w-16 h-16 animate-spin">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-8 bg-muted-foreground" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center rotate-45">
          <div className="w-1 h-8 bg-muted-foreground" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center -rotate-45">
          <div className="w-1 h-8 bg-muted-foreground" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-1 bg-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
