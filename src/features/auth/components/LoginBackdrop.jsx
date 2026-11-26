import React from 'react';

export function LoginBackdrop() {
  return (
    <div className="auth-backdrop" aria-hidden="true">
      <svg className="auth-depth-layer auth-depth-back" viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice" focusable="false">
        <polygon points="0,0 520,0 300,420 0,300" fill="#0F1A36" />
        <polygon points="520,0 1100,0 860,300 600,380 300,420" fill="#0C1530" />
        <polygon points="1100,0 1440,0 1440,360 980,240" fill="#162650" />
        <polygon points="0,300 300,420 140,900 0,900" fill="#101C3C" />
        <polygon points="300,420 640,560 520,900 140,900" fill="#0D1733" />
        <polygon points="1440,360 1440,900 960,900 1120,520" fill="#13224A" />
        <polygon points="980,240 1440,360 1120,520 860,300" fill="#0F1B3A" />
      </svg>

      <svg className="auth-depth-layer auth-depth-mid" viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice" focusable="false">
        <polygon points="1160,0 1440,0 1440,300 1260,200" fill="#274078" fillOpacity=".7"
          strokeOpacity=".27" vectorEffect="non-scaling-stroke" />
        <polygon points="0,640 220,560 520,760 420,900 0,900" fill="#1E3366" fillOpacity=".75"
          strokeOpacity=".24" vectorEffect="non-scaling-stroke" />
        <polygon points="1260,560 1440,500 1440,900 1050,900" fill="#22386E" fillOpacity=".65"
          strokeOpacity=".22" vectorEffect="non-scaling-stroke" />
        <path d="M0 420 L400 300 M820 0 L560 380 M1440 330 L980 240" fill="none"
          strokeOpacity=".16" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
