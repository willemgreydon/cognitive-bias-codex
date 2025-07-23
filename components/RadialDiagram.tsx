'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { biasCategories, CognitiveBias, BiasCategory } from '../data/cognitive-biases';
import { BiasNode } from './BiasNode';
import { DetailPanel } from './DetailPanel';
import { ZoomControls } from './ZoomControls';
import { CategoryFilter } from './CategoryFilter';
import { Brain } from 'lucide-react';
import { useIsMobile } from './ui/use-mobile';

interface RadialDiagramProps {
  width?: number;
  height?: number;
}

export function RadialDiagram({ width = 1200, height = 800 }: RadialDiagramProps) {
  const [selectedBias, setSelectedBias] = useState<CognitiveBias | null>(null);
  const [hoveredBias, setHoveredBias] = useState<CognitiveBias | null>(null);
  const [activeCategories, setActiveCategories] = useState<string[]>(
    biasCategories.map(cat => cat.id)
  );
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPointerPos, setLastPointerPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Responsive dimensions
  const [dimensions, setDimensions] = useState({ 
    width: isMobile ? window.innerWidth : width, 
    height: isMobile ? window.innerHeight : height 
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: rect.height
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  
  // Responsive sizing based on screen size
  const scaleFactor = Math.min(dimensions.width, dimensions.height) / (isMobile ? 500 : 800);
  const brainRadius = Math.max(40, 60 * scaleFactor);
  const categoryRadius = Math.max(120, 160 * scaleFactor);
  const biasRadius = Math.max(200, 280 * scaleFactor);

  // Fixed pointer event handlers that work on both desktop and mobile
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only start dragging if not clicking on interactive elements
    const target = e.target as Element;
    if (target.closest('button') || target.closest('[data-bias-node]')) {
      return;
    }

    e.preventDefault();
    setIsDragging(true);
    setLastPointerPos({ x: e.clientX, y: e.clientY });
    
    // Capture pointer for proper event handling
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;

    e.preventDefault();
    const deltaX = e.clientX - lastPointerPos.x;
    const deltaY = e.clientY - lastPointerPos.y;

    setPanOffset(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));

    setLastPointerPos({ x: e.clientX, y: e.clientY });
  }, [isDragging, lastPointerPos]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;

    e.preventDefault();
    setIsDragging(false);
    
    // Release pointer capture
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  }, [isDragging]);

  // Prevent context menu on long press (mobile)
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
    }
  }, [isMobile]);

  // Wheel zoom for desktop
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (isMobile) return; // Disable wheel zoom on mobile, use pinch instead
    
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    const newZoom = Math.min(Math.max(0.5, zoomLevel + delta), 3);
    setZoomLevel(newZoom);
  }, [zoomLevel, isMobile]);

  // Calculate positions for category labels and bias nodes
  const getPositionsForCategory = (category: BiasCategory, categoryIndex: number) => {
    const totalCategories = biasCategories.length;
    const categoryAngle = (categoryIndex * 2 * Math.PI) / totalCategories;
    
    const categoryLabelX = centerX + Math.cos(categoryAngle) * categoryRadius;
    const categoryLabelY = centerY + Math.sin(categoryAngle) * categoryRadius;

    const biasPositions = category.biases.map((bias, biasIndex) => {
      const biasesInCategory = category.biases.length;
      const angleSpread = isMobile ? Math.PI / 2.5 : Math.PI / 4; // Wider spread on mobile
      const startAngle = categoryAngle - angleSpread / 2;
      const biasAngle = startAngle + (biasIndex * angleSpread) / Math.max(1, biasesInCategory - 1);
      
      return {
        x: centerX + Math.cos(biasAngle) * biasRadius,
        y: centerY + Math.sin(biasAngle) * biasRadius,
        angle: biasAngle
      };
    });

    return {
      categoryLabel: { x: categoryLabelX, y: categoryLabelY, angle: categoryAngle },
      biases: biasPositions
    };
  };

  const filteredCategories = biasCategories.filter(cat => 
    activeCategories.includes(cat.id)
  );

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onWheel={handleWheel}
      onContextMenu={handleContextMenu}
      style={{ 
        touchAction: 'none',
        userSelect: 'none',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
    >
      {/* Mobile-optimized controls */}
      <div className={`absolute ${isMobile ? 'top-2 left-2' : 'top-4 left-4'} z-20`}>
        <CategoryFilter
          categories={biasCategories}
          activeCategories={activeCategories}
          onToggleCategory={(categoryId) => {
            setActiveCategories(prev => 
              prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
            );
          }}
          isMobile={isMobile}
        />
      </div>

      <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-4 right-4'} z-20`}>
        <ZoomControls
          zoomLevel={zoomLevel}
          onZoomIn={() => setZoomLevel(prev => Math.min(prev + 0.2, 3))}
          onZoomOut={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.5))}
          onReset={resetView}
          isMobile={isMobile}
        />
      </div>

      {/* Main diagram container */}
      <div className="w-full h-full flex items-center justify-center">
        <motion.div
          style={{ 
            scale: zoomLevel,
            x: panOffset.x,
            y: panOffset.y
          }}
          animate={{ 
            scale: zoomLevel,
            x: panOffset.x,
            y: panOffset.y
          }}
          transition={{ duration: isDragging ? 0 : 0.3, ease: "easeOut" }}
          className="origin-center"
        >
          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            className="drop-shadow-sm"
            style={{ 
              overflow: 'visible' // Ensure labels aren't clipped
            }}
          >
            {/* Background circles for visual reference */}
            <defs>
              <radialGradient id="backgroundGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="100%" stopColor="rgba(248,250,252,0.7)" />
              </radialGradient>
            </defs>
            
            <circle
              cx={centerX}
              cy={centerY}
              r={biasRadius + 100} // Increased to ensure labels are visible
              fill="url(#backgroundGradient)"
              className="opacity-50"
            />

            {/* Connection lines from center to categories */}
            {filteredCategories.map((category, categoryIndex) => {
              const positions = getPositionsForCategory(category, 
                biasCategories.findIndex(cat => cat.id === category.id)
              );
              
              return (
                <g key={category.id}>
                  {/* Line to category label */}
                  <motion.line
                    x1={centerX}
                    y1={centerY}
                    x2={positions.categoryLabel.x}
                    y2={positions.categoryLabel.y}
                    stroke={category.color}
                    strokeWidth={isMobile ? "2" : "3"}
                    opacity="0.6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: categoryIndex * 0.1 }}
                  />
                  
                  {/* Lines to individual biases */}
                  {positions.biases.map((biasPos, biasIndex) => (
                    <motion.line
                      key={`${category.id}-${biasIndex}`}
                      x1={positions.categoryLabel.x}
                      y1={positions.categoryLabel.y}
                      x2={biasPos.x}
                      y2={biasPos.y}
                      stroke={category.color}
                      strokeWidth={isMobile ? "1.5" : "2"}
                      opacity="0.4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: categoryIndex * 0.1 + biasIndex * 0.05 }}
                    />
                  ))}
                </g>
              );
            })}

            {/* Central brain icon */}
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <circle
                cx={centerX}
                cy={centerY}
                r={brainRadius + 10}
                fill="white"
                stroke="#e2e8f0"
                strokeWidth="2"
                className="drop-shadow-md"
              />
              {/* Fixed brain icon positioning */}
              <g 
                transform={`translate(${centerX - brainRadius/2}, ${centerY - brainRadius/2})`}
              >
                <Brain 
                  size={brainRadius} 
                  className="text-slate-600" 
                  style={{ 
                    width: brainRadius, 
                    height: brainRadius,
                    display: 'block'
                  }} 
                />
              </g>
            </motion.g>

            {/* Category labels */}
            {filteredCategories.map((category, categoryIndex) => {
              const positions = getPositionsForCategory(category,
                biasCategories.findIndex(cat => cat.id === category.id)
              );
              
              return (
                <motion.g
                  key={`category-${category.id}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 + 0.3 }}
                >
                  <circle
                    cx={positions.categoryLabel.x}
                    cy={positions.categoryLabel.y}
                    r={isMobile ? "35" : "45"}
                    fill={category.color}
                    className="opacity-20"
                  />
                  <foreignObject
                    x={positions.categoryLabel.x - (isMobile ? 60 : 80)}
                    y={positions.categoryLabel.y - (isMobile ? 15 : 20)}
                    width={isMobile ? "120" : "160"}
                    height={isMobile ? "30" : "40"}
                    className="pointer-events-none overflow-visible"
                  >
                    <div className="flex items-center justify-center h-full">
                      <h3 
                        className={`text-center leading-tight px-2 ${isMobile ? 'text-xs' : 'text-sm'}`}
                        style={{ color: category.color, fontWeight: 600 }}
                      >
                        {category.name}
                      </h3>
                    </div>
                  </foreignObject>
                </motion.g>
              );
            })}

            {/* Bias nodes - FIXED TO WORK ON BOTH DESKTOP AND MOBILE */}
            {filteredCategories.map((category, categoryIndex) => {
              const positions = getPositionsForCategory(category,
                biasCategories.findIndex(cat => cat.id === category.id)
              );
              
              return category.biases.map((bias, biasIndex) => (
                <BiasNode
                  key={bias.id}
                  bias={bias}
                  category={category}
                  x={positions.biases[biasIndex].x}
                  y={positions.biases[biasIndex].y}
                  isHovered={hoveredBias?.id === bias.id}
                  isSelected={selectedBias?.id === bias.id}
                  onHover={setHoveredBias}
                  onSelect={setSelectedBias}
                  animationDelay={categoryIndex * 0.1 + biasIndex * 0.05 + 0.8}
                  isMobile={isMobile}
                />
              ));
            })}
          </svg>
        </motion.div>
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selectedBias && (
          <DetailPanel
            bias={selectedBias}
            category={biasCategories.find(cat => cat.id === selectedBias.category)!}
            onClose={() => setSelectedBias(null)}
            isMobile={isMobile}
          />
        )}
      </AnimatePresence>

      {/* Hover tooltip - hide on mobile */}
      <AnimatePresence>
        {hoveredBias && !selectedBias && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30"
          >
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-md border">
              <h4 className="mb-2 text-sm" style={{ color: biasCategories.find(cat => cat.id === hoveredBias.category)?.color }}>
                {hoveredBias.name}
              </h4>
              <p className="text-muted-foreground text-xs">
                {hoveredBias.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title - responsive */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className={`absolute ${isMobile ? 'top-16 left-1/2 transform -translate-x-1/2' : 'top-8 left-1/2 transform -translate-x-1/2'} z-10`}
      >
        <h1 className={`text-center ${isMobile ? 'text-xl' : 'text-4xl'} tracking-wider text-slate-700`}>
          COGNITIVE BIAS CODEX
        </h1>
        <p className={`text-center text-slate-500 mt-2 ${isMobile ? 'text-xs' : 'text-base'}`}>
          {isMobile ? 'Tap to explore cognitive biases' : 'Interactive exploration of cognitive biases and mental shortcuts'}
        </p>
      </motion.div>

      {/* Mobile instructions */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
            <p className="text-xs text-slate-600 text-center">
              Pinch to zoom • Drag to pan • Tap nodes to explore
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}