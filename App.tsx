/**
 * Cognitive Bias Codex - Interactive Radial Diagram
 * 
 * This application creates an interactive visualization of cognitive biases
 * inspired by the classic Cognitive Bias Codex design. It features:
 * 
 * - Central brain icon with radiating branches for bias categories
 * - Color-coded segments using muted greens, blues, and greys
 * - Interactive nodes with hover effects and detailed descriptions
 * - Smooth animations and transitions using Framer Motion
 * - Zoom controls and category filtering capabilities
 * - Responsive design with reusable components
 * - Clean typography hierarchy for different information levels
 * 
 * Components Structure:
 * - RadialDiagram: Main container with SVG visualization
 * - BiasNode: Individual bias points with interaction handlers  
 * - DetailPanel: Sliding panel with comprehensive bias information
 * - ZoomControls: Zoom in/out and reset functionality
 * - CategoryFilter: Toggle visibility of bias categories
 * 
 * Data Structure:
 * - cognitive-biases.ts: Centralized data with categories and individual biases
 * - Each bias includes name, description, example, and category assignment
 * - Categories have associated colors following the original design palette
 * 
 * Interaction Features:
 * - Hover nodes to see quick descriptions
 * - Click nodes to open detailed information panel
 * - Zoom and pan for closer examination
 * - Filter categories to focus on specific bias types
 * - Smooth animations enhance user engagement
 * 
 * Developer Notes:
 * - Uses Framer Motion for animations and transitions
 * - SVG-based visualization for scalability and precision
 * - Responsive design adapts to different screen sizes
 * - Clean separation of concerns with modular components
 * - Extensible data structure for easy addition of new biases
 */

import React from 'react';
import { RadialDiagram } from './components/RadialDiagram';

export default function App() {
  return (
    <div className="size-full">
      <RadialDiagram />
    </div>
  );
}