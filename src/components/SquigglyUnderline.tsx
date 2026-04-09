interface SquigglyUnderlineProps {
  color?: string;
  className?: string;
  width?: number;
}

const SquigglyUnderline = ({ color = "hsl(var(--primary))", className = "", width = 200 }: SquigglyUnderlineProps) => (
  <svg
    viewBox={`0 0 ${width} 12`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`mx-auto mt-2 ${className}`}
    style={{ width: `${Math.min(width, 300)}px`, height: '12px' }}
    aria-hidden="true"
  >
    <path
      d={`M2 8 Q ${width * 0.05} 2, ${width * 0.1} 8 T ${width * 0.2} 8 T ${width * 0.3} 8 T ${width * 0.4} 8 T ${width * 0.5} 8 T ${width * 0.6} 8 T ${width * 0.7} 8 T ${width * 0.8} 8 T ${width * 0.9} 8 T ${width - 2} 8`}
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export default SquigglyUnderline;
