import React, { useState } from 'react';
import {
  MousePointer,
  MousePointerClick,
  PenTool,
  Spline,
  Square,
  Circle,
  Minus,
  Type,
  RotateCw,
  Maximize2,
  Pipette,
  Blend,
  Combine,
  Frame,
  User,
  Upload,
  Download
} from 'lucide-react';
import { CanvasElement, CustomAsset, ToolId, UserProfile } from './types';

const TOOLS: { id: ToolId; label: string; key: string; icon: React.ReactNode }[] = [
  { id: 'select', label: 'Selection Tool', key: 'V', icon: <MousePointer size={16} /> },
  { id: 'directSelect', label: 'Direct Selection', key: 'A', icon: <MousePointerClick size={16} /> },
  { id: 'pen', label: 'Pen Tool', key: 'P', icon: <PenTool size={16} /> },
  { id: 'curvature', label: 'Curvature Tool', key: 'Shift+~', icon: <Spline size={16} /> },
  { id: 'rect', label: 'Rectangle Tool', key: 'M', icon: <Square size={16} /> },
  { id: 'ellipse', label: 'Ellipse Tool', key: 'L', icon: <Circle size={16} /> },
  { id: 'line', label: 'Line Segment', key: '\\', icon: <Minus size={16} /> },
  { id: 'text', label: 'Type Tool', key: 'T', icon: <Type size={16} /> },
  { id: 'rotate', label: 'Rotate Tool', key: 'R', icon: <RotateCw size={16} /> },
  { id: 'scale', label: 'Scale Tool', key: 'S', icon: <Maximize2 size={16} /> },
  { id: 'eyedropper', label: 'Eyedropper', key: 'I', icon: <Pipette size={16} /> },
  { id: 'gradient', label: 'Gradient Tool', key: 'G', icon: <Blend size={16} /> },
  { id: 'shapeBuilder', label: 'Shape Builder / Pathfinder', key: 'Shift+M', icon: <Combine size={16} /> },
  { id: 'artboard', label: 'Artboard Tool', key: 'Shift+O', icon: <Frame size={16} /> }
];

