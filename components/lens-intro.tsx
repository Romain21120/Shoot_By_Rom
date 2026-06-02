"use client"

import { motion, useScroll, useTransform, useSpring, animate } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export function LensIntro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [irisOpen, setIrisOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Scroll-driven transforms
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3.5])
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0])
  const apertureScale = useTransform(scrollYProgress, [0, 0.3, 0.7], [0.2, 0.4, 1])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4], [0, 1, 1])
  const textY = useTransform(scrollYProgress, [0, 0.3], [50, 0])
  const flareOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0.3, 0.6, 0.2])
  const flareRotate = useTransform(scrollYProgress, [0, 1], [0, 45])
  const innerGlowOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1])

  // Focus ring slowly rotates while scrolling (realistic MF feel)
  const focusRingRotate = useTransform(scrollYProgress, [0, 1], [0, 72])
  const smoothFocusRotate = useSpring(focusRingRotate, { stiffness: 40, damping: 20 })

  // Barrel breathing: subtle scale oscillation on load
  const [breatheScale, setBreatheScale] = useState(0.92)

  useEffect(() => {
    setMounted(true)
    // Iris open animation on mount
    const timeout = setTimeout(() => setIrisOpen(true), 300)

    // Subtle barrel breathe (very subtle, like vibration from motor)
    let t = 0
    const interval = setInterval(() => {
      t += 0.05
      setBreatheScale(1 + Math.sin(t) * 0.002)
    }, 30)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [])

  // Iris blade open: from 52% height → 42% when open (blades retract)
  const bladeHeight = irisOpen ? "42%" : "56%"
  const bladeWidth = irisOpen ? "52%" : "62%"

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Background gradient with subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,oklch(0.05_0_0)_100%)]" />

        {/* Camera lens container */}
        <motion.div
          style={{ scale, opacity }}
          className="relative w-[min(90vw,600px)] aspect-square"
        >
          {/* === OUTER BARREL === */}
          {/* Main chrome shell with realistic brushed gradient */}
          <div className="absolute inset-0 rounded-full"
            style={{
              background: `
                conic-gradient(
                  from 0deg,
                  oklch(0.22 0.01 240),
                  oklch(0.35 0.01 240) 8%,
                  oklch(0.18 0.01 240) 18%,
                  oklch(0.28 0.01 240) 25%,
                  oklch(0.15 0.01 240) 38%,
                  oklch(0.32 0.01 240) 45%,
                  oklch(0.18 0.01 240) 55%,
                  oklch(0.28 0.01 240) 65%,
                  oklch(0.14 0.01 240) 75%,
                  oklch(0.30 0.01 240) 85%,
                  oklch(0.18 0.01 240) 92%,
                  oklch(0.22 0.01 240) 100%
                )
              `,
              boxShadow: "0 0 80px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6), inset 0 2px 6px rgba(255,255,255,0.12), inset 0 -2px 4px rgba(0,0,0,0.5)"
            }}
          />

          {/* Outer bevel ring - thin bright edge */}
          <div className="absolute inset-[0.5%] rounded-full"
            style={{
              background: "transparent",
              boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,0.08), inset 0 2px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.6)"
            }}
          />

          {/* === FOCUS / GRIP RING === */}
            <motion.div
              className="absolute inset-[3.5%] rounded-full overflow-hidden"
              style={{
                rotate: smoothFocusRotate,
                scale: breatheScale,
                background: `conic-gradient(
                  from 0deg,
                  oklch(0.10 0.01 240),
                  oklch(0.15 0.01 240) 5%,
                  oklch(0.09 0.01 240) 10%,
                  oklch(0.14 0.01 240) 15%,
                  oklch(0.09 0.01 240) 20%,
                  oklch(0.14 0.01 240) 25%,
                  oklch(0.09 0.01 240) 30%,
                  oklch(0.14 0.01 240) 35%,
                  oklch(0.09 0.01 240) 40%,
                  oklch(0.14 0.01 240) 45%,
                  oklch(0.09 0.01 240) 50%,
                  oklch(0.14 0.01 240) 55%,
                  oklch(0.09 0.01 240) 60%,
                  oklch(0.14 0.01 240) 65%,
                  oklch(0.09 0.01 240) 70%,
                  oklch(0.14 0.01 240) 75%,
                  oklch(0.09 0.01 240) 80%,
                  oklch(0.14 0.01 240) 85%,
                  oklch(0.09 0.01 240) 90%,
                  oklch(0.14 0.01 240) 95%,
                  oklch(0.09 0.01 240) 100%
                )`,
                boxShadow: "inset 0 3px 8px rgba(0,0,0,0.6), inset 0 -2px 4px rgba(0,0,0,0.4)"
              }}
            >
            {/* Rubber grip ridges */}
            {[...Array(48)].map((_, i) => (
              <div
                key={i}
                className="absolute top-[3%] bottom-[3%] w-[1.5px]"
                style={{
                  left: `${50 + 46 * Math.cos((i * 2 * Math.PI) / 48)}%`,
                  transform: `rotate(${(i * 360) / 48}deg)`,
                  transformOrigin: 'center center',
                  background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.06) 70%, transparent)',
                  borderRadius: '1px'
                }}
              />
            ))}

          </motion.div>

          {/* === INNER CHROME RINGS === */}
          <div className="absolute inset-[10%] rounded-full"
            style={{
              background: "radial-gradient(circle at 35% 30%, oklch(0.30 0.01 240), oklch(0.16 0.01 240) 50%, oklch(0.12 0.01 240))",
              boxShadow: "inset 0 3px 8px rgba(0,0,0,0.7), inset 0 -1px 3px rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.04)"
            }}
          />

          <div className="absolute inset-[15%] rounded-full"
            style={{
              background: "radial-gradient(circle at 60% 65%, oklch(0.14 0.01 220), oklch(0.08 0.01 220) 60%, oklch(0.06 0.01 220))",
              boxShadow: "inset 0 -2px 10px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.04)"
            }}
          />

          {/* === GLASS ELEMENTS (multi-coated) === */}
          {/* Outer glass with blue AR coating */}
          <div className="absolute inset-[20%] rounded-full overflow-hidden">
            <div className="absolute inset-0 rounded-full"
              style={{
                background: "radial-gradient(circle at 40% 35%, oklch(0.20 0.10 250), oklch(0.10 0.05 240) 60%, oklch(0.06 0.03 260))"
              }}
            />
            {/* AR coating shimmer */}
            <div className="absolute inset-0 rounded-full"
              style={{
                background: "linear-gradient(135deg, oklch(0.35 0.18 280 / 0.18) 0%, transparent 40%, oklch(0.30 0.14 200 / 0.12) 100%)"
              }}
            />
            {/* Subtle lens flare highlight streak */}
            <div className="absolute"
              style={{
                top: '8%', left: '12%',
                width: '55%', height: '18%',
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)',
                borderRadius: '50%',
                transform: 'rotate(-25deg)',
                filter: 'blur(3px)'
              }}
            />
          </div>

          {/* Green coating glass */}
          <div className="absolute inset-[24%] rounded-full overflow-hidden">
            <div className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 55% 60%, oklch(0.12 0.07 160), oklch(0.07 0.03 180) 60%, oklch(0.05 0.02 140))"
              }}
            />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(220deg, oklch(0.40 0.14 160 / 0.12), transparent 50%)" }}
            />
          </div>

          {/* Deep purple coating glass */}
          <div className="absolute inset-[27%] rounded-full overflow-hidden"
            style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.6)" }}
          >
            <div className="absolute inset-0"
              style={{
                background: "radial-gradient(circle at 45% 40%, oklch(0.12 0.10 280), oklch(0.06 0.05 260) 55%, oklch(0.04 0.02 300))"
              }}
            />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(45deg, oklch(0.50 0.18 300 / 0.08), transparent 60%)" }}
            />
          </div>

          {/* === APERTURE IRIS === */}
          <motion.div
            style={{ scale: apertureScale }}
            className="absolute inset-[30%] rounded-full overflow-hidden"
          >
            {/* Dark background behind blades */}
            <div className="absolute inset-0 rounded-full"
              style={{ background: "oklch(0.02 0 0)" }}
            />

            {/* 9-blade iris with realistic shape & transition */}
            <div className="absolute inset-0">
              {[...Array(9)].map((_, i) => {
                const angle = (i * 360) / 9
                return (
                  <div
                    key={i}
                    className="absolute inset-0"
                    style={{ transform: `rotate(${angle}deg)` }}
                  >
                    <motion.div
                      animate={{
                        height: irisOpen ? "42%" : "56%",
                        width: irisOpen ? "52%" : "64%",
                        opacity: 1
                      }}
                      initial={{ height: "56%", width: "64%", opacity: 0 }}
                      transition={{
                        height: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + i * 0.03 },
                        width: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + i * 0.03 },
                        opacity: { duration: 0.2, delay: 0.1 }
                      }}
                      className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom"
                      style={{
                        clipPath: 'polygon(15% 0%, 85% 0%, 105% 100%, -5% 100%)',
                        background: `
                          linear-gradient(
                            to bottom,
                            oklch(0.12 0.01 240),
                            oklch(0.07 0.005 240) 60%,
                            oklch(0.03 0 0)
                          )
                        `,
                        boxShadow: "inset 1px 0 2px rgba(255,255,255,0.07), inset -1px 0 2px rgba(0,0,0,0.4)"
                      }}
                    />
                  </div>
                )
              })}
            </div>

            {/* Central aperture: deep lens with bokeh rings */}
            <motion.div
              className="absolute inset-[18%] rounded-full overflow-hidden"
              style={{ opacity: innerGlowOpacity }}
            >
              {/* Deep black center */}
              <div className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle at 45% 40%, oklch(0.14 0.06 240), oklch(0.06 0.03 250) 50%, oklch(0.02 0 0))"
                }}
              />
              {/* Bokeh rings (concentric, diffuse) */}
              <div className="absolute inset-[15%] rounded-full"
                style={{
                  boxShadow: `
                    0 0 0 1px rgba(100, 140, 255, 0.08),
                    0 0 0 3px rgba(80, 120, 230, 0.05),
                    0 0 0 6px rgba(60, 100, 200, 0.04),
                    0 0 0 10px rgba(40, 80, 180, 0.03),
                    0 0 0 15px rgba(20, 60, 160, 0.02)
                  `
                }}
              />
              {/* Faint sensor reflection */}
              <div className="absolute inset-[25%] rounded-full"
                style={{
                  background: "radial-gradient(circle at 55% 45%, oklch(0.22 0.08 220 / 0.25), transparent 60%)"
                }}
              />
              {/* Tiny specular highlight */}
              <div className="absolute"
                style={{
                  top: '18%', left: '22%',
                  width: '14%', height: '8%',
                  background: 'radial-gradient(ellipse, rgba(255,255,255,0.35), transparent)',
                  borderRadius: '50%',
                  filter: 'blur(1px)'
                }}
              />
            </motion.div>
          </motion.div>

          {/* === LENS FLARES === */}
          {/* Primary arc flare */}
          <motion.div
            className="absolute inset-[22%] rounded-full pointer-events-none"
            style={{ opacity: flareOpacity, rotate: flareRotate }}
          >
            <div className="absolute"
              style={{
                top: '4%', left: '8%',
                width: '50%', height: '22%',
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15) 40%, rgba(255,255,255,0.08), transparent)',
                borderRadius: '50%',
                transform: 'rotate(-28deg)',
                filter: 'blur(4px)'
              }}
            />
          </motion.div>

          {/* Sharp specular dot */}
          <motion.div
            className="absolute inset-[22%] rounded-full pointer-events-none"
            style={{ opacity: flareOpacity }}
          >
            <div className="absolute"
              style={{
                top: '7%', left: '17%',
                width: '8%', height: '5%',
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.55), rgba(200,220,255,0.2), transparent)',
                borderRadius: '50%',
                filter: 'blur(1.5px)'
              }}
            />
          </motion.div>

          {/* Polygonal bokeh flare (aperture shape) */}
          <motion.div
            className="absolute inset-[30%] pointer-events-none"
            style={{ opacity: flareOpacity, rotate: flareRotate }}
          >
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <polygon
                points="50,5 78,22 93,52 78,80 50,95 22,80 7,52 22,22"
                fill="none"
                stroke="rgba(160,200,255,0.06)"
                strokeWidth="0.8"
              />
              <polygon
                points="50,18 69,30 77,52 69,72 50,82 31,72 23,52 31,30"
                fill="none"
                stroke="rgba(160,200,255,0.04)"
                strokeWidth="0.5"
              />
            </svg>
          </motion.div>

          {/* Chromatic aberration edges */}
          <div className="absolute inset-[20%] rounded-full pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-[oklch(0.5_0.18_280/0.07)]"
              style={{ transform: 'translate(-1.5px, -1px)' }}
            />
            <div className="absolute inset-0 rounded-full border border-[oklch(0.5_0.18_30/0.07)]"
              style={{ transform: 'translate(1.5px, 1px)' }}
            />
            <div className="absolute inset-0 rounded-full border border-[oklch(0.5_0.15_140/0.04)]"
              style={{ transform: 'translate(0px, -1.5px)' }}
            />
          </div>

          {/* Dust motes (physically placed, not random to avoid hydration mismatch) */}
          <div className="absolute inset-[22%] rounded-full pointer-events-none overflow-hidden">
            {[
              { top: '18%', left: '32%', size: 2 },
              { top: '62%', left: '70%', size: 1.5 },
              { top: '44%', left: '22%', size: 1 },
              { top: '78%', left: '45%', size: 2 },
              { top: '28%', left: '75%', size: 1.5 },
              { top: '55%', left: '58%', size: 1 },
            ].map((d, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  top: d.top, left: d.left,
                  width: `${d.size}px`, height: `${d.size}px`,
                  background: 'rgba(255,255,255,0.12)'
                }}
              />
            ))}
          </div>

          {/* Internal reflection rings (ghost images) */}
          <div className="absolute inset-[23%] rounded-full pointer-events-none">
            <div className="absolute inset-[4%] rounded-full"
              style={{ boxShadow: "inset 0 0 0 1px rgba(100,140,255,0.07)" }}
            />
            <div className="absolute inset-[14%] rounded-full"
              style={{ boxShadow: "inset 0 0 0 1px rgba(80,120,220,0.05)" }}
            />
            <div className="absolute inset-[26%] rounded-full"
              style={{ boxShadow: "inset 0 0 0 1px rgba(60,100,200,0.04)" }}
            />
          </div>

          {/* Top highlight on outer barrel */}
          <div className="absolute inset-0 rounded-full pointer-events-none">
            <div className="absolute"
              style={{
                top: '1.5%', left: '18%', right: '18%', height: '7%',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.10), transparent)',
                borderRadius: '50%',
                filter: 'blur(3px)'
              }}
            />
          </div>

          {/* === LENS TEXT MARKINGS === */}
          <div className="absolute inset-[5%] rounded-full pointer-events-none">
            <span className="absolute top-[3.5%] left-1/2 -translate-x-1/2 text-[8px] text-[oklch(0.45_0.01_240)] tracking-[0.35em] uppercase font-light select-none">
              24-70mm
            </span>
            <span className="absolute bottom-[3.5%] left-1/2 -translate-x-1/2 text-[8px] text-[oklch(0.45_0.01_240)] tracking-[0.25em] font-light select-none">
              f/2.8 L USM
            </span>
            <span className="absolute top-1/2 left-[2.5%] -translate-y-1/2 text-[6px] text-[oklch(0.35_0.01_240)] tracking-[0.12em] font-light rotate-[-90deg] select-none">
              MACRO 0.5m
            </span>
          </div>

          {/* Red AF/MF indicator dot */}
          <div className="absolute inset-[8%] rounded-full pointer-events-none">
            <div className="absolute top-[2.5%] left-1/2 -translate-x-1/2 w-[5px] h-[2px] rounded-full"
              style={{
                background: 'oklch(0.55 0.22 25)',
                boxShadow: '0 0 5px oklch(0.55 0.22 25), 0 0 10px oklch(0.45 0.20 25 / 0.4)'
              }}
            />
          </div>

          {/* Gold aperture text ring */}
          <div className="absolute inset-[8%] rounded-full pointer-events-none">
            <span className="absolute bottom-[2.5%] left-1/2 -translate-x-1/2 text-[6px] text-[oklch(0.55_0.08_70)] tracking-[0.18em] font-light select-none">
              ø 77mm
            </span>
          </div>
        </motion.div>

        {/* Ambient rim lights */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ opacity: flareOpacity }}
        >
          <div className="absolute"
            style={{
              top: '18%', left: '8%',
              width: '160px', height: '160px',
              background: 'radial-gradient(circle, oklch(0.4 0.08 240 / 0.12), transparent 70%)',
              filter: 'blur(20px)'
            }}
          />
          <div className="absolute"
            style={{
              bottom: '25%', right: '10%',
              width: '120px', height: '120px',
              background: 'radial-gradient(circle, oklch(0.4 0.06 280 / 0.09), transparent 70%)',
              filter: 'blur(16px)'
            }}
          />
        </motion.div>

        {/* Title text overlay */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.2em] text-foreground mb-6">
            SHOOT BY ROM
          </h1>
          <p className="text-sm md:text-base tracking-[0.4em] text-muted-foreground mb-8 uppercase">
            FPV • Drone • Photography
          </p>
          <p className="text-base md:text-lg text-muted-foreground/70 max-w-md px-6 leading-relaxed">
            Capturing stories from the ground and the sky.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-[0.3em] text-muted-foreground uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
