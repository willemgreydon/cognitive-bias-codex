'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ZoomControlsProps {
  zoomLevel: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  isMobile?: boolean;
}

export function ZoomControls({ zoomLevel, onZoomIn, onZoomOut, onReset, isMobile = false }: ZoomControlsProps) {
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="p-1.5">
          <div className="flex flex-col gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onZoomOut}
              disabled={zoomLevel <= 0.5}
              className="h-10 w-10 p-0 touch-manipulation"
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
            
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground text-center min-w-[40px]">
              {Math.round(zoomLevel * 100)}%
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onZoomIn}
              disabled={zoomLevel >= 3}
              className="h-10 w-10 p-0 touch-manipulation"
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
            
            <div className="h-px bg-border mx-2 my-1" />
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-10 w-10 p-0 touch-manipulation"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    );
  }

  // Desktop layout (horizontal)
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <Card className="p-2">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomOut}
            disabled={zoomLevel <= 0.5}
            className="h-8 w-8 p-0"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <div className="px-3 py-1 text-sm font-medium text-muted-foreground min-w-[60px] text-center">
            {Math.round(zoomLevel * 100)}%
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onZoomIn}
            disabled={zoomLevel >= 3}
            className="h-8 w-8 p-0"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-border mx-1" />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="h-8 w-8 p-0"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}