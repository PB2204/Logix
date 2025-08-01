"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const shapes = ['circle', 'square', 'triangle'];
const colors = [
  'hsl(var(--gradient-primary-from))',
  'hsl(var(--gradient-primary-to))',
  'hsl(var(--gradient-accent-from))',
  'hsl(var(--gradient-accent-to))',
  'hsl(var(--primary))',
  'hsl(var(--accent))',
];

interface Shape {
  id: number;
  type: string;
  color: string;
  size: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
}

const generateShape = (id: number): Shape => ({
  id,
  type: shapes[Math.floor(Math.random() * shapes.length)],
  color: colors[Math.floor(Math.random() * colors.length)],
  size: Math.random() * 40 + 10, // 10px to 50px
  left: Math.random() * 100, // 0% to 100%
  animationDuration: Math.random() * 10 + 8, // 8s to 18s
  animationDelay: Math.random() * 5, // 0s to 5s
});

export const AnimatedShapes = ({ count = 20 }) => {
  const [shapeElements, setShapeElements] = useState<Shape[]>([]);

  useEffect(() => {
    // This check ensures this code only runs on the client, avoiding hydration errors
    setShapeElements(Array.from({ length: count }, (_, i) => generateShape(i)));
  }, [count]);

  if (shapeElements.length === 0) {
    return null; // Don't render anything on the server to prevent mismatch
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {shapeElements.map((shape) => (
        <div
          key={shape.id}
          className={cn('absolute animate-fall', {
            'rounded-full': shape.type === 'circle',
            'shape-triangle': shape.type === 'triangle',
          })}
          style={{
            left: `${shape.left}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            backgroundColor: shape.type !== 'triangle' ? shape.color : 'transparent',
            borderBottomColor: shape.type === 'triangle' ? shape.color : 'transparent',
            animationDuration: `${shape.animationDuration}s`,
            animationDelay: `${shape.animationDelay}s`,
            top: `-${shape.size}px`, // Start off-screen
          }}
        />
      ))}
    </div>
  );
};
