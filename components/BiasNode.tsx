'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { CognitiveBias, BiasCategory } from '../data/cognitive-biases';

interface BiasNodeProps {
  bias: CognitiveBias;
  category: BiasCategory;
  x: number;
  y: number;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (bias: CognitiveBias | null) => void;
  onSelect: (bias: CognitiveBias) => void;
  animationDelay: number;
  isMobile?: boolean;
}

export function BiasNode({
  bias,
  category,
  x,
  y,
  isHovered,
  isSelected,
  onHover,
  onSelect,
  animationDelay,
  isMobile = false
}: BiasNodeProps) {
  const baseRadius = isMobile ? 16 : 12;
  const nodeRadius = isHovered ? baseRadius + 6 : isSelected ? baseRadius + 4 : baseRadius;
  const touchRadius = isMobile ? 28 : 20; // Larger touch target
  
  // Improved label positioning and sizing for mobile
  const labelOffset = isMobile ? 20 : 16;
  const labelWidth = isMobile ? 120 : 120;
  const labelHeight = isMobile ? 50 : 40;

  // Handle click events properly for both desktop and mobile
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onSelect(bias);
  };

  // Handle mouse events for desktop hover
  const handleMouseEnter = () => {
    if (!isMobile) {
      onHover(bias);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      onHover(null);
    }
  };
  
  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: animationDelay,
        type: "spring",
        stiffness: 200
      }}
      style={{ cursor: 'pointer' }}
      whileHover={!isMobile ? { scale: 1.1 } : {}}
      whileTap={{ scale: 0.95 }}
      data-bias-node="true"
    >
      {/* Interactive touch/click target */}
      <circle
        cx={x}
        cy={y}
        r={touchRadius}
        fill="transparent"
        style={{ 
          pointerEvents: 'all',
          cursor: 'pointer'
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      {/* Glow effect for hovered/selected state */}
      {(isHovered || isSelected) && (
        <motion.circle
          cx={x}
          cy={y}
          r={nodeRadius + (isMobile ? 12 : 8)}
          fill={category.color}
          opacity="0.25"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: 'none' }}
        />
      )}
      
      {/* Main node circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={nodeRadius}
        fill={category.color}
        stroke="white"
        strokeWidth={isMobile ? "3" : "2"}
        opacity={isSelected ? 1 : 0.9}
        animate={{ r: nodeRadius }}
        transition={{ duration: 0.2 }}
        className="drop-shadow-sm"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Node label with improved visibility */}
      <motion.foreignObject
        x={x - labelWidth / 2}
        y={y + nodeRadius + labelOffset}
        width={labelWidth}
        height={labelHeight}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: animationDelay + 0.2 }}
        className="pointer-events-none overflow-visible"
        style={{ 
          overflow: 'visible',
          pointerEvents: 'none'
        }}
      >
        <div 
          className="flex items-start justify-center w-full h-full"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '100%',
            height: '100%'
          }}
        >
          {/* Background for better readability */}
          <div
            className={`
              text-center leading-tight px-2 py-1 rounded-md
              ${isMobile ? 'text-xs' : 'text-xs'}
            `}
            style={{ 
              color: category.color,
              fontWeight: isHovered || isSelected ? 600 : 500,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(4px)',
              border: `1px solid ${category.color}20`,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              fontSize: isMobile ? '11px' : '12px',
              lineHeight: '1.2',
              maxWidth: '100%',
              wordWrap: 'break-word',
              hyphens: 'auto'
            }}
          >
            {bias.name}
          </div>
        </div>
      </motion.foreignObject>
      
      {/* Selection indicator */}
      {isSelected && (
        <motion.circle
          cx={x}
          cy={y}
          r={nodeRadius + (isMobile ? 8 : 6)}
          fill="none"
          stroke={category.color}
          strokeWidth={isMobile ? "3" : "2"}
          strokeDasharray="4 4"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Mobile-specific hover/tap feedback */}
      {isMobile && (isHovered || isSelected) && (
        <motion.circle
          cx={x}
          cy={y}
          r={nodeRadius + 15}
          fill="none"
          stroke={category.color}
          strokeWidth="1"
          opacity="0.4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ pointerEvents: 'none' }}
        />
      )}
    </motion.g>
  );
}