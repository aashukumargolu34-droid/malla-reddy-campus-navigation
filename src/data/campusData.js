@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  font-family: Inter, 'Segoe UI', sans-serif;
  color: #e2e8f0;
  background: #020817;
  font-weight: 500;
  line-height: 1.5;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body,
#root {
  min-height: 100%;
  height: 100%;
  margin: 0;
}

body {
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.22), transparent 30%),
    linear-gradient(180deg, #020817 0%, #0f172a 100%);
}

* {
  box-sizing: border-box;
}

input,
select,
textarea,
button {
  font: inherit;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.36);
  border-radius: 999px;
}

.map-grid {
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
}

.glass-panel {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.25);
  backdrop-filter: blur(12px);
}

.node-marker {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  transition: all 0.2s ease;
}

.node-marker::after {
  content: '';
  position: absolute;
  inset: -10px;
  border-radius: 9999px;
  border: 1px solid rgba(125, 211, 252, 0.15);
}

.node-marker.selected {
  z-index: 30;
}

.node-marker.selected .dot {
  box-shadow: 0 0 0 6px rgba(56, 189, 248, 0.22);
}

.map-label {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, 8px);
  white-space: nowrap;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.25);
  color: #dbeafe;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 9999px;
}

.route-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #f59e0b, #f97316);
  color: white;
  font-size: 10px;
  font-weight: 700;
  border: 2px solid rgba(15, 23, 42, 1);
}
