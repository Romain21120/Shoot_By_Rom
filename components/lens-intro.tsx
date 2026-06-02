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
 
  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
 
        {/* DEEP BACKGROUND */}
        <div className="absolute inset-0 bg-black" />
 
        {/* Subtle top backlight like in photo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 30% at 50% -5%,
              rgba(160,190,255,0.18) 0%,
              rgba(80,110,200,0.08) 40%,
              transparent 70%
            )`,
          }}
        />
 
        {/* Floor fog / wet surface glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[45%] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% 100%,
              rgba(30,40,80,0.35) 0%,
              rgba(10,12,25,0.55) 40%,
              transparent 70%
            )`,
          }}
        />
 
        {/* SCENE WRAPPER */}
        <motion.div
          className="relative flex flex-col items-center"
          style={{ scale, opacity, transformOrigin: "center 52%" } as any}
        >
 
          {/* ===== CAMERA BODY ===== */}
          {/* This is the full camera front-face, dark matte black like the photo */}
          <div
            className="absolute"
            style={{
              /* Camera body spans wider than the lens */
              width: "min(92vw, 780px)",
              height: "min(58vw, 490px)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
            }}
          >
            {/* ---- Main body rectangle with rounded corners ---- */}
            <div
              className="absolute"
              style={{
                left: "4%",
                right: "4%",
                top: "24%",
                bottom: "4%",
                borderRadius: "10% 10% 12% 12% / 14% 14% 14% 14%",
                background: `
                  radial-gradient(ellipse 70% 60% at 50% 30%,
                    rgba(38,44,58,1) 0%,
                    rgba(20,24,32,1) 45%,
                    rgba(8,9,12,1) 100%
                  )
                `,
                boxShadow: `
                  0 60px 120px rgba(0,0,0,0.98),
                  0 20px 60px rgba(0,0,0,0.90),
                  inset 0 1px 0 rgba(255,255,255,0.035),
                  inset 0 -1px 0 rgba(0,0,0,0.8)
                `,
              }}
            />
 
            {/* ---- Top backlight rim on body (key light from above) ---- */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "8%",
                right: "8%",
                top: "23%",
                height: "4px",
                background: "linear-gradient(to right, transparent, rgba(180,210,255,0.28) 30%, rgba(200,220,255,0.45) 50%, rgba(180,210,255,0.28) 70%, transparent)",
                borderRadius: "50%",
                filter: "blur(1.5px)",
              }}
            />
 
            {/* ---- Viewfinder hump (top center) ---- */}
            <div
              className="absolute"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: "0%",
                width: "26%",
                height: "36%",
                clipPath: "polygon(12% 100%, 20% 20%, 38% 0%, 62% 0%, 80% 20%, 88% 100%)",
                background: `
                  radial-gradient(ellipse 80% 60% at 50% 10%,
                    rgba(45,55,72,1) 0%,
                    rgba(22,26,36,1) 50%,
                    rgba(8,9,12,1) 100%
                  )
                `,
                boxShadow: "0 -6px 30px rgba(160,195,255,0.14)",
              }}
            />
 
            {/* Viewfinder top rim light */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: "0%",
                width: "24%",
                height: "2px",
                background: "linear-gradient(to right, transparent, rgba(180,210,255,0.5) 30%, rgba(210,225,255,0.65) 50%, rgba(180,210,255,0.5) 70%, transparent)",
                clipPath: "polygon(14% 100%, 22% 0%, 78% 0%, 86% 100%)",
                filter: "blur(1px)",
              }}
            />
 
            {/* ---- Left grip bulk ---- */}
            <div
              className="absolute"
              style={{
                left: "0%",
                top: "26%",
                width: "14%",
                bottom: "4%",
                borderRadius: "55% 25% 30% 45% / 20% 20% 20% 20%",
                background: `
                  radial-gradient(ellipse 80% 70% at 20% 40%,
                    rgba(42,50,66,1) 0%,
                    rgba(18,22,30,1) 50%,
                    rgba(6,7,10,1) 100%
                  )
                `,
                boxShadow: "inset -10px 0 30px rgba(0,0,0,0.7), 0 40px 80px rgba(0,0,0,0.95)",
              }}
            />
 
            {/* ---- Right side flat ---- */}
            <div
              className="absolute"
              style={{
                right: "0%",
                top: "26%",
                width: "9%",
                bottom: "4%",
                borderRadius: "20% 45% 35% 20% / 20% 20% 20% 20%",
                background: `
                  radial-gradient(ellipse 80% 70% at 80% 40%,
                    rgba(36,44,58,1) 0%,
                    rgba(16,20,28,1) 50%,
                    rgba(6,7,10,1) 100%
                  )
                `,
                boxShadow: "inset 6px 0 20px rgba(0,0,0,0.7)",
              }}
            />
 
            {/* ---- Top left dial (large) ---- */}
            <div
              className="absolute"
              style={{
                left: "12%",
                top: "14%",
                width: "9%",
                height: "14%",
                borderRadius: "50%",
                background: "radial-gradient(ellipse at 40% 30%, rgba(55,65,82,1), rgba(18,22,30,1) 70%)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.85), 0 -1px 0 rgba(255,255,255,0.05)",
              }}
            />
 
            {/* ---- Top left dial (small) ---- */}
            <div
              className="absolute"
              style={{
                left: "22%",
                top: "11%",
                width: "7%",
                height: "11%",
                borderRadius: "50%",
                background: "radial-gradient(ellipse at 40% 30%, rgba(52,62,80,1), rgba(18,22,30,1) 70%)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.85)",
              }}
            />
 
            {/* ---- Top right dial ---- */}
            <div
              className="absolute"
              style={{
                right: "14%",
                top: "12%",
                width: "8%",
                height: "12%",
                borderRadius: "50%",
                background: "radial-gradient(ellipse at 40% 30%, rgba(52,62,80,1), rgba(18,22,30,1) 70%)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.85)",
              }}
            />
 
            {/* ---- Hot shoe / top accessory ---- */}
            <div
              className="absolute"
              style={{
                left: "50%",
                transform: "translateX(-50%)",
                top: "1%",
                width: "12%",
                height: "4%",
                background: "rgba(28,34,45,1)",
                borderRadius: "2px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.6)",
              }}
            />
          </div>
 
          {/* ===== LENS ===== */}
          <div
            className="relative z-10"
            style={{ width: "min(68vw, 460px)", aspectRatio: "1 / 1" }}
          >
 
            {/* === Outer barrel ring === */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 38% 28%,
                  rgba(52,60,76,1) 0%,
                  rgba(22,26,34,1) 40%,
                  rgba(8,9,12,1) 100%
                )`,
                boxShadow: `
                  0 40px 100px rgba(0,0,0,0.99),
                  0 10px 30px rgba(0,0,0,0.90),
                  inset 0 2px 0 rgba(255,255,255,0.07),
                  inset 0 -2px 6px rgba(0,0,0,0.9),
                  inset 0 0 0 1px rgba(255,255,255,0.04)
                `,
              }}
            />
 
            {/* Top rim highlight (key light) */}
            <div
              className="absolute pointer-events-none"
              style={{
                top: "1%",
                left: "15%",
                right: "15%",
                height: "7%",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.065), transparent)",
                borderRadius: "50%",
                filter: "blur(2px)",
              }}
            />
 
            {/* === Focus ring (knurled) === */}
            <motion.div
              className="absolute inset-[4%] rounded-full overflow-hidden"
              style={{ rotate: smoothRot }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg,
                    rgba(28,34,44,1),
                    rgba(50,60,76,1) 3.5%,
                    rgba(26,32,42,1) 7%,
                    rgba(48,58,74,1) 10.5%,
                    rgba(26,32,42,1) 14%,
                    rgba(48,58,74,1) 17.5%,
                    rgba(26,32,42,1) 21%,
                    rgba(48,58,74,1) 24.5%,
                    rgba(26,32,42,1) 28%,
                    rgba(48,58,74,1) 31.5%,
                    rgba(26,32,42,1) 35%,
                    rgba(48,58,74,1) 38.5%,
                    rgba(26,32,42,1) 42%,
                    rgba(48,58,74,1) 45.5%,
                    rgba(26,32,42,1) 49%,
                    rgba(48,58,74,1) 52.5%,
                    rgba(26,32,42,1) 56%,
                    rgba(48,58,74,1) 59.5%,
                    rgba(26,32,42,1) 63%,
                    rgba(48,58,74,1) 66.5%,
                    rgba(26,32,42,1) 70%,
                    rgba(48,58,74,1) 73.5%,
                    rgba(26,32,42,1) 77%,
                    rgba(48,58,74,1) 80.5%,
                    rgba(26,32,42,1) 84%,
                    rgba(48,58,74,1) 87.5%,
                    rgba(26,32,42,1) 91%,
                    rgba(48,58,74,1) 94.5%,
                    rgba(26,32,42,1) 98%,
                    rgba(28,34,44,1) 100%
                  )`,
                  boxShadow: "inset 0 4px 14px rgba(0,0,0,0.85)",
                }}
              />
              {/* Tick marks on focus ring */}
              {[...Array(28)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex justify-center"
                  style={{ transform: `rotate(${(i * 360) / 28}deg)` }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "2%",
                      width: i % 4 === 0 ? "2px" : "1px",
                      height: i % 4 === 0 ? "9%" : "5.5%",
                      background: i % 4 === 0 ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.055)",
                      borderRadius: "1px",
                    }}
                  />
                </div>
              ))}
            </motion.div>
 
            {/* === Inner barrel ring === */}
            <div
              className="absolute inset-[12%] rounded-full"
              style={{
                background: `radial-gradient(circle at 42% 36%,
                  rgba(30,36,48,1) 0%,
                  rgba(14,16,22,1) 55%,
                  rgba(5,5,8,1) 100%
                )`,
                boxShadow: `
                  inset 0 6px 18px rgba(0,0,0,0.95),
                  inset 0 0 0 1px rgba(255,255,255,0.035)
                `,
              }}
            />
 
            {/* === Glass element ring 1 === */}
            <div
              className="absolute inset-[16%] rounded-full overflow-hidden"
              style={{
                background: `radial-gradient(circle at 44% 38%,
                  rgba(22,28,55,1) 0%,
                  rgba(12,15,35,1) 45%,
                  rgba(5,5,18,1) 75%,
                  rgba(2,2,8,1) 100%
                )`,
                boxShadow: "inset 0 4px 16px rgba(0,0,0,0.9)",
              }}
            >
              {/* Blue-violet coat shimmer */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(130deg, rgba(80,100,200,0.12) 0%, transparent 40%, rgba(60,40,160,0.06) 100%)",
                }}
              />
            </div>
 
            {/* === Glass element ring 2 === */}
            <div
              className="absolute inset-[21%] rounded-full overflow-hidden"
              style={{
                background: `radial-gradient(circle at 46% 40%,
                  rgba(30,35,80,1) 0%,
                  rgba(16,18,50,1) 40%,
                  rgba(8,8,28,1) 70%,
                  rgba(2,2,10,1) 100%
                )`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(140deg, rgba(100,120,230,0.10) 0%, transparent 50%)",
                }}
              />
            </div>
 
            {/* === Glass element ring 3 (deep indigo) === */}
            <div
              className="absolute inset-[26%] rounded-full overflow-hidden"
              style={{
                background: `radial-gradient(circle at 48% 42%,
                  rgba(45,45,130,1) 0%,
                  rgba(22,20,75,1) 35%,
                  rgba(10,8,35,1) 65%,
                  rgba(3,2,12,1) 100%
                )`,
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.85)",
              }}
            />
 
            {/* === IRIS === */}
            <div className="absolute inset-[30%] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-black" />
 
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0"
                  style={{ transform: `rotate(${(i * 360) / 9}deg)` }}
                >
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom"
                    animate={{
                      height: irisOpen ? "38%" : "54%",
                      width: irisOpen ? "48%" : "60%",
                      opacity: 1,
                    }}
                    initial={{ height: "54%", width: "60%", opacity: 0 }}
                    transition={{
                      height: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + i * 0.04 },
                      width: { duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + i * 0.04 },
                      opacity: { duration: 0.2, delay: 0.1 },
                    }}
                    style={{
                      clipPath: "polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)",
                      background: "linear-gradient(to bottom, rgba(18,20,28,1), rgba(5,5,8,1))",
                    }}
                  />
                </div>
              ))}
 
              {/* === INNER LENS — deep blue glow === */}
              <div className="absolute inset-[18%] rounded-full overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 48% 45%,
                      rgba(80,60,255,0.95) 0%,
                      rgba(50,30,200,0.90) 18%,
                      rgba(28,15,120,0.88) 36%,
                      rgba(14,8,60,0.92) 55%,
                      rgba(4,2,18,1) 75%,
                      rgba(0,0,0,1) 100%
                    )`,
                  }}
                />
 
                {/* Vertical flare */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ pointerEvents: "none" }}
                >
                  <div
                    style={{
                      width: "10%",
                      height: "55%",
                      background: "linear-gradient(to bottom, transparent, rgba(180,170,255,0.80) 40%, rgba(255,255,255,0.95) 50%, rgba(180,170,255,0.80) 60%, transparent)",
                      filter: "blur(1.5px)",
                      borderRadius: "50%",
                    }}
                  />
                </div>
 
                {/* Horizontal flare */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ pointerEvents: "none" }}
                >
                  <div
                    style={{
                      width: "55%",
                      height: "8%",
                      background: "linear-gradient(to right, transparent, rgba(160,150,255,0.60) 40%, rgba(255,255,255,0.80) 50%, rgba(160,150,255,0.60) 60%, transparent)",
                      filter: "blur(1.5px)",
                      borderRadius: "50%",
                    }}
                  />
                </div>
 
                {/* Center bright point */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ pointerEvents: "none" }}
                >
                  <div
                    style={{
                      width: "12%",
                      height: "12%",
                      borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(200,190,255,0.90) 40%, transparent 80%)",
                      filter: "blur(0.5px)",
                    }}
                  />
                </div>
 
                {/* Rings / diffraction */}
                <div
                  className="absolute inset-[5%] rounded-full"
                  style={{
                    boxShadow: `
                      0 0 0 1px rgba(130,110,255,0.18),
                      0 0 0 4px rgba(100,80,220,0.12),
                      0 0 0 8px rgba(80,60,180,0.08),
                      0 0 0 14px rgba(60,40,140,0.05)
                    `,
                  }}
                />
              </div>
            </div>
 
            {/* === Blue ambient glow around lens === */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                inset: "-15%",
                opacity: flareOp,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "20%",
                  background: "radial-gradient(circle, rgba(60,40,200,0.22), transparent 65%)",
                  filter: "blur(20px)",
                }}
              />
            </motion.div>
 
            {/* === Lens flare streak === */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
              style={{ opacity: flareOp }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "7%",
                  left: "10%",
                  width: "45%",
                  height: "14%",
                  background: "linear-gradient(to right, transparent, rgba(160,180,255,0.09) 40%, rgba(255,255,255,0.06), transparent)",
                  borderRadius: "50%",
                  transform: "rotate(-30deg)",
                  filter: "blur(4px)",
                }}
              />
            </motion.div>
 
            {/* === Text markings === */}
            <div className="absolute inset-[4%] rounded-full pointer-events-none">
              <span
                className="absolute top-[2.5%] left-1/2 -translate-x-1/2 text-white/40 tracking-[0.35em] uppercase font-light select-none"
                style={{ fontSize: "clamp(6px, 1.2vw, 10px)" }}
              >
                24-70MM
              </span>
              {/* Red dot */}
              <div
                className="absolute top-[3.5%] left-1/2 ml-8 w-[6px] h-[6px] rounded-full"
                style={{
                  background: "rgb(220,40,40)",
                  boxShadow: "0 0 8px rgba(220,40,40,0.8), 0 0 2px rgba(255,80,80,0.9)",
                  transform: "translateY(-50%)",
                  marginTop: "0.7em",
                }}
              />
              <span
                className="absolute bottom-[2.5%] left-1/2 -translate-x-1/2 text-white/40 tracking-[0.28em] font-light select-none"
                style={{ fontSize: "clamp(5px, 1.1vw, 9px)" }}
              >
                f/2.8 L USM
              </span>
              <span
                className="absolute top-1/2 right-[2.5%] -translate-y-1/2 text-white/25 tracking-[0.15em] font-light select-none"
                style={{ fontSize: "clamp(4px, 0.9vw, 8px)", writingMode: "vertical-rl" }}
              >
                ZOOM LENS
              </span>
            </div>
          </div>
 
          {/* ===== REFLECTIVE FLOOR ===== */}
          {/* Thin separator line */}
          <div
            style={{
              width: "160%",
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(160,190,255,0.06) 25%, rgba(180,210,255,0.14) 50%, rgba(160,190,255,0.06) 75%, transparent)",
              marginTop: "-1px",
              zIndex: 2,
            }}
          />
 
          {/* Wet floor texture */}
          <div
            style={{
              width: "200%",
              height: "30px",
              background: "radial-gradient(ellipse at 50% 0%, rgba(100,130,200,0.14), transparent 70%)",
              filter: "blur(2px)",
            }}
          />
 
          {/* Lens reflection on floor */}
          <motion.div
            style={{
              y: reflectY,
              width: "min(72vw, 490px)",
              height: "200px",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, transparent 85%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, transparent 85%)",
              transform: "scaleY(-1)",
              marginTop: "-10px",
            } as any}
            className="relative overflow-hidden z-0"
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: "min(68vw, 460px)",
                aspectRatio: "1",
                background: `radial-gradient(circle at 50% 50%,
                  rgba(50,35,200,0.35) 0%,
                  rgba(25,15,100,0.22) 30%,
                  rgba(8,5,40,0.15) 55%,
                  rgba(0,0,0,0.8) 75%
                )`,
                filter: "blur(2px)",
              }}
            />
            {/* Floor horizontal wet streaks */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, transparent 10%, rgba(140,170,255,0.07) 50%, transparent 90%)",
                filter: "blur(6px)",
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
              width: "60%",
              height: "60%",
              background: "radial-gradient(circle, rgba(40,25,160,0.14), transparent 72%)",
              filter: "blur(55px)",
            }}
          />
        </motion.div>
 
        {/* TEXT OVERLAY */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none"
        >
          <h1
            className="font-light tracking-[0.22em] text-white mb-6"
            style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)" }}
          >
            SHOOT BY ROM
          </h1>
          <p
            className="tracking-[0.42em] text-white/55 mb-8 uppercase"
            style={{ fontSize: "clamp(0.65rem, 1.3vw, 1rem)" }}
          >
            FPV • Drone • Photography
          </p>
          <p
            className="text-white/40 max-w-md px-6 leading-relaxed"
            style={{ fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)" }}
          >
            Capturing stories from the ground and the sky.
          </p>
        </motion.div>
 
        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        >
          <span className="text-xs tracking-[0.3em] text-white/40 uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}