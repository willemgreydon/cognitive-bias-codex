# Cognitive Bias Codex - Interactive Radial Diagram

An interactive visualization of cognitive biases inspired by the classic Cognitive Bias Codex design. This application features a central brain icon with radiating branches for bias categories, color-coded segments, and interactive nodes that reveal detailed information.

## Features

- **Interactive Radial Design**: Central brain icon with radiating branches for different bias categories
- **Color-Coded Categories**: Muted greens, blues, and greys to distinguish different cognitive bias types
- **Interactive Nodes**: Hover and click on bias nodes to reveal detailed descriptions and examples
- **Smooth Animations**: Framer Motion powered transitions and animations
- **Zoom Controls**: Zoom in/out and reset functionality for detailed exploration
- **Category Filtering**: Show/hide specific bias categories dynamically
- **Responsive Design**: Adapts to different screen sizes
- **Clean Typography**: Hierarchical typography for categories, subcategories, and individual items

## Technology Stack

- **React 18** with TypeScript
- **Framer Motion** for animations and transitions
- **Tailwind CSS** v4.0 for styling
- **Lucide React** for icons
- **Vite** for build tooling
- **SVG** for scalable vector graphics

## Project Structure

```
├── App.tsx                    # Main application component
├── components/
│   ├── RadialDiagram.tsx     # Main radial visualization component
│   ├── BiasNode.tsx          # Individual bias node component
│   ├── DetailPanel.tsx       # Sliding detail panel
│   ├── ZoomControls.tsx      # Zoom functionality
│   ├── CategoryFilter.tsx    # Category filtering controls
│   └── ui/                   # Reusable UI components (shadcn/ui)
├── data/
│   └── cognitive-biases.ts   # Cognitive bias data structure
├── styles/
│   └── globals.css           # Global styles and Tailwind configuration
└── standalone.html           # Self-contained HTML file for deployment
```

## Installation & Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup
1. Clone or download the project files
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 in your browser

### Build for Production
```bash
npm run build
```

## Standalone Deployment

For quick deployment to any subdomain or hosting service, use the `standalone.html` file:

1. Upload `standalone.html` to your web server
2. Access the file directly in a web browser
3. No build process or dependencies required

The standalone version includes all necessary code and CDN links for a fully functional application.

## Data Structure

The application uses a structured data format for cognitive biases:

```typescript
interface CognitiveBias {
  id: string;
  name: string;
  description: string;
  example: string;
  category: string;
}

interface BiasCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  biases: CognitiveBias[];
}
```

## Customization

### Adding New Biases
Edit `data/cognitive-biases.ts` to add new cognitive biases or categories. Each bias should include:
- Unique ID
- Descriptive name
- Clear description of the bias
- Real-world example
- Category assignment

### Styling
The application uses Tailwind CSS v4.0 with custom CSS variables defined in `styles/globals.css`. Colors and spacing can be customized by modifying the CSS variables.

### Animations
Animation timing and effects can be adjusted in the individual components using Framer Motion properties.

## Browser Compatibility

- Modern browsers supporting ES2020
- SVG support required
- CSS Grid and Flexbox support required

## Performance

- Optimized for 60fps animations
- SVG-based rendering for scalability
- Lazy loading of detail panels
- Efficient re-rendering with React optimization

## License

MIT License - Feel free to use and modify for your projects.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Acknowledgments

- Inspired by the original Cognitive Bias Codex by John Manoogian III
- Built with modern web technologies for interactive exploration
- Designed for educational and research purposes