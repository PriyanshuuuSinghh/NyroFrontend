import { useEffect } from 'react';

const depthMedia = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

export function usePointerDepth(ref) {
  useEffect(() => {
    const scene = ref.current;
    if (!scene) return;

    const media = window.matchMedia(depthMedia);
    let frame = null;
    let pointerX = 0;
    let pointerY = 0;

    function reset() {
      if (frame !== null) window.cancelAnimationFrame(frame);
      frame = null;
      scene.style.removeProperty('--px');
      scene.style.removeProperty('--py');
      scene.removeAttribute('data-depth-active');
    }

    function update() {
      frame = null;
      const { left, top, width, height } = scene.getBoundingClientRect();
      if (!width || !height) return;

      const x = Math.max(-1, Math.min(1, 2 * (pointerX - left) / width - 1));
      const y = Math.max(-1, Math.min(1, 2 * (pointerY - top) / height - 1));
      scene.style.setProperty('--px', x.toFixed(3));
      scene.style.setProperty('--py', y.toFixed(3));
      scene.toggleAttribute('data-depth-active', true);
    }

    function track(event) {
      if (!media.matches || event.pointerType !== 'mouse') {
        reset();
        return;
      }
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (frame === null) frame = window.requestAnimationFrame(update);
    }

    scene.addEventListener('pointermove', track, { passive: true });
    scene.addEventListener('pointerleave', reset);
    scene.addEventListener('pointercancel', reset);
    window.addEventListener('blur', reset);
    media.addEventListener('change', reset);

    return () => {
      reset();
      scene.removeEventListener('pointermove', track);
      scene.removeEventListener('pointerleave', reset);
      scene.removeEventListener('pointercancel', reset);
      window.removeEventListener('blur', reset);
      media.removeEventListener('change', reset);
    };
  }, [ref]);
}
