import React, { useEffect, useRef, useState } from "react";

function Eye() {
  const eyesRef = useRef([]);
  const pupilsRef = useRef([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const eyeCenters = useRef([]);
  const [blink, setBlink] = useState([false, false]);

  // Track mouse
  useEffect(() => {
    const handleMouse = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Blinking eyes randomly
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink([Math.random() < 0.5, Math.random() < 0.5]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Eye animation
  useEffect(() => {
    const animate = () => {
      pupilsRef.current.forEach((pupil, index) => {
        if (!pupil) return;
        const eye = eyesRef.current[index];
        const center = eyeCenters.current[index];
        if (!center) return;

        const dx = mousePos.current.x - center.x;
        const dy = mousePos.current.y - center.y;
        const distance = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx);

        const maxDist = eye.offsetWidth / 4;
        const pupilX = Math.min(maxDist, distance / 8) * Math.cos(angle);
        const pupilY = Math.min(maxDist, distance / 8) * Math.sin(angle);

        pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;

        const tilt = Math.min(12, distance / 60);
        eye.style.transform = `rotate(${tilt * Math.sin(angle)}deg) scale(${
          1 - tilt / 50
        }, ${1 + tilt / 50})`;
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  const setEyeCenter = (el, index) => {
    if (el) {
      const rect = el.getBoundingClientRect();
      eyeCenters.current[index] = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
  };

  return (
    <div className="eyes w-full h-screen overflow-hidden">
      <div
        className="relative w-full h-full bg-cover bg-center flex items-center justify-center gap-10"
        style={{
          backgroundImage:
            "url('https://ochi.design/wp-content/uploads/2022/05/Top-Viewbbcbv-1-1440x921.jpg')",
        }}
      >
        {[0, 1].map((_, i) => (
          <div
            key={i}
            ref={(el) => (eyesRef.current[i] = el)}
            className="w-[15vw] h-[15vw] flex items-center justify-center rounded-full bg-zinc-100"
          >
            <div
              ref={(el) => setEyeCenter(el, i)}
              className={`relative w-2/3 h-2/3 flex items-center justify-center rounded-full bg-zinc-800 overflow-hidden transition-all duration-150 ${
                blink[i] ? "scale-y-10 opacity-50" : ""
              }`}
            >
              {/* Pupil */}
              <div
                ref={(el) => (pupilsRef.current[i] = el)}
                className="w-10 h-10 rounded-full bg-zinc-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg"
              />
              {/* Glow */}
              <div className="absolute w-4 h-4 bg-white rounded-full top-1/3 left-1/3 opacity-50 blur-sm animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Eye;
