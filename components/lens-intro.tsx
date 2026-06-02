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

        {/* BACKGROUND */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 55% 42% at 50% 42%,
                rgba(18,25,42,0.70),
                rgba(3,4,8,0.96) 55%,
                rgba(0,0,0,1) 100%
              )
            `,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom,
                rgba(0,0,0,0.98) 0%,
                transparent 24%,
                transparent 62%,
                rgba(0,0,0,1) 100%
              )
            `,
          }}
        />

        {/* ATMOSPHERE PARTICLES */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(120,160,255,0.22) 0 1px, transparent 1px),
              radial-gradient(circle at 70% 25%, rgba(120,160,255,0.18) 0 1px, transparent 1px),
              radial-gradient(circle at 82% 58%, rgba(120,160,255,0.14) 0 1px, transparent 1px),
              radial-gradient(circle at 32% 68%, rgba(120,160,255,0.12) 0 1px, transparent 1px)
            `,
            backgroundSize: "360px 360px",
          }}
        />

        {/* LENS SCENE */}
        <motion.div
          className="relative flex flex-col items-center"
          style={{ scale, opacity, transformOrigin: "center 60%" } as any}
        >
          {/* CAMERA BODY SILHOUETTE */}
          <div
            className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[min(92vw,760px)] h-[min(42vw,300px)] rounded-[42%] pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at 50% 34%,
                  rgba(24,30,45,0.18),
                  rgba(6,8,12,0.82) 44%,
                  rgba(0,0,0,0.99) 78%
                )
              `,
              boxShadow: `
                0 0 95px rgba(60,90,140,0.16),
                inset 0 0 90px rgba(0,0,0,0.98)
              `,
              opacity: 0.94,
            }}
          />

          {/* TOP BLUE BACKLIGHT */}
          <div
            className="absolute top-[1%] left-1/2 -translate-x-1/2 w-[min(58vw,540px)] h-[180px] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse, rgba(80,110,170,0.25), rgba(20,30,55,0.10) 36%, transparent 74%)",
              filter: "blur(30px)",
            }}
          />

          {/* DARK REFLECTIVE FLOOR */}
          <div
            className="absolute top-[64%] left-1/2 -translate-x-1/2 w-[150vw] h-[45vh] pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse at 50% 0%,
                  rgba(90,125,175,0.20),
                  rgba(12,14,20,0.45) 24%,
                  rgba(0,0,0,0.98) 72%
                )
              `,
              borderTop: "1px solid rgba(180,210,255,0.07)",
              boxShadow: "inset 0 24px 90px rgba(0,0,0,0.98)",
            }}
          />

          {/* LENS */}
          <div className="relative w-[min(72vw,480px)] aspect-square z-10">

            {/* Outer barrel */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 38% 28%,
                  oklch(0.18 0.01 240),
                  oklch(0.08 0.005 240) 50%,
                  oklch(0.025 0 0) 100%
                )`,
                boxShadow: `
                  0 30px 90px rgba(0,0,0,0.98),
                  0 8px 24px rgba(0,0,0,0.85),
                  inset 0 2px 4px rgba(255,255,255,0.06),
                  inset 0 -2px 6px rgba(0,0,0,0.85)
                `,
              }}
            />

            {/* Outer chrome bevel */}
            <div
              className="absolute inset-[1%] rounded-full"
              style={{
                boxShadow: `
                  inset 0 0 0 1px rgba(255,255,255,0.055),
                  inset 0 2px 0 rgba(255,255,255,0.12),
                  inset 0 -1px 0 rgba(0,0,0,0.9)
                `,
              }}
            />

            {/* Focus ring */}
            <motion.div
              className="absolute inset-[4%] rounded-full overflow-hidden"
              style={{
                rotate: smoothRot,
                background: `conic-gradient(from 0deg,
                  oklch(0.045 0.005 240),
                  oklch(0.10 0.008 240) 4%,
                  oklch(0.04 0.005 240) 8%,
                  oklch(0.09 0.008 240) 12%,
                  oklch(0.04 0.005 240) 16%,
                  oklch(0.09 0.008 240) 20%,
                  oklch(0.04 0.005 240) 24%,
                  oklch(0.09 0.008 240) 28%,
                  oklch(0.04 0.005 240) 32%,
                  oklch(0.09 0.008 240) 36%,
                  oklch(0.04 0.005 240) 40%,
                  oklch(0.09 0.008 240) 44%,
                  oklch(0.04 0.005 240) 48%,
                  oklch(0.09 0.008 240) 52%,
                  oklch(0.04 0.005 240) 56%,
                  oklch(0.09 0.008 240) 60%,
                  oklch(0.04 0.005 240) 64%,
                  oklch(0.09 0.008 240) 68%,
                  oklch(0.04 0.005 240) 72%,
                  oklch(0.09 0.008 240) 76%,
                  oklch(0.04 0.005 240) 80%,
                  oklch(0.09 0.008 240) 84%,
                  oklch(0.04 0.005 240) 88%,
                  oklch(0.09 0.008 240) 92%,
                  oklch(0.04 0.005 240) 96%,
                  oklch(0.045 0.005 240) 100%
                )`,
                boxShadow: "inset 0 2px 10px rgba(0,0,0,0.85)",
              }}
            >
              {[...Array(32)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex justify-center"
                  style={{ transform: `rotate(${(i * 360) / 32}deg)` }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "1.5%",
                      width: "1px",
                      height: "6%",
                      background: "rgba(255,255,255,0.055)",
                      borderRadius: "1px",
                    }}
                  />
                </div>
              ))}
            </motion.div>

            {/* Inner barrel */}
            <div
              className="absolute inset-[12%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 40% 35%, oklch(0.12 0.01 240), oklch(0.055 0.005 240) 60%, oklch(0.025 0 0))",
                boxShadow: "inset 0 4px 14px rgba(0,0,0,0.92)",
              }}
            />

            {/* Glass 1 */}
            <div className="absolute inset-[18%] rounded-full overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 42% 38%, oklch(0.14 0.12 255), oklch(0.055 0.06 250) 55%, oklch(0.025 0.02 260))",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(125deg, oklch(0.40 0.20 270 / 0.16) 0%, transparent 45%, oklch(0.30 0.15 240 / 0.08) 100%)",
                }}
              />
            </div>

            {/* Glass 2 */}
            <div className="absolute inset-[23%] rounded-full overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 45% 42%, oklch(0.16 0.18 270), oklch(0.075 0.10 265) 50%, oklch(0.025 0.04 275))",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(140deg, oklch(0.50 0.22 280 / 0.12), transparent 50%)",
                }}
              />
            </div>

            {/* Glass 3 */}
            <div
              className="absolute inset-[27%] rounded-full overflow-hidden"
              style={{ boxShadow: "inset 0 0 45px rgba(0,0,0,0.85)" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 48% 44%, oklch(0.22 0.22 275), oklch(0.09 0.14 268) 45%, oklch(0.02 0.03 280))",
                }}
              />
            </div>

            {/* IRIS */}
            <div className="absolute inset-[31%] rounded-full overflow-hidden">
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
                      height: irisOpen ? "40%" : "54%",
                      width: irisOpen ? "50%" : "62%",
                      opacity: 1,
                    }}
                    initial={{ height: "54%", width: "62%", opacity: 0 }}
                    transition={{
                      height: {
                        duration: 1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 0.1 + i * 0.04,
                      },
                      width: {
                        duration: 1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 0.1 + i * 0.04,
                      },
                      opacity: { duration: 0.2, delay: 0.1 },
                    }}
                    style={{
                      clipPath: "polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)",
                      background:
                        "linear-gradient(to bottom, oklch(0.075 0.005 240), oklch(0.025 0 0))",
                    }}
                  />
                </div>
              ))}

              {/* Blue glow center */}
              <div className="absolute inset-[20%] rounded-full overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 48% 45%, oklch(0.42 0.25 275), oklch(0.17 0.18 270) 35%, oklch(0.055 0.08 265) 65%, oklch(0.015 0 0))",
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    style={{
                      width: "15%",
                      height: "60%",
                      background:
                        "linear-gradient(to bottom, transparent, oklch(0.7 0.30 275 / 0.75) 40%, oklch(0.9 0.28 272 / 0.85) 50%, oklch(0.7 0.30 275 / 0.75) 60%, transparent)",
                      filter: "blur(2px)",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    style={{
                      width: "60%",
                      height: "12%",
                      background:
                        "linear-gradient(to right, transparent, oklch(0.6 0.28 275 / 0.55) 40%, oklch(0.8 0.26 272 / 0.65) 50%, oklch(0.6 0.28 275 / 0.55) 60%, transparent)",
                      filter: "blur(2px)",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                <div
                  className="absolute inset-[10%] rounded-full"
                  style={{
                    boxShadow: `
                      0 0 0 1px oklch(0.5 0.20 275 / 0.14),
                      0 0 0 4px oklch(0.4 0.18 270 / 0.09),
                      0 0 0 8px oklch(0.3 0.15 268 / 0.06),
                      0 0 0 14px oklch(0.2 0.12 265 / 0.04)
                    `,
                  }}
                />

                <div
                  className="absolute inset-[38%] rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.95 0.15 272), oklch(0.70 0.25 275) 50%, transparent)",
                    filter: "blur(1px)",
                  }}
                />
              </div>
            </div>

            {/* Blue ambient glow */}
            <motion.div
              className="absolute inset-[20%] rounded-full pointer-events-none"
              style={{ opacity: flareOp }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "-20%",
                  background:
                    "radial-gradient(circle, oklch(0.35 0.20 275 / 0.20), transparent 65%)",
                  filter: "blur(14px)",
                }}
              />
            </motion.div>

            {/* Flare streak */}
            <motion.div
              className="absolute inset-[20%] rounded-full pointer-events-none"
              style={{ opacity: flareOp }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "5%",
                  left: "8%",
                  width: "48%",
                  height: "16%",
                  background:
                    "linear-gradient(to right, transparent, rgba(180,200,255,0.10) 40%, rgba(255,255,255,0.07), transparent)",
                  borderRadius: "50%",
                  transform: "rotate(-30deg)",
                  filter: "blur(3px)",
                }}
              />
            </motion.div>

            {/* Text markings */}
            <div className="absolute inset-[5%] rounded-full pointer-events-none">
              <span className="absolute top-[3%] left-1/2 -translate-x-1/2 text-[8px] text-white/18 tracking-[0.35em] uppercase font-light select-none">
                24-70MM
              </span>
              <span className="absolute bottom-[3%] left-1/2 -translate-x-1/2 text-[7px] text-white/18 tracking-[0.25em] font-light select-none">
                f/2.8 L USM
              </span>
              <span
                className="absolute top-1/2 right-[2%] -translate-y-1/2 text-[6px] text-white/12 tracking-[0.12em] font-light select-none"
                style={{ writingMode: "vertical-rl" }}
              >
                ZOOM LENS
              </span>
            </div>

            {/* Red dot */}
            <div className="absolute inset-[8%] rounded-full pointer-events-none">
              <div
                className="absolute top-[2.5%] left-1/2 -translate-x-1/2 w-[5px] h-[2px] rounded-full"
                style={{
                  background: "oklch(0.55 0.25 25)",
                  boxShadow: "0 0 6px oklch(0.55 0.25 25)",
                }}
              />
            </div>

            {/* Top highlight */}
            <div className="absolute inset-0 rounded-full pointer-events-none">
              <div
                style={{
                  position: "absolute",
                  top: "1%",
                  left: "20%",
                  right: "20%",
                  height: "6%",
                  background: "linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)",
                  borderRadius: "50%",
                  filter: "blur(3px)",
                }}
              />
            </div>
          </div>

          {/* SURFACE LINE */}
          <div
            style={{
              width: "150%",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(180,210,255,0.05) 30%, rgba(180,210,255,0.12) 50%, rgba(180,210,255,0.05) 70%, transparent)",
              marginTop: "-1px",
              zIndex: 2,
            }}
          />

          {/* REFLECTION */}
          <motion.div
            style={{
              y: reflectY,
              width: "min(78vw, 520px)",
              height: "230px",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 88%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 88%)",
              transform: "scaleY(-1)",
            } as any}
            className="relative overflow-hidden z-0 -mt-4"
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(72vw,480px)] aspect-square rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 50% 50%,
                    rgba(70,60,255,0.30),
                    rgba(20,25,60,0.18) 28%,
                    rgba(0,0,0,0.9) 70%
                  )
                `,
                boxShadow: "0 0 85px rgba(60,80,255,0.18)",
                filter: "blur(1px)",
              }}
            />

            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(160,200,255,0.10), transparent)",
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
              background:
                "radial-gradient(circle, oklch(0.20 0.12 275 / 0.15), transparent 72%)",
              filter: "blur(48px)",
            }}
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.2em] text-white mb-6">
            SHOOT BY ROM
          </h1>
          <p className="text-sm md:text-base tracking-[0.4em] text-white/60 mb-8 uppercase">
            FPV • Drone • Photography
          </p>
          <p className="text-base md:text-lg text-white/45 max-w-md px-6 leading-relaxed">
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
          <span className="text-xs tracking-[0.3em] text-white/45 uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-white/45 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}