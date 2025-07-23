'use client'

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { BiasCategory } from '../data/cognitive-biases';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';

interface CategoryFilterProps {
  categories: BiasCategory[];
  activeCategories: string[];
  onToggleCategory: (categoryId: string) => void;
  isMobile?: boolean;
}

export function CategoryFilter({ categories, activeCategories, onToggleCategory, isMobile = false }: CategoryFilterProps) {
  const [showFilter, setShowFilter] = useState(false);
  const activeCount = activeCategories.length;
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter when clicking outside (desktop)
  useEffect(() => {
    if (!isMobile && showFilter) {
      const handleClickOutside = (event: MouseEvent) => {
        if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
          setShowFilter(false);
        }
      };

      // Small delay to prevent immediate closing when opening
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showFilter, isMobile]);

  // Close filter on Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showFilter) {
        setShowFilter(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showFilter]);

  const toggleAllCategories = () => {
    if (activeCount === categories.length) {
      // Deselect all
      categories.forEach(cat => {
        if (activeCategories.includes(cat.id)) {
          onToggleCategory(cat.id);
        }
      });
    } else {
      // Select all
      categories.forEach(cat => {
        if (!activeCategories.includes(cat.id)) {
          onToggleCategory(cat.id);
        }
      });
    }
  };

  if (isMobile) {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 h-10 touch-manipulation text-xs"
            onClick={() => setShowFilter(true)}
          >
            <Filter className="h-4 w-4" />
            Filter ({activeCount}/{categories.length})
          </Button>
        </motion.div>

        {/* Full-screen filter modal for mobile */}
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-end"
              onClick={() => setShowFilter(false)}
            >
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-full bg-white rounded-t-lg max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b bg-white sticky top-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Filter Categories</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilter(false)}
                      className="h-10 w-10 p-0"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 overflow-y-auto">
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full touch-manipulation"
                      onClick={toggleAllCategories}
                    >
                      {activeCount === categories.length ? 'Deselect All' : 'Select All'}
                    </Button>
                    
                    <div className="space-y-4">
                      {categories.map((category) => (
                        <div key={category.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
                          <Checkbox
                            id={`mobile-${category.id}`}
                            checked={activeCategories.includes(category.id)}
                            onCheckedChange={() => onToggleCategory(category.id)}
                            className="mt-1"
                          />
                          <div className="grid gap-1.5 leading-none flex-1">
                            <label
                              htmlFor={`mobile-${category.id}`}
                              className="font-medium leading-none cursor-pointer text-sm"
                              style={{ color: category.color }}
                            >
                              {category.name}
                            </label>
                            <p className="text-xs text-muted-foreground">
                              {category.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {category.biases.length} biases
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Bottom padding for safe area */}
                  <div className="h-8" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Desktop popover (improved)
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <div ref={filterRef} style={{ position: 'relative' }}>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          <Filter className="h-4 w-4" />
          Filter ({activeCount}/{categories.length})
        </Button>
        
        <AnimatePresence>
          {showFilter && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 z-40"
              style={{ pointerEvents: 'all' }}
            >
              <Card className="w-80 p-4 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Filter Categories</h4>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleAllCategories}
                        className="text-xs"
                      >
                        {activeCount === categories.length ? 'Deselect All' : 'Select All'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowFilter(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={`desktop-${category.id}`}
                          checked={activeCategories.includes(category.id)}
                          onCheckedChange={() => onToggleCategory(category.id)}
                        />
                        <div className="grid gap-1.5 leading-none flex-1">
                          <label
                            htmlFor={`desktop-${category.id}`}
                            className="font-medium leading-none cursor-pointer"
                            style={{ color: category.color }}
                          >
                            {category.name}
                          </label>
                          <p className="text-xs text-muted-foreground">
                            {category.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {category.biases.length} biases
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}