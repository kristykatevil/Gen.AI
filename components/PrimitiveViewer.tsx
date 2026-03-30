"use client";

import { PrimitiveType } from "@/lib/types";

function BoxGraphic() {
  return <svg viewBox="0 0 240 220" width="100%" height="100%" aria-hidden="true">
    <polygon points="80,45 155,30 210,72 135,88" fill="#72d8ff" opacity="0.95" />
    <polygon points="80,45 135,88 135,165 80,125" fill="#4f86ff" opacity="0.9" />
    <polygon points="135,88 210,72 210,148 135,165" fill="#7a66ff" opacity="0.95" />
    <polygon points="80,125 135,165 210,148 155,110" fill="#91b6ff" opacity="0.88" />
  </svg>;
}

function SphereGraphic() {
  return <svg viewBox="0 0 240 220" width="100%" height="100%" aria-hidden="true">
    <defs>
      <radialGradient id="sphereFill" cx="35%" cy="30%">
        <stop offset="0%" stopColor="#b5f5ff" />
        <stop offset="45%" stopColor="#77d2ff" />
        <stop offset="100%" stopColor="#5063ff" />
      </radialGradient>
    </defs>
    <ellipse cx="120" cy="170" rx="62" ry="14" fill="#000000" opacity="0.18" />
    <circle cx="120" cy="105" r="62" fill="url(#sphereFill)" />
    <ellipse cx="120" cy="105" rx="62" ry="22" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
    <ellipse cx="120" cy="105" rx="20" ry="62" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
  </svg>;
}

function CylinderGraphic() {
  return <svg viewBox="0 0 240 220" width="100%" height="100%" aria-hidden="true">
    <ellipse cx="120" cy="55" rx="56" ry="20" fill="#8edaff" />
    <rect x="64" y="55" width="112" height="92" fill="#5476ff" />
    <ellipse cx="120" cy="147" rx="56" ry="20" fill="#8b73ff" />
    <ellipse cx="120" cy="55" rx="56" ry="20" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
  </svg>;
}

function TorusGraphic() {
  return <svg viewBox="0 0 240 220" width="100%" height="100%" aria-hidden="true">
    <defs>
      <radialGradient id="torusFill" cx="35%" cy="30%">
        <stop offset="0%" stopColor="#c9f8ff" />
        <stop offset="55%" stopColor="#6fd2ff" />
        <stop offset="100%" stopColor="#6c59ff" />
      </radialGradient>
    </defs>
    <ellipse cx="120" cy="110" rx="76" ry="50" fill="url(#torusFill)" />
    <ellipse cx="120" cy="110" rx="34" ry="22" fill="#0b1020" />
    <ellipse cx="120" cy="162" rx="64" ry="11" fill="#000000" opacity="0.18" />
  </svg>;
}

function ConeGraphic() {
  return <svg viewBox="0 0 240 220" width="100%" height="100%" aria-hidden="true">
    <polygon points="120,28 60,146 180,146" fill="#6ccfff" />
    <polygon points="120,28 180,146 120,164" fill="#6a5dff" />
    <ellipse cx="120" cy="146" rx="60" ry="18" fill="#97b0ff" />
  </svg>;
}

function Graphic({ kind }: { kind: PrimitiveType }) {
  switch (kind) {
    case "sphere": return <SphereGraphic />;
    case "cylinder": return <CylinderGraphic />;
    case "torus": return <TorusGraphic />;
    case "cone": return <ConeGraphic />;
    case "box":
    default:
      return <BoxGraphic />;
  }
}

export function PrimitiveViewer({ kind }: { kind: PrimitiveType }) {
  return <div className="viewer-shell"><div className="viewer-inner"><Graphic kind={kind} /></div></div>;
}
