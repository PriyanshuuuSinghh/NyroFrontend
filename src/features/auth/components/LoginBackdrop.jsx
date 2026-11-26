import React from 'react';

export function LoginBackdrop() {
  return (
    <div className="auth-backdrop" aria-hidden="true">
      <div className="auth-atmosphere" />
      <svg className="auth-geometry" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <linearGradient id="auth-left-pillar" x2="1" y2="1" gradientUnits="objectBoundingBox">
            <stop stopColor="#284477" />
            <stop offset="1" stopColor="#111c34" />
          </linearGradient>
          <linearGradient id="auth-ribbon" x2="1" y2=".78" gradientUnits="objectBoundingBox">
            <stop stopColor="#4263b3" />
            <stop offset=".43" stopColor="#263d75" />
            <stop offset="1" stopColor="#4667b8" />
          </linearGradient>
          <linearGradient id="auth-right-pillar" x2="0" y2="1" gradientUnits="objectBoundingBox">
            <stop stopColor="#2e477d" />
            <stop offset="1" stopColor="#15223f" />
          </linearGradient>
          <linearGradient id="auth-contour-ink" x2="1" y2=".65" gradientUnits="objectBoundingBox">
            <stop stopColor="#8aa6ef" stopOpacity="0" />
            <stop offset=".22" stopColor="#8aa6ef" stopOpacity=".3" />
            <stop offset=".67" stopColor="#7b99e1" stopOpacity=".23" />
            <stop offset="1" stopColor="#adc3ff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g className="auth-monogram">
          <path d="M157 139H342V767H157Z" fill="url(#auth-left-pillar)" />
          <path d="M1098 139H1283V767H1098Z" fill="url(#auth-right-pillar)" />
          <path d="M157 139H342L1283 767H1098Z" fill="url(#auth-ribbon)" />
          <path d="M157 767V139H342L1283 767H1098L157 139M1098 644V139H1283V767" fill="none" stroke="#9ab3ff" strokeOpacity=".21" />
          <path d="M1222 139H1283V200Z" className="auth-corner" />
          <path d="M158 767H218" className="auth-corner-rule" />
        </g>
        <g className="auth-contours" stroke="url(#auth-contour-ink)" fill="none">
          <path d="M-80 286C139 163 286 165 486 271S809 563 1030 542 1282 406 1512 566" />
          <path d="M-80 307C139 184 286 186 486 292S809 584 1030 563 1282 427 1512 587" />
          <path d="M-80 328C139 205 286 207 486 313S809 605 1030 584 1282 448 1512 608" />
          <path d="M-80 349C139 226 286 228 486 334S809 626 1030 605 1282 469 1512 629" />
          <path d="M-80 370C139 247 286 249 486 355S809 647 1030 626 1282 490 1512 650" />
          <path d="M-80 391C139 268 286 270 486 376S809 668 1030 647 1282 511 1512 671" />
          <path d="M-80 412C139 289 286 291 486 397S809 689 1030 668 1282 532 1512 692" />
        </g>
      </svg>
    </div>
  );
}