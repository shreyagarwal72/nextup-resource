import { useEffect, useState } from "react";

interface PencilLoaderProps {
  onComplete: () => void;
  duration?: number;
}

const PencilLoader = ({ onComplete, duration = 2600 }: PencilLoaderProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, duration - 400);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, duration]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ease-out ${
        isExiting ? "opacity-0 scale-150" : "opacity-100 scale-100"
      }`}
    >
      {/* Blur backdrop */}
      <div className="absolute inset-0 backdrop-blur-xl bg-background/80" />
      {/* Gradient overlay with parallax zoom effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-primary/20 via-background/60 to-primary/10 transition-transform duration-700 ease-out ${
          isExiting ? "scale-125" : "scale-100"
        }`}
      />
      <svg
        className="pencil-loader block w-40 h-40 animate-scale-in relative z-10"
        viewBox="0 0 200 200"
        width="200px"
        height="200px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="pencil-eraser">
            <rect rx="5" ry="5" width="30" height="30"></rect>
          </clipPath>
        </defs>
        <circle
          className="pencil-stroke"
          r="70"
          fill="none"
          stroke="hsl(223, 90%, 10%)"
          strokeWidth="2"
          strokeDasharray="439.82 439.82"
          strokeDashoffset="439.82"
          strokeLinecap="round"
          transform="rotate(-113,100,100)"
        />
        <g className="pencil-rotate" transform="translate(100,100)">
          <g fill="none">
            <circle
              className="pencil-body1"
              r="64"
              stroke="hsl(223,90%,50%)"
              strokeWidth="30"
              strokeDasharray="402.12 402.12"
              strokeDashoffset="402"
              transform="rotate(-90)"
            />
            <circle
              className="pencil-body2"
              r="74"
              stroke="hsl(223,90%,60%)"
              strokeWidth="10"
              strokeDasharray="464.96 464.96"
              strokeDashoffset="465"
              transform="rotate(-90)"
            />
            <circle
              className="pencil-body3"
              r="54"
              stroke="hsl(223,90%,40%)"
              strokeWidth="10"
              strokeDasharray="339.29 339.29"
              strokeDashoffset="339"
              transform="rotate(-90)"
            />
          </g>
          <g className="pencil-eraser" transform="rotate(-90) translate(49,0)">
            <g className="pencil-eraser-skew">
              <rect fill="hsl(223,90%,70%)" rx="5" ry="5" width="30" height="30" />
              <rect fill="hsl(223,90%,60%)" width="5" height="30" clipPath="url(#pencil-eraser)" />
              <rect fill="hsl(223,10%,90%)" width="30" height="20" />
              <rect fill="hsl(223,10%,70%)" width="15" height="20" />
              <rect fill="hsl(223,10%,80%)" width="5" height="20" />
              <rect fill="hsla(223,10%,10%,0.2)" y="6" width="30" height="2" />
              <rect fill="hsla(223,10%,10%,0.2)" y="13" width="30" height="2" />
            </g>
          </g>
          <g className="pencil-point" transform="rotate(-90) translate(49,-30)">
            <polygon fill="hsl(33,90%,70%)" points="15 0,30 30,0 30" />
            <polygon fill="hsl(33,90%,50%)" points="15 0,6 30,0 30" />
            <polygon fill="hsl(223,10%,10%)" points="15 0,20 10,10 10" />
          </g>
        </g>
      </svg>

      <style>{`
        .pencil-loader {
          animation: zoomIn 0.4s ease-out forwards;
        }

        @keyframes zoomIn {
          from {
            transform: scale(0.3);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .pencil-body1,
        .pencil-body2,
        .pencil-body3,
        .pencil-eraser,
        .pencil-eraser-skew,
        .pencil-point,
        .pencil-rotate,
        .pencil-stroke {
          animation-duration: 1.5s;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .pencil-body1,
        .pencil-body2,
        .pencil-body3 {
          transform: rotate(-90deg);
        }

        .pencil-body1 {
          animation-name: pencilBody1;
        }

        .pencil-body2 {
          animation-name: pencilBody2;
        }

        .pencil-body3 {
          animation-name: pencilBody3;
        }

        .pencil-eraser {
          animation-name: pencilEraser;
          transform: rotate(-90deg) translate(49px, 0);
        }

        .pencil-eraser-skew {
          animation-name: pencilEraserSkew;
          animation-timing-function: ease-in-out;
        }

        .pencil-point {
          animation-name: pencilPoint;
          transform: rotate(-90deg) translate(49px, -30px);
        }

        .pencil-rotate {
          animation-name: pencilRotate;
        }

        .pencil-stroke {
          animation-name: pencilStroke;
          transform: translate(100px, 100px) rotate(-113deg);
        }

        @keyframes pencilBody1 {
          from, to {
            stroke-dashoffset: 351.86;
            transform: rotate(-90deg);
          }
          50% {
            stroke-dashoffset: 150.8;
            transform: rotate(-225deg);
          }
        }

        @keyframes pencilBody2 {
          from, to {
            stroke-dashoffset: 406.84;
            transform: rotate(-90deg);
          }
          50% {
            stroke-dashoffset: 174.36;
            transform: rotate(-225deg);
          }
        }

        @keyframes pencilBody3 {
          from, to {
            stroke-dashoffset: 296.88;
            transform: rotate(-90deg);
          }
          50% {
            stroke-dashoffset: 127.23;
            transform: rotate(-225deg);
          }
        }

        @keyframes pencilEraser {
          from, to {
            transform: rotate(-45deg) translate(49px, 0);
          }
          50% {
            transform: rotate(0deg) translate(49px, 0);
          }
        }

        @keyframes pencilEraserSkew {
          from, 32.5%, 67.5%, to {
            transform: skewX(0);
          }
          35%, 65% {
            transform: skewX(-4deg);
          }
          37.5%, 62.5% {
            transform: skewX(8deg);
          }
          40%, 45%, 50%, 55%, 60% {
            transform: skewX(-15deg);
          }
          42.5%, 47.5%, 52.5%, 57.5% {
            transform: skewX(15deg);
          }
        }

        @keyframes pencilPoint {
          from, to {
            transform: rotate(-90deg) translate(49px, -30px);
          }
          50% {
            transform: rotate(-225deg) translate(49px, -30px);
          }
        }

        @keyframes pencilRotate {
          from {
            transform: translate(100px, 100px) rotate(0);
          }
          to {
            transform: translate(100px, 100px) rotate(720deg);
          }
        }

        @keyframes pencilStroke {
          from {
            stroke-dashoffset: 439.82;
            transform: translate(100px, 100px) rotate(-113deg);
          }
          50% {
            stroke-dashoffset: 164.93;
            transform: translate(100px, 100px) rotate(-113deg);
          }
          75%, to {
            stroke-dashoffset: 439.82;
            transform: translate(100px, 100px) rotate(112deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PencilLoader;
