"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export function LensIntro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [irisOpen, setIrisOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 3.7])
  const opacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 1, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.42], [0, 1, 1])
  const textY = useTransform(scrollYProgress, [0, 0.3], [50, 0])
  const flareOp = useTransform(scrollYProgress, [0, 0.35, 0.75], [0.35, 0.85, 0.25])
  const focusRot = useTransform(scrollYProgress, [0, 1], [0, 60])
  const smoothRot = useSpring(focusRot, { stiffness: 40, damping: 20 })
  const reflectY = useTransform(scrollYProgress, [0, 0.5], [0, 12])

  useEffect(() => {
    const t = setTimeout(() => setIrisOpen(true), 400)
    return () => clearTimeout(t)
  }, [])

  // Lens size in px — everything is relative to this
  const LENS = 460

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-[#04040a]" />

        {/* Top rim light from behind (key light) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 55% 22% at 50% 0%,
              rgba(180,205,255,0.20) 0%,
              rgba(100,130,220,0.07) 50%,
              transparent 100%
            )`,
          }}
        />

        {/* Floor wet reflection atmosphere */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "38%",
            background: `radial-gradient(ellipse 70% 60% at 50% 100%,
              rgba(20,25,60,0.50) 0%,
              rgba(6,7,18,0.70) 45%,
              transparent 100%
            )`,
          }}
        />

        {/* SCENE — scale + fade on scroll */}
        <motion.div
          className="relative flex flex-col items-center"
          style={{ scale, opacity, transformOrigin: "center 54%" } as any}
        >

          {/* ============================================================
              CAMERA BODY — drawn as SVG so the shape is accurate
              viewBox: 900 wide × 620 tall
              Lens hole centre: 450, 310
              ============================================================ */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "min(90vw, 830px)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              aspectRatio: "900 / 620",
            }}
          >
            <svg
              viewBox="0 0 900 620"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "100%", overflow: "visible" }}
            >
              <defs>
                {/* Main body fill */}
                <radialGradient id="bodyFill" cx="50%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#1e2535" />
                  <stop offset="50%" stopColor="#0e1118" />
                  <stop offset="100%" stopColor="#060709" />
                </radialGradient>

                {/* Grip fill (darker, more matte) */}
                <radialGradient id="gripFill" cx="25%" cy="40%" r="70%">
                  <stop offset="0%" stopColor="#181f2c" />
                  <stop offset="60%" stopColor="#0a0d14" />
                  <stop offset="100%" stopColor="#040507" />
                </radialGradient>

                {/* Right side fill */}
                <radialGradient id="rightFill" cx="75%" cy="40%" r="70%">
                  <stop offset="0%" stopColor="#161d28" />
                  <stop offset="60%" stopColor="#090c12" />
                  <stop offset="100%" stopColor="#040507" />
                </radialGradient>

                {/* Viewfinder fill */}
                <radialGradient id="vfFill" cx="50%" cy="10%" r="75%">
                  <stop offset="0%" stopColor="#222d40" />
                  <stop offset="55%" stopColor="#0e1420" />
                  <stop offset="100%" stopColor="#060809" />
                </radialGradient>

                {/* Dial fill */}
                <radialGradient id="dialFill" cx="38%" cy="30%" r="65%">
                  <stop offset="0%" stopColor="#2a3347" />
                  <stop offset="100%" stopColor="#0c1018" />
                </radialGradient>

                {/* Top rim light gradient */}
                <linearGradient id="rimLight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(180,210,255,0)" />
                  <stop offset="30%" stopColor="rgba(190,215,255,0.30)" />
                  <stop offset="50%" stopColor="rgba(210,225,255,0.50)" />
                  <stop offset="70%" stopColor="rgba(190,215,255,0.30)" />
                  <stop offset="100%" stopColor="rgba(180,210,255,0)" />
                </linearGradient>

                {/* Lens hole mask */}
                <mask id="bodyMask">
                  <rect width="900" height="620" fill="white" />
                  {/* Cut out lens circle */}
                  <circle cx="450" cy="310" r="222" fill="black" />
                </mask>

                <filter id="bodyShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="35" stdDeviation="28" floodColor="#000000" floodOpacity="0.98" />
                  <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000000" floodOpacity="0.85" />
                </filter>
              </defs>

              {/* ---- LEFT GRIP ---- */}
              {/* Organic shape on left — wider at grip */}
              <path
                d="
                  M 30,180
                  C 20,180 10,200 10,230
                  L 10,540
                  C 10,570 25,590 55,592
                  L 195,595
                  L 195,175
                  C 140,172 70,178 30,180
                  Z
                "
                fill="url(#gripFill)"
                filter="url(#bodyShadow)"
              />

              {/* ---- RIGHT SIDE ---- */}
              <path
                d="
                  M 870,200
                  C 882,200 892,215 892,240
                  L 892,530
                  C 892,560 880,582 855,585
                  L 705,590
                  L 705,182
                  C 760,180 830,198 870,200
                  Z
                "
                fill="url(#rightFill)"
                filter="url(#bodyShadow)"
              />

              {/* ---- MAIN BODY (rectangular core) ---- */}
              {/* This is the flat front face, rectangular with rounded corners */}
              <rect
                x="155"
                y="172"
                width="590"
                height="425"
                rx="18"
                ry="18"
                fill="url(#bodyFill)"
                mask="url(#bodyMask)"
                filter="url(#bodyShadow)"
              />

              {/* Body top rim light line */}
              <path
                d="M 165,173 Q 450,165 735,173"
                stroke="url(#rimLight)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.7"
              />

              {/* Subtle inner edge line at top of body */}
              <path
                d="M 165,180 Q 450,172 735,180"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
                fill="none"
              />

              {/* ---- VIEWFINDER HUMP ---- */}
              {/* Flat-topped bump, realistic DSLR shape */}
              <path
                d="
                  M 330,172
                  L 330,90
                  C 330,75 345,62 360,58
                  L 430,50
                  L 470,50
                  L 540,58
                  C 555,62 570,75 570,90
                  L 570,172
                  Z
                "
                fill="url(#vfFill)"
                filter="url(#bodyShadow)"
              />

              {/* Viewfinder top rim light */}
              <path
                d="M 338,90 C 338,76 352,64 365,60 L 430,52 L 470,52 L 535,60 C 548,64 562,76 562,90"
                stroke="url(#rimLight)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.65"
              />

              {/* Viewfinder top flat surface */}
              <path
                d="M 338,50 L 380,42 L 520,42 L 562,50"
                stroke="rgba(190,215,255,0.20)"
                strokeWidth="1"
                fill="none"
              />

              {/* Hot shoe slot */}
              <rect x="400" y="38" width="100" height="8" rx="2" fill="rgba(10,12,18,0.9)" />
              <rect x="402" y="40" width="96" height="4" rx="1" fill="rgba(255,255,255,0.025)" />

              {/* ---- TOP DIALS ---- */}
              {/* Left large dial */}
              <ellipse cx="225" cy="128" rx="42" ry="38" fill="url(#dialFill)" />
              <ellipse cx="225" cy="126" rx="40" ry="15" fill="rgba(255,255,255,0.04)" />
              <ellipse cx="225" cy="128" rx="42" ry="38" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

              {/* Left small dial */}
              <ellipse cx="310" cy="118" rx="30" ry="26" fill="url(#dialFill)" />
              <ellipse cx="310" cy="116" rx="28" ry="10" fill="rgba(255,255,255,0.035)" />

              {/* Right dial */}
              <ellipse cx="672" cy="120" rx="32" ry="28" fill="url(#dialFill)" />
              <ellipse cx="672" cy="118" rx="30" ry="11" fill="rgba(255,255,255,0.035)" />

              {/* ---- BOTTOM EDGE of body ---- */}
              <line
                x1="155" y1="596"
                x2="745" y2="596"
                stroke="rgba(255,255,255,0.025)"
                strokeWidth="1"
              />

              {/* ---- LENS MOUNT RING (inside body, around lens) ---- */}
              {/* Thin chrome ring where lens meets body */}
              <circle
                cx="450" cy="310" r="226"
                fill="none"
                stroke="rgba(80,90,110,0.55)"
                strokeWidth="3"
              />
              <circle
                cx="450" cy="310" r="224"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="1"
              />

            </svg>
          </div>

          {/* ============================================================
              LENS — absolutely positioned, centered
              ============================================================ */}
          <div
            className="relative z-10"
            style={{ width: `min(68vw, ${LENS}px)`, aspectRatio: "1 / 1" }}
          >

            {/* Outer barrel */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 38% 30%,
                  rgba(48,56,72,1) 0%,
                  rgba(22,26,36,1) 42%,
                  rgba(8,9,14,1) 100%
                )`,
                boxShadow: `
                  0 40px 100px rgba(0,0,0,0.99),
                  0 10px 35px rgba(0,0,0,0.92),
                  inset 0 2px 0 rgba(255,255,255,0.08),
                  inset 0 -2px 6px rgba(0,0,0,0.92),
                  inset 0 0 0 1px rgba(255,255,255,0.045)
                `,
              }}
            />

            {/* Top rim highlight */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: "1%",
                left: "12%",
                right: "12%",
                height: "8%",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.07), transparent)",
                borderRadius: "50%",
                filter: "blur(2px)",
              }}
            />

            {/* Outer chrome bevel line */}
            <div
              className="absolute inset-[0.5%] rounded-full pointer-events-none"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 2px 0 rgba(255,255,255,0.10)",
              }}
            />

            {/* === FOCUS RING (knurled) === */}
            <motion.div
              className="absolute inset-[4%] rounded-full overflow-hidden"
              style={{ rotate: smoothRot }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg,
                    rgba(24,30,40,1),     rgba(46,56,72,1) 3.2%,
                    rgba(22,28,38,1) 6.4%, rgba(44,54,70,1) 9.6%,
                    rgba(22,28,38,1) 12.8%, rgba(44,54,70,1) 16%,
                    rgba(22,28,38,1) 19.2%, rgba(44,54,70,1) 22.4%,
                    rgba(22,28,38,1) 25.6%, rgba(44,54,70,1) 28.8%,
                    rgba(22,28,38,1) 32%, rgba(44,54,70,1) 35.2%,
                    rgba(22,28,38,1) 38.4%, rgba(44,54,70,1) 41.6%,
                    rgba(22,28,38,1) 44.8%, rgba(44,54,70,1) 48%,
                    rgba(22,28,38,1) 51.2%, rgba(44,54,70,1) 54.4%,
                    rgba(22,28,38,1) 57.6%, rgba(44,54,70,1) 60.8%,
                    rgba(22,28,38,1) 64%, rgba(44,54,70,1) 67.2%,
                    rgba(22,28,38,1) 70.4%, rgba(44,54,70,1) 73.6%,
                    rgba(22,28,38,1) 76.8%, rgba(44,54,70,1) 80%,
                    rgba(22,28,38,1) 83.2%, rgba(44,54,70,1) 86.4%,
                    rgba(22,28,38,1) 89.6%, rgba(44,54,70,1) 92.8%,
                    rgba(22,28,38,1) 96%, rgba(24,30,40,1) 100%
                  )`,
                  boxShadow: "inset 0 4px 16px rgba(0,0,0,0.88)",
                }}
              />
              {/* Tick marks */}
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex justify-center"
                  style={{ transform: `rotate(${(i * 360) / 30}deg)` }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "2%",
                      width: i % 5 === 0 ? "2px" : "1px",
                      height: i % 5 === 0 ? "10%" : "6%",
                      background: i % 5 === 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
                      borderRadius: "1px",
                    }}
                  />
                </div>
              ))}
            </motion.div>

            {/* Inner barrel step */}
            <div
              className="absolute inset-[12%] rounded-full"
              style={{
                background: `radial-gradient(circle at 44% 36%,
                  rgba(28,34,46,1) 0%,
                  rgba(14,16,24,1) 55%,
                  rgba(5,5,10,1) 100%
                )`,
                boxShadow: "inset 0 6px 20px rgba(0,0,0,0.95), inset 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            />

            {/* Separator lines between glass elements — small tick marks on barrel */}
            {[16, 20, 25, 29].map((inset, i) => (
              <div
                key={i}
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: `${inset}%`,
                  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.045)",
                }}
              />
            ))}

            {/* Glass element 1 — dark blue ring */}
            <div
              className="absolute inset-[16%] rounded-full overflow-hidden"
              style={{
                background: `radial-gradient(circle at 46% 40%,
                  rgba(18,24,52,1) 0%,
                  rgba(10,12,32,1) 50%,
                  rgba(4,4,14,1) 80%,
                  rgba(2,2,7,1) 100%
                )`,
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(130deg, rgba(70,90,180,0.10) 0%, transparent 45%)" }} />
            </div>

            {/* Glass element 2 */}
            <div
              className="absolute inset-[20%] rounded-full overflow-hidden"
              style={{
                background: `radial-gradient(circle at 47% 42%,
                  rgba(24,28,68,1) 0%,
                  rgba(14,16,45,1) 42%,
                  rgba(6,6,22,1) 68%,
                  rgba(2,2,9,1) 100%
                )`,
              }}
            >
              <div className="absolute inset-0" style={{ background: "linear-gradient(140deg, rgba(90,100,210,0.09) 0%, transparent 50%)" }} />
            </div>

            {/* Glass element 3 */}
            <div
              className="absolute inset-[25%] rounded-full overflow-hidden"
              style={{
                background: `radial-gradient(circle at 48% 43%,
                  rgba(34,34,95,1) 0%,
                  rgba(20,18,68,1) 38%,
                  rgba(9,8,32,1) 62%,
                  rgba(3,2,12,1) 100%
                )`,
                boxShadow: "inset 0 0 35px rgba(0,0,0,0.85)",
              }}
            />

            {/* === IRIS === */}
            <div className="absolute inset-[29%] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-black" />

              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{ transform: `rotate(${(i * 360) / 9}deg)` }}
                >
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom"
                    animate={{ height: irisOpen ? "38%" : "54%", width: irisOpen ? "47%" : "60%", opacity: 1 }}
                    initial={{ height: "54%", width: "60%", opacity: 0 }}
                    transition={{
                      height: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + i * 0.04 },
                      width:  { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + i * 0.04 },
                      opacity: { duration: 0.2, delay: 0.1 },
                    }}
                    style={{
                      clipPath: "polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)",
                      background: "linear-gradient(to bottom, rgba(16,18,26,1), rgba(5,5,9,1))",
                    }}
                  />
                </div>
              ))}

              {/* === INNER LENS — deep blue/violet glow === */}
              <div className="absolute inset-[17%] rounded-full overflow-hidden">
                {/* Deep glow */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 48% 46%,
                      rgba(100,70,255,0.98) 0%,
                      rgba(65,35,210,0.95) 16%,
                      rgba(38,16,155,0.92) 32%,
                      rgba(18,8,80,0.94) 50%,
                      rgba(6,2,28,1) 70%,
                      rgba(0,0,0,1) 100%
                    )`,
                  }}
                />

                {/* Vertical cross flare */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: "none" }}>
                  <div
                    style={{
                      width: "9%",
                      height: "62%",
                      background: "linear-gradient(to bottom, transparent 0%, rgba(170,155,255,0.75) 38%, rgba(255,255,255,0.96) 50%, rgba(170,155,255,0.75) 62%, transparent 100%)",
                      filter: "blur(1.2px)",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                {/* Horizontal cross flare */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: "none" }}>
                  <div
                    style={{
                      width: "62%",
                      height: "9%",
                      background: "linear-gradient(to right, transparent 0%, rgba(155,145,255,0.65) 38%, rgba(255,255,255,0.88) 50%, rgba(155,145,255,0.65) 62%, transparent 100%)",
                      filter: "blur(1.2px)",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                {/* Center bright point */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ pointerEvents: "none" }}>
                  <div
                    style={{
                      width: "14%",
                      height: "14%",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(210,200,255,0.92) 35%, transparent 75%)",
                      filter: "blur(0.5px)",
                    }}
                  />
                </div>

                {/* Diffraction rings */}
                <div
                  className="absolute inset-[5%] rounded-full"
                  style={{
                    boxShadow: `
                      0 0 0 1px rgba(140,115,255,0.22),
                      0 0 0 4px rgba(110,85,220,0.13),
                      0 0 0 9px rgba(85,60,185,0.08),
                      0 0 0 15px rgba(65,40,150,0.05)
                    `,
                  }}
                />
              </div>
            </div>

            {/* Blue ambient glow around whole lens */}
            <motion.div
              className="absolute pointer-events-none"
              style={{ inset: "-18%", opacity: flareOp }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "22%",
                  background: "radial-gradient(circle, rgba(55,35,200,0.20), transparent 65%)",
                  filter: "blur(22px)",
                }}
              />
            </motion.div>

            {/* Lens flare streak */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
              style={{ opacity: flareOp }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "8%",
                  left: "10%",
                  width: "42%",
                  height: "13%",
                  background: "linear-gradient(to right, transparent, rgba(150,170,255,0.08) 40%, rgba(255,255,255,0.055), transparent)",
                  borderRadius: "50%",
                  transform: "rotate(-28deg)",
                  filter: "blur(4px)",
                }}
              />
            </motion.div>

            {/* === Text markings === */}
            <div className="absolute inset-[4%] rounded-full pointer-events-none">
              <span
                className="absolute top-[2.5%] left-1/2 -translate-x-1/2 text-white/45 tracking-[0.38em] uppercase font-light select-none"
                style={{ fontSize: "clamp(6px, 1.1vw, 10px)", transform: "translateX(-38%)" }}
              >
                24-70MM
              </span>
              {/* Red dot */}
              <div
                style={{
                  position: "absolute",
                  top: "3.2%",
                  left: "56%",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "rgb(220,38,38)",
                  boxShadow: "0 0 8px rgba(220,38,38,0.85), 0 0 3px rgba(255,70,70,0.95)",
                }}
              />
              <span
                className="absolute bottom-[2.5%] left-1/2 -translate-x-1/2 text-white/40 tracking-[0.28em] font-light select-none"
                style={{ fontSize: "clamp(5px, 0.95vw, 9px)" }}
              >
                f/2.8 L USM
              </span>
              <span
                className="absolute top-1/2 right-[2.5%] -translate-y-1/2 text-white/22 tracking-[0.15em] font-light select-none"
                style={{ fontSize: "clamp(4px, 0.8vw, 7px)", writingMode: "vertical-rl" }}
              >
                ZOOM LENS
              </span>
            </div>
          </div>

          {/* ===== FLOOR ===== */}
          <div
            style={{
              width: "180%",
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(160,190,255,0.06) 25%, rgba(180,210,255,0.16) 50%, rgba(160,190,255,0.06) 75%, transparent)",
              marginTop: "-1px",
              zIndex: 2,
            }}
          />

          {/* Lens reflection */}
          <motion.div
            style={{
              y: reflectY,
              width: `min(72vw, 490px)`,
              height: "180px",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, transparent 90%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, transparent 90%)",
              transform: "scaleY(-1)",
              marginTop: "-8px",
            } as any}
            className="relative overflow-hidden z-0"
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: `min(68vw, ${LENS}px)`,
                aspectRatio: "1",
                background: `radial-gradient(circle at 50% 50%,
                  rgba(55,38,210,0.38) 0%,
                  rgba(28,16,110,0.24) 28%,
                  rgba(8,4,42,0.16) 52%,
                  rgba(0,0,0,0.85) 72%
                )`,
                filter: "blur(2px)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, transparent 15%, rgba(130,160,255,0.07) 50%, transparent 85%)",
                filter: "blur(8px)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* WIDE BLUE AMBIENT */}
        <motion.div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{ opacity: flareOp }}
        >
          <div
            style={{
              width: "55%",
              height: "55%",
              background: "radial-gradient(circle, rgba(35,20,150,0.12), transparent 72%)",
              filter: "blur(60px)",
            }}
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none"
        >
          <h1
            className="font-light tracking-[0.22em] text-white mb-6"
            style={{ fontSize: "clamp(2rem, 6.5vw, 5.2rem)" }}
          >
            SHOOT BY ROM
          </h1>
          <p
            className="tracking-[0.42em] text-white/50 mb-8 uppercase"
            style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.95rem)" }}
          >
            FPV • Drone • Photography
          </p>
          <p
            className="text-white/38 max-w-md px-6 leading-relaxed"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1rem)" }}
          >
            Capturing stories from the ground and the sky.
          </p>
        </motion.div>

        {/* SCROLL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        >
          <span className="text-xs tracking-[0.3em] text-white/38 uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-white/38 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}