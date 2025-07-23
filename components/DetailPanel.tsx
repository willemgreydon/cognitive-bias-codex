'use client'

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Lightbulb, ArrowLeft, Brain, Eye } from 'lucide-react';
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
  const panelRef = useRef<HTMLDivElement>(null);

  // Prevent wheel events from bubbling up to the background when detail panel is open
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Stop the wheel event from propagating to parent elements
      e.stopPropagation();
    };

    const panelElement = panelRef.current;
    if (panelElement) {
      // Add event listener with passive: false to allow preventDefault if needed
      panelElement.addEventListener('wheel', handleWheel, { passive: false });
      
      return () => {
        panelElement.removeEventListener('wheel', handleWheel);
      };
    }
  }, []);

  if (isMobile) {
    // Full-screen modal for mobile
    return (
      <motion.div
        ref={panelRef}
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

          {/* Mobile content - with proper scroll handling */}
          <div 
            className="flex-1 overflow-y-auto p-4"
            style={{ 
              overscrollBehavior: 'contain' // Prevent scroll chaining on mobile
            }}
          >
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
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Brain className="h-4 w-4" style={{ color: category.color }} />
                    Why does this happen?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground text-sm">
                    {bias.explanation || "This cognitive bias occurs because our brains are constantly trying to process vast amounts of information efficiently. To save mental energy, we rely on mental shortcuts and patterns that worked in the past, but sometimes lead us astray in new situations."}
                  </p>
                </CardContent>
              </Card>

              {/* Recognition tips */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Eye className="h-4 w-4" style={{ color: category.color }} />
                    How to recognize it
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {bias.howToRecognize ? (
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      {bias.howToRecognize.map((tip, index) => (
                        <li key={index}>• {tip}</li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li>• Pay attention to your first instincts and question them</li>
                      <li>• Seek out opposing viewpoints deliberately</li>
                      <li>• Take time to reflect before making important decisions</li>
                      <li>• Ask others for their perspective on the situation</li>
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Mobile footer */}
          <div className="border-t p-4 bg-slate-50">
            <p className="text-xs text-muted-foreground text-center">
              Part of the Cognitive Bias Codex • Tap back to explore more biases
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Desktop side panel
  return (
    <motion.div
      ref={panelRef}
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

        {/* Content - with proper scroll handling */}
        <div 
          className="flex-1 overflow-y-auto p-6"
          style={{ 
            overscrollBehavior: 'contain' // Prevent scroll chaining
          }}
        >
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

            {/* Why it happens */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" style={{ color: category.color }} />
                  Why does this happen?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {bias.explanation || "This cognitive bias occurs because our brains are constantly trying to process vast amounts of information efficiently. To save mental energy, we rely on mental shortcuts and patterns that worked in the past, but sometimes lead us astray in new situations."}
                </p>
              </CardContent>
            </Card>

            {/* Recognition tips */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" style={{ color: category.color }} />
                  How to recognize it
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bias.howToRecognize ? (
                  <ul className="space-y-2 text-muted-foreground">
                    {bias.howToRecognize.map((tip, index) => (
                      <li key={index}>• {tip}</li>
                    ))}
                  </ul>
                ) : (
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Pay attention to your first instincts and question them</li>
                    <li>• Seek out opposing viewpoints deliberately</li>
                    <li>• Take time to reflect before making important decisions</li>
                    <li>• Ask others for their perspective on the situation</li>
                  </ul>
                )}
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