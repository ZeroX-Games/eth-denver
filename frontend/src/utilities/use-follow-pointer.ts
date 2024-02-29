import { useState, useEffect } from 'react';

export function useFollowPointer() {
  const [point, setPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const x = clientX - 15;
      const y = clientY - 15;

      setPoint({ x, y });
    };

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return point;
}
