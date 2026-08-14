import React from 'react';

interface GALogoProps {
  className?: string;
  size?: number | string;
}

/**
 * Logo oficial de Jugadores Anónimos (GA)
 * Fiel a la imagen original:
 * - Letra G inclinada hacia la derecha en ángulo itálico, color rojo oscuro granate con borde negro.
 * - Letra A vertical con barra diagonal izquierda paralela y barra derecha inclinada, con corte interior.
 * - Sombra y contornos negros nítidos.
 */
export const GALogo: React.FC<GALogoProps> = ({
  className = 'w-9 h-9',
}) => {
  return (
    <svg
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} object-contain shrink-0`}
      aria-label="Logo Oficial Jugadores Anónimos"
    >
      <defs>
        <linearGradient id="gaGradientRed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a30b18" />
          <stop offset="60%" stopColor="#87000d" />
          <stop offset="100%" stopColor="#680009" />
        </linearGradient>
      </defs>

      {/* Outer outline grouping */}
      <g stroke="#050505" strokeWidth="4" strokeLinejoin="miter" strokeMiterlimit="5">
        {/* 'G' Letter */}
        <path
          d="M 36 6
             L 58 6
             L 58 21
             L 39 21
             L 21 79
             L 47 79
             L 52 61
             L 40 61
             L 40 48
             L 58 48
             L 58 94
             L 8 94
             Z"
          fill="url(#gaGradientRed)"
        />

        {/* 'A' Letter */}
        <path
          d="M 62 6
             L 88 6
             L 112 94
             L 94 94
             L 89 74
             L 62 74
             L 62 60
             L 85 60
             L 76 25
             L 62 25
             Z"
          fill="url(#gaGradientRed)"
        />

        {/* 'A' inner cutout triangle */}
        <path
          d="M 63 32
             L 74 32
             L 79 49
             L 63 49
             Z"
          fill="#f8f9ff"
          stroke="#050505"
          strokeWidth="3.5"
        />
      </g>
    </svg>
  );
};
