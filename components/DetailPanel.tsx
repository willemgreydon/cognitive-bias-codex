'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Lightbulb, ArrowLeft } from 'lucide-react';
import { CognitiveBias, BiasCategory } from '../data/cognitive-biases';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface DetailPanelProps {
  bias: CognitiveBias;
  category: BiasCategory;
  onClose: () => void;
  isMobile?: boolean;
}

export function DetailPanel({ bias, category, onClose, isMobile = false }: DetailPanelProps) {
  if (isMobile) {
    // Full-screen modal for mobile
    return (
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed inset-0 bg-white z-50 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Mobile header */}
          <div 
            className="p-4 border-b bg-white sticky top-0 z-10"
            style={{ backgroundColor: `${category.color}08` }}
          >
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-10 w-10 p-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex-1 mx-3 text-center">
                <Badge 
                  variant="secondary" 
                  className="mb-1"
                  style={{ 
                    backgroundColor: `${category.color}20`,
                    color: category.color,
                    fontSize: '10px'
                  }}
                >
                  {category.name}
                </Badge>
                <h2 
                  className="text-lg leading-tight"
                  style={{ color: category.color }}
                >
                  {bias.name}
                </h2>
              </div>
              
              <div className="w-10" /> {/* Spacer for centering */}
            </div>
          </div>

          {/* Mobile content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4 max-w-lg mx-auto">
              {/* Description card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <BookOpen className="h-4 w-4" style={{ color: category.color }} />
                    What is it?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-sm">
                    {bias.description}
                  </p>
                </CardContent>
              </Card>

              {/* Example card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lightbulb className="h-4 w-4" style={{ color: category.color }} />
                    Real-world example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-sm">
                    {bias.example}
                  </p>
                </CardContent>
              </Card>

              {/* Why it happens */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Why does this happen?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground text-sm">
                    This cognitive bias occurs because our brains are constantly trying to 
                    process vast amounts of information efficiently. To save mental energy, 
                    we rely on mental shortcuts and patterns that worked in the past, 
                    but sometimes lead us astray in new situations.
                  </p>
                </CardContent>
              </Card>

              {/* Recognition tips */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">How to recognize it</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>• Pay attention to your first instincts and question them</li>
                    <li>• Seek out opposing viewpoints deliberately</li>
                    <li>• Take time to reflect before making important decisions</li>
                    <li>• Ask others for their perspective on the situation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mobile footer */}
          <div className="border-t p-4 bg-slate-50">
            <p className="text-xs text-muted-foreground text-center">
              Part of the Cognitive Bias Codex • Swipe down or tap back to explore more
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Desktop side panel (existing design)
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-40 border-l"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div 
          className="p-6 border-b"
          style={{ backgroundColor: `${category.color}15` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Badge 
                variant="secondary" 
                className="mb-3"
                style={{ 
                  backgroundColor: `${category.color}25`,
                  color: category.color
                }}
              >
                {category.name}
              </Badge>
              <h2 
                className="mb-2 leading-tight"
                style={{ color: category.color }}
              >
                {bias.name}
              </h2>
              <p className="text-muted-foreground">
                {category.description}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-2 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Description */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" style={{ color: category.color }} />
                  What is it?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">
                  {bias.description}
                </p>
              </CardContent>
            </Card>

            {/* Example */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" style={{ color: category.color }} />
                  Real-world example
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">
                  {bias.example}
                </p>
              </CardContent>
            </Card>

            {/* Additional insights */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Why does this happen?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  This cognitive bias occurs because our brains are constantly trying to 
                  process vast amounts of information efficiently. To save mental energy, 
                  we rely on mental shortcuts and patterns that worked in the past, 
                  but sometimes lead us astray in new situations.
                </p>
              </CardContent>
            </Card>

            {/* Tips to overcome */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>How to recognize it</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Pay attention to your first instincts and question them</li>
                  <li>• Seek out opposing viewpoints deliberately</li>
                  <li>• Take time to reflect before making important decisions</li>
                  <li>• Ask others for their perspective on the situation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-4 bg-slate-50">
          <p className="text-xs text-muted-foreground text-center">
            Part of the Cognitive Bias Codex • Click outside to explore more biases
          </p>
        </div>
      </div>
    </motion.div>
  );
}