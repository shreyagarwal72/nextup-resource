import { useEffect, useState } from "react";

interface SupermanLoaderProps {
  onComplete: () => void;
  duration?: number;
}

const SupermanLoader = ({ onComplete, duration = 1800 }: SupermanLoaderProps) => {
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
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 50%, hsl(var(--primary) / 0.95) 100%)",
      }}
    >
      {/* Superman body - the flying figure */}
      <div className="superman-body">
        <span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <div className="superman-base">
          <span></span>
          <div className="superman-face"></div>
        </div>
      </div>

      {/* Speed lines / fazers */}
      <div className="superman-longfazers">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Loading text */}
      <h1 className="absolute font-semibold text-xs uppercase tracking-widest text-background/90 left-1/2 top-[58%] -translate-x-1/2 animate-pulse">
        Loading...
      </h1>

      {/* Keyframes and styles */}
      <style>{`
        .superman-body {
          position: absolute;
          top: 50%;
          margin-left: -50px;
          left: 50%;
          animation: speeder 0.4s linear infinite;
        }

        .superman-body > span {
          height: 5px;
          width: 35px;
          background: hsl(var(--background));
          position: absolute;
          top: -19px;
          left: 60px;
          border-radius: 2px 10px 1px 0;
        }

        .superman-base span {
          position: absolute;
          width: 0;
          height: 0;
          border-top: 6px solid transparent;
          border-right: 100px solid hsl(var(--background));
          border-bottom: 6px solid transparent;
        }

        .superman-base span:before {
          content: "";
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: hsl(var(--background));
          position: absolute;
          right: -110px;
          top: -16px;
        }

        .superman-base span:after {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border-top: 0 solid transparent;
          border-right: 55px solid hsl(var(--background));
          border-bottom: 16px solid transparent;
          top: -16px;
          right: -98px;
        }

        .superman-face {
          position: absolute;
          height: 12px;
          width: 20px;
          background: hsl(var(--background));
          border-radius: 20px 20px 0 0;
          transform: rotate(-40deg);
          right: -125px;
          top: -15px;
        }

        .superman-face:after {
          content: "";
          height: 12px;
          width: 12px;
          background: hsl(var(--background));
          right: 4px;
          top: 7px;
          position: absolute;
          transform: rotate(40deg);
          transform-origin: 50% 50%;
          border-radius: 0 0 0 2px;
        }

        .superman-body > span > span:nth-child(1),
        .superman-body > span > span:nth-child(2),
        .superman-body > span > span:nth-child(3),
        .superman-body > span > span:nth-child(4) {
          width: 30px;
          height: 1px;
          background: hsl(var(--background));
          position: absolute;
          animation: fazer1 0.2s linear infinite;
        }

        .superman-body > span > span:nth-child(2) {
          top: 3px;
          animation: fazer2 0.4s linear infinite;
        }

        .superman-body > span > span:nth-child(3) {
          top: 1px;
          animation: fazer3 0.4s linear infinite;
          animation-delay: -1s;
        }

        .superman-body > span > span:nth-child(4) {
          top: 4px;
          animation: fazer4 1s linear infinite;
          animation-delay: -1s;
        }

        @keyframes fazer1 {
          0% { left: 0; }
          100% { left: -80px; opacity: 0; }
        }

        @keyframes fazer2 {
          0% { left: 0; }
          100% { left: -100px; opacity: 0; }
        }

        @keyframes fazer3 {
          0% { left: 0; }
          100% { left: -50px; opacity: 0; }
        }

        @keyframes fazer4 {
          0% { left: 0; }
          100% { left: -150px; opacity: 0; }
        }

        @keyframes speeder {
          0% { transform: translate(2px, 1px) rotate(0deg); }
          10% { transform: translate(-1px, -3px) rotate(-1deg); }
          20% { transform: translate(-2px, 0px) rotate(1deg); }
          30% { transform: translate(1px, 2px) rotate(0deg); }
          40% { transform: translate(1px, -1px) rotate(1deg); }
          50% { transform: translate(-1px, 3px) rotate(-1deg); }
          60% { transform: translate(-1px, 1px) rotate(0deg); }
          70% { transform: translate(3px, 1px) rotate(-1deg); }
          80% { transform: translate(-2px, -1px) rotate(1deg); }
          90% { transform: translate(2px, 1px) rotate(0deg); }
          100% { transform: translate(1px, -2px) rotate(-1deg); }
        }

        .superman-longfazers {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .superman-longfazers span {
          position: absolute;
          height: 2px;
          width: 20%;
          background: hsl(var(--background) / 0.6);
        }

        .superman-longfazers span:nth-child(1) {
          top: 20%;
          animation: lf 0.6s linear infinite;
          animation-delay: -5s;
        }

        .superman-longfazers span:nth-child(2) {
          top: 40%;
          animation: lf2 0.8s linear infinite;
          animation-delay: -1s;
        }

        .superman-longfazers span:nth-child(3) {
          top: 60%;
          animation: lf3 0.6s linear infinite;
        }

        .superman-longfazers span:nth-child(4) {
          top: 80%;
          animation: lf4 0.5s linear infinite;
          animation-delay: -3s;
        }

        @keyframes lf {
          0% { left: 200%; }
          100% { left: -200%; opacity: 0; }
        }

        @keyframes lf2 {
          0% { left: 200%; }
          100% { left: -200%; opacity: 0; }
        }

        @keyframes lf3 {
          0% { left: 200%; }
          100% { left: -100%; opacity: 0; }
        }

        @keyframes lf4 {
          0% { left: 200%; }
          100% { left: -100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default SupermanLoader;