export default function App() {
  const [activeTool, setActiveTool] = useState<ToolId>('select');
  const [rightTab, setRightTab] = useState<'properties' | 'assets'>('properties');
  const [artboardBg, setArtboardBg] = useState<string>('#ffffff');
  const [elements, setElements] = useState<CanvasElement[]>([
    {
      id: 'el-1',
      type: 'rect',
      name: 'Hero Card',
      x: 160,
      y: 120,
      width: 240,
      height: 150,
      rotation: 0,
      fill: '#4f46e5',
      stroke: '#1e1b4b',
      strokeWidth: 2,
      opacity: 1,
      blendMode: 'normal'
    },
    {
      id: 'el-2',
      type: 'text',
      name: 'Headline',
      x: 185,
      y: 205,
      width: 200,
      height: 40,
      rotation: 0,
      fill: '#ffffff',
      stroke: 'none',
      strokeWidth: 0,
      opacity: 1,
      blendMode: 'normal',
      text: 'Vector Studio',
      fontFamily: 'Inter',
      fontSize: 28
    }
  ]);
  const [selectedId, setSelectedId] = useState<string | null>('el-1');
  const [fonts, setFonts] = useState<string[]>(['Inter', 'Georgia', 'Courier New', 'Arial']);
  const [assets, setAssets] = useState<CustomAsset[]>([]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');

  const selectedElement = elements.find((el) => el.id === selectedId) || null;

  const updateSelected = (patch: Partial<CanvasElement>) => {
    if (!selectedId) return;
    setElements((prev) => prev.map((el) => (el.id === selectedId ? { ...el, ...patch } : el)));
  };

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (activeTool === 'select' || activeTool === 'directSelect') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    const id = `el-${Date.now()}`;

    if (activeTool === 'rect') {
      setElements((prev) => [
        ...prev,
        {
          id,
          type: 'rect',
          name: 'Rectangle',
          x,
          y,
          width: 120,
          height: 90,
          rotation: 0,
          fill: '#10b981',
          stroke: '#064e3b',
          strokeWidth: 2,
          opacity: 1,
          blendMode: 'normal'
        }
      ]);
      setSelectedId(id);
      setActiveTool('select');
    } else if (activeTool === 'ellipse') {
      setElements((prev) => [
        ...prev,
        {
          id,
          type: 'ellipse',
          name: 'Ellipse',
          x,
          y,
          width: 110,
          height: 110,
          rotation: 0,
          fill: '#f59e0b',
          stroke: '#78350f',
          strokeWidth: 2,
          opacity: 1,
          blendMode: 'normal'
        }
      ]);
      setSelectedId(id);
      setActiveTool('select');
    } else if (activeTool === 'text') {
      setElements((prev) => [
        ...prev,
        {
          id,
          type: 'text',
          name: 'Text Layer',
          x,
          y,
          width: 180,
          height: 36,
          rotation: 0,
          fill: '#111827',
          stroke: 'none',
          strokeWidth: 0,
          opacity: 1,
          blendMode: 'normal',
          text: 'New Text',
          fontFamily: fonts[0],
          fontSize: 24
        }
      ]);
      setSelectedId(id);
      setActiveTool('select');
    }
  };

  const handleFontUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fontName = file.name.replace(/\.[^/.]+$/, '');
    const url = URL.createObjectURL(file);
    const fontFace = new FontFace(fontName, `url(${url})`);
    await fontFace.load();
    document.fonts.add(fontFace);
    setFonts((prev) => [...new Set([...prev, fontName])]);
    setAssets((prev) => [...prev, { id: `font-${Date.now()}`, name: fontName, category: 'font', url }]);
  };

  const handleAssetUpload = (e: React.ChangeEvent<HTMLInputElement>, category: 'texture' | 'background') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAssets((prev) => [...prev, { id: `${category}-${Date.now()}`, name: file.name, category, url }]);
  };

  const exportSVG = () => {
    const svgEl = document.getElementById('main-artboard');
    if (!svgEl) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'design-by-samarth-chougule.svg';
    a.click();
  };

  return (
    <div className="app-shell">
      {/* Top Navigation Bar */}
      <header className="top-bar">
        <div className="brand-group">
          <span className="app-badge">Ai</span>
          <strong>Vector Studio</strong>
          <span className="publisher-tag">Published by Samarth Chougule</span>
        </div>

        <div className="brand-group">
          <button className="btn" onClick={exportSVG}>
            <Download size={12} style={{ marginRight: 5, verticalAlign: 'middle' }} />
            Export SVG
          </button>
          <button className="btn btn-primary" onClick={() => setShowAuthModal(true)}>
            <User size={12} style={{ marginRight: 5, verticalAlign: 'middle' }} />
            {user ? user.name : 'Sign In'}
          </button>
        </div>
      </header>

      {/* Main Editor Workspace */}
      <div className="workspace">
        {/* Left Persistent Toolbar */}
        <aside className="toolbar">
          {TOOLS.map((tool) => (
            <button
              key={tool.id}
              className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
              title={`${tool.label} (${tool.key})`}
              onClick={() => setActiveTool(tool.id)}
            >
              {tool.icon}
            </button>
          ))}
        </aside>

        {/* Central Artboard Canvas */}
        <main className="canvas-area">
          <svg
            id="main-artboard"
            width={800}
            height={520}
            style={{ background: artboardBg, boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
            onClick={handleCanvasClick}
          >
            <defs>
              {assets
                .filter((a) => a.category === 'texture')
                .map((tex) => (
                  <pattern key={tex.id} id={tex.id} patternUnits="userSpaceOnUse" width="120" height="120">
                    <image href={tex.url} x="0" y="0" width="120" height="120" preserveAspectRatio="xMidYMid slice" />
                  </pattern>
                ))}
            </defs>

            {elements.map((el) => {
              const isSelected = el.id === selectedId;
              const transform = `rotate(${el.rotation} ${el.x + el.width / 2} ${el.y + el.height / 2})`;

              if (el.type === 'rect') {
                return (
                  <g key={el.id} onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}>
                    <rect
                      x={el.x}
                      y={el.y}
                      width={el.width}
                      height={el.height}
                      fill={el.textureUrl ? `url(#${el.textureUrl})` : el.fill}
                      stroke={isSelected ? '#38bdf8' : el.stroke}
                      strokeWidth={isSelected ? Math.max(2, el.strokeWidth) : el.strokeWidth}
                      opacity={el.opacity}
                      transform={transform}
                    />
                  </g>
                );
              }
              if (el.type === 'ellipse') {
                return (
                  <g key={el.id} onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}>
                    <ellipse
                      cx={el.x + el.width / 2}
                      cy={el.y + el.height / 2}
                      rx={el.width / 2}
                      ry={el.height / 2}
                      fill={el.textureUrl ? `url(#${el.textureUrl})` : el.fill}
                      stroke={isSelected ? '#38bdf8' : el.stroke}
                      strokeWidth={isSelected ? Math.max(2, el.strokeWidth) : el.strokeWidth}
                      opacity={el.opacity}
                      transform={transform}
                    />
                  </g>
                );
              }
              if (el.type === 'text') {
                return (
                  <text
                    key={el.id}
                    x={el.x}
                    y={el.y}
                    fill={el.fill}
                    fontFamily={el.fontFamily}
                    fontSize={el.fontSize}
                    opacity={el.opacity}
                    transform={transform}
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    onClick={(e) => { e.stopPropagation(); setSelectedId(el.id); }}
                  >
                    {el.text}
                  </text>
                );
              }
              return null;
            })}
          </svg>
        </main>

        {/* Right Context-Sensitive Inspector & Assets Panel */}
        <aside className="right-sidebar">
          <div className="panel-tabs">
            <button
              className={`panel-tab ${rightTab === 'properties' ? 'active' : ''}`}
              onClick={() => setRightTab('properties')}
            >
              Properties
            </button>
            <button
              className={`panel-tab ${rightTab === 'assets' ? 'active' : ''}`}
              onClick={() => setRightTab('assets')}
            >
              Assets & Fonts
            </button>
          </div>

          {rightTab === 'properties' ? (
            selectedElement ? (
              <>
                <div className="panel-section">
                  <div className="panel-title">Transform</div>
                  <div className="grid-2">
                    <div className="field">
                      <label>X</label>
                      <input type="number" value={selectedElement.x} onChange={(e) => updateSelected({ x: Number(e.target.value) })} />
                    </div>
                    <div className="field">
                      <label>Y</label>
                      <input type="number" value={selectedElement.y} onChange={(e) => updateSelected({ y: Number(e.target.value) })} />
                    </div>
                    <div className="field">
                      <label>W</label>
                      <input type="number" value={selectedElement.width} onChange={(e) => updateSelected({ width: Number(e.target.value) })} />
                    </div>
                    <div className="field">
                      <label>H</label>
                      <input type="number" value={selectedElement.height} onChange={(e) => updateSelected({ height: Number(e.target.value) })} />
                    </div>
                    <div className="field">
                      <label>Rotate (°)</label>
                      <input type="number" value={selectedElement.rotation} onChange={(e) => updateSelected({ rotation: Number(e.target.value) })} />
                    </div>
                    <div className="field">
                      <label>Opacity</label>
                      <input type="number" step="0.1" min="0" max="1" value={selectedElement.opacity} onChange={(e) => updateSelected({ opacity: Number(e.target.value) })} />
                    </div>
                  </div>
                </div>

                <div className="panel-section">
                  <div className="panel-title">Appearance</div>
                  <div className="grid-2">
                    <div className="field">
                      <label>Fill</label>
                      <input type="color" value={selectedElement.fill} onChange={(e) => updateSelected({ fill: e.target.value, textureUrl: undefined })} />
                    </div>
                    <div className="field">
                      <label>Stroke</label>
                      <input type="color" value={selectedElement.stroke === 'none' ? '#000000' : selectedElement.stroke} onChange={(e) => updateSelected({ stroke: e.target.value })} />
                    </div>
                    <div className="field">
                      <label>Stroke Weight</label>
                      <input type="number" min="0" value={selectedElement.strokeWidth} onChange={(e) => updateSelected({ strokeWidth: Number(e.target.value) })} />
                    </div>
                  </div>
                </div>

                {selectedElement.type === 'text' && (
                  <div className="panel-section">
                    <div className="panel-title">Character / Typography</div>
                    <div className="field" style={{ marginBottom: 8 }}>
                      <label>Text Content</label>
                      <input type="text" value={selectedElement.text || ''} onChange={(e) => updateSelected({ text: e.target.value })} />
                    </div>
                    <div className="grid-2">
                      <div className="field">
                        <label>Font Family</label>
                        <select value={selectedElement.fontFamily} onChange={(e) => updateSelected({ fontFamily: e.target.value })}>
                          {fonts.map((f) => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                      </div>
                      <div className="field">
                        <label>Font Size</label>
                        <input type="number" value={selectedElement.fontSize || 24} onChange={(e) => updateSelected({ fontSize: Number(e.target.value) })} />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="panel-section">
                <div className="panel-title">Document & Artboard</div>
                <div className="field">
                  <label>Artboard Background</label>
                  <input type="color" value={artboardBg} onChange={(e) => setArtboardBg(e.target.value)} />
                </div>
              </div>
            )
          ) : (
            <>
              <div className="panel-section">
                <div className="panel-title">Import Custom Fonts (.TTF / .OTF / .WOFF)</div>
                <label className="btn" style={{ display: 'inline-block', cursor: 'pointer' }}>
                  <Upload size={12} style={{ marginRight: 5 }} /> Upload Font
                  <input type="file" accept=".ttf,.otf,.woff,.woff2" hidden onChange={handleFontUpload} />
                </label>
                <div style={{ marginTop: 8, color: '#a1a1aa' }}>Loaded: {fonts.join(', ')}</div>
              </div>

              <div className="panel-section">
                <div className="panel-title">Import Textures & Patterns</div>
                <label className="btn" style={{ display: 'inline-block', cursor: 'pointer' }}>
                  <Upload size={12} style={{ marginRight: 5 }} /> Upload Texture
                  <input type="file" accept="image/*" hidden onChange={(e) => handleAssetUpload(e, 'texture')} />
                </label>
                <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {assets.filter((a) => a.category === 'texture').map((tex) => (
                    <button key={tex.id} className="btn" onClick={() => updateSelected({ textureUrl: tex.id })}>
                      Apply "{tex.name}" to Selected Shape
                    </button>
                  ))}
                </div>
              </div>

              <div className="panel-section">
                <div className="panel-title">Background Swatches</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['#ffffff', '#18181b', '#fef3c7', '#dbeafe', '#fce7f3'].map((bg) => (
                    <button
                      key={bg}
                      style={{ width: 26, height: 26, background: bg, border: '1px solid #52525b', borderRadius: 4, cursor: 'pointer' }}
                      onClick={() => setArtboardBg(bg)}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </aside>
      </div>

      {/* Sign-In Modal */}
      {showAuthModal && (
        <div className="modal-backdrop" onClick={() => setShowAuthModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <strong>Sign In to Vector Studio</strong>
            <span style={{ color: '#a1a1aa', fontSize: 11 }}>Published by Samarth Chougule</span>
            <div className="field">
              <label>Display Name</label>
              <input type="text" placeholder="Samarth Chougule" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" placeholder="you@example.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                setUser({ name: nameInput || 'Samarth Chougule', email: emailInput || 'user@studio.app', provider: 'email' });
                setShowAuthModal(false);
              }}
            >
              Sign In with Email
            </button>
            <button
              className="btn"
              onClick={() => {
                setUser({ name: 'Guest Designer', email: 'guest@local', provider: 'guest' });
                setShowAuthModal(false);
              }}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
