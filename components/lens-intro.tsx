"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"

export function LensIntro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [irisOpen, setIrisOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const scale       = useTransform(scrollYProgress, [0, 1],       [1, 3.5])
  const opacity     = useTransform(scrollYProgress, [0, 0.6, 1],  [1, 1, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.4],[0, 1, 1])
  const textY       = useTransform(scrollYProgress, [0, 0.3],     [50, 0])
  const flareOp     = useTransform(scrollYProgress, [0, 0.3, 0.7],[0.4, 0.8, 0.3])
  const focusRot    = useTransform(scrollYProgress, [0, 1],       [0, 60])
  const smoothRot   = useSpring(focusRot, { stiffness: 40, damping: 20 })
  const reflectY    = useTransform(scrollYProgress, [0, 0.5],     [0, 10])

  useEffect(() => {
    const t = setTimeout(() => setIrisOpen(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-background"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* BACKGROUND */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 60%, oklch(0.08 0.04 260), oklch(0.02 0 0) 70%)"
        }} />
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, oklch(0.02 0 0) 0%, transparent 30%, transparent 70%, oklch(0.02 0 0) 100%)"
        }} />

        {/* LENS SCENE */}
        <motion.div
          className="relative flex flex-col items-center"
          style={{ scale, opacity, transformOrigin: 'center 60%' } as any}
        >
          {/* LENS */}
          <div className="relative w-[min(72vw,480px)] aspect-square">

            {/* Outer barrel */}
            <div className="absolute inset-0 rounded-full" style={{
              background: `radial-gradient(circle at 38% 28%,
                oklch(0.20 0.01 240),
                oklch(0.10 0.005 240) 50%,
                oklch(0.06 0 0) 100%
              )`,
              boxShadow: `
                0 30px 80px rgba(0,0,0,0.95),
                0 8px 20px rgba(0,0,0,0.7),
                inset 0 2px 4px rgba(255,255,255,0.08),
                inset 0 -2px 6px rgba(0,0,0,0.6)
              `
            }} />

            {/* Outer chrome bevel */}
            <div className="absolute inset-[1%] rounded-full" style={{
              boxShadow: `
                inset 0 0 0 1px rgba(255,255,255,0.06),
                inset 0 2px 0 rgba(255,255,255,0.14),
                inset 0 -1px 0 rgba(0,0,0,0.8)
              `
            }} />

            {/* Focus ring */}
            <motion.div
              className="absolute inset-[4%] rounded-full overflow-hidden"
              style={{
                rotate: smoothRot,
                background: `conic-gradient(from 0deg,
                  oklch(0.08 0.005 240),
                  oklch(0.13 0.008 240) 4%,
                  oklch(0.07 0.005 240) 8%,
                  oklch(0.12 0.008 240) 12%,
                  oklch(0.07 0.005 240) 16%,
                  oklch(0.12 0.008 240) 20%,
                  oklch(0.07 0.005 240) 24%,
                  oklch(0.12 0.008 240) 28%,
                  oklch(0.07 0.005 240) 32%,
                  oklch(0.12 0.008 240) 36%,
                  oklch(0.07 0.005 240) 40%,
                  oklch(0.12 0.008 240) 44%,
                  oklch(0.07 0.005 240) 48%,
                  oklch(0.12 0.008 240) 52%,
                  oklch(0.07 0.005 240) 56%,
                  oklch(0.12 0.008 240) 60%,
                  oklch(0.07 0.005 240) 64%,
                  oklch(0.12 0.008 240) 68%,
                  oklch(0.07 0.005 240) 72%,
                  oklch(0.12 0.008 240) 76%,
                  oklch(0.07 0.005 240) 80%,
                  oklch(0.12 0.008 240) 84%,
                  oklch(0.07 0.005 240) 88%,
                  oklch(0.12 0.008 240) 92%,
                  oklch(0.07 0.005 240) 96%,
                  oklch(0.08 0.005 240) 100%
                )`,
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.7)"
              }}
            >
              {[...Array(32)].map((_, i) => (
                <div key={i} className="absolute inset-0 flex justify-center"
                  style={{ transform: `rotate(${(i * 360) / 32}deg)` }}
                >
                  <div style={{
                    position: 'absolute', top: '1.5%',
                    width: '1px', height: '6%',
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '1px'
                  }} />
                </div>
              ))}
            </motion.div>

            {/* Inner barrel */}
            <div className="absolute inset-[12%] rounded-full" style={{
              background: "radial-gradient(circle at 40% 35%, oklch(0.16 0.01 240), oklch(0.08 0.005 240) 60%, oklch(0.05 0 0))",
              boxShadow: "inset 0 4px 10px rgba(0,0,0,0.8)"
            }} />

            {/* Glass 1 — blue AR */}
            <div className="absolute inset-[18%] rounded-full overflow-hidden">
              <div className="absolute inset-0" style={{
                background: "radial-gradient(circle at 42% 38%, oklch(0.18 0.12 255), oklch(0.08 0.06 250) 55%, oklch(0.04 0.02 260))"
              }} />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(125deg, oklch(0.40 0.20 270 / 0.20) 0%, transparent 45%, oklch(0.30 0.15 240 / 0.10) 100%)"
              }} />
            </div>

            {/* Glass 2 */}
            <div className="absolute inset-[23%] rounded-full overflow-hidden">
              <div className="absolute inset-0" style={{
                background: "radial-gradient(circle at 45% 42%, oklch(0.22 0.18 270), oklch(0.10 0.10 265) 50%, oklch(0.05 0.04 275))"
              }} />
              <div className="absolute inset-0" style={{
                background: "linear-gradient(140deg, oklch(0.50 0.22 280 / 0.15), transparent 50%)"
              }} />
            </div>

            {/* Glass 3 */}
            <div className="absolute inset-[27%] rounded-full overflow-hidden" style={{
              boxShadow: "inset 0 0 40px rgba(0,0,0,0.7)"
            }}>
              <div className="absolute inset-0" style={{
                background: "radial-gradient(circle at 48% 44%, oklch(0.28 0.22 275), oklch(0.12 0.14 268) 45%, oklch(0.04 0.03 280))"
              }} />
            </div>

            {/* IRIS */}
            <div className="absolute inset-[31%] rounded-full overflow-hidden">
              <div className="absolute inset-0" style={{ background: "oklch(0.02 0 0)" }} />

              {[...Array(9)].map((_, i) => (
                <div key={i} className="absolute inset-0"
                  style={{ transform: `rotate(${(i * 360) / 9}deg)` }}
                >
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom"
                    animate={{
                      height: irisOpen ? "40%" : "54%",
                      width:  irisOpen ? "50%" : "62%",
                      opacity: 1
                    }}
                    initial={{ height: "54%", width: "62%", opacity: 0 }}
                    transition={{
                      height:  { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + i * 0.04 },
                      width:   { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + i * 0.04 },
                      opacity: { duration: 0.2, delay: 0.1 }
                    }}
                    style={{
                      clipPath: 'polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)',
                      background: 'linear-gradient(to bottom, oklch(0.10 0.005 240), oklch(0.05 0 0))',
                    }}
                  />
                </div>
              ))}

              {/* Blue glow center */}
              <div className="absolute inset-[20%] rounded-full overflow-hidden">
                <div className="absolute inset-0" style={{
                  background: "radial-gradient(circle at 48% 45%, oklch(0.45 0.25 275), oklch(0.20 0.18 270) 35%, oklch(0.08 0.08 265) 65%, oklch(0.02 0 0))"
                }} />
                {/* Vertical beam */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div style={{
                    width: '15%', height: '60%',
                    background: 'linear-gradient(to bottom, transparent, oklch(0.7 0.30 275 / 0.8) 40%, oklch(0.9 0.28 272 / 0.9) 50%, oklch(0.7 0.30 275 / 0.8) 60%, transparent)',
                    filter: 'blur(2px)',
                    borderRadius: '50%'
                  }} />
                </div>
                {/* Horizontal beam */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div style={{
                    width: '60%', height: '12%',
                    background: 'linear-gradient(to right, transparent, oklch(0.6 0.28 275 / 0.6) 40%, oklch(0.8 0.26 272 / 0.7) 50%, oklch(0.6 0.28 275 / 0.6) 60%, transparent)',
                    filter: 'blur(2px)',
                    borderRadius: '50%'
                  }} />
                </div>
                {/* Bokeh rings */}
                <div className="absolute inset-[10%] rounded-full" style={{
                  boxShadow: `
                    0 0 0 1px oklch(0.5 0.20 275 / 0.15),
                    0 0 0 4px oklch(0.4 0.18 270 / 0.10),
                    0 0 0 8px oklch(0.3 0.15 268 / 0.07),
                    0 0 0 14px oklch(0.2 0.12 265 / 0.05)
                  `
                }} />
                {/* Core dot */}
                <div className="absolute inset-[38%] rounded-full" style={{
                  background: "radial-gradient(circle, oklch(0.95 0.15 272), oklch(0.70 0.25 275) 50%, transparent)",
                  filter: 'blur(1px)'
                }} />
              </div>
            </div>

            {/* Blue ambient glow */}
            <motion.div className="absolute inset-[20%] rounded-full pointer-events-none" style={{ opacity: flareOp }}>
              <div style={{
                position: 'absolute', inset: '-20%',
                background: 'radial-gradient(circle, oklch(0.35 0.20 275 / 0.25), transparent 65%)',
                filter: 'blur(12px)'
              }} />
            </motion.div>

            {/* Flare streak */}
            <motion.div className="absolute inset-[20%] rounded-full pointer-events-none" style={{ opacity: flareOp }}>
              <div style={{
                position: 'absolute', top: '5%', left: '8%',
                width: '48%', height: '16%',
                background: 'linear-gradient(to right, transparent, rgba(180,200,255,0.12) 40%, rgba(255,255,255,0.08), transparent)',
                borderRadius: '50%', transform: 'rotate(-30deg)', filter: 'blur(3px)'
              }} />
              <div style={{
                position: 'absolute', top: '8%', left: '16%',
                width: '7%', height: '4%',
                background: 'radial-gradient(ellipse, rgba(255,255,255,0.6), rgba(180,210,255,0.3), transparent)',
                borderRadius: '50%', filter: 'blur(1px)'
              }} />
            </motion.div>

            {/* Text markings */}
            <div className="absolute inset-[5%] rounded-full pointer-events-none">
              <span className="absolute top-[3%] left-1/2 -translate-x-1/2 text-[8px] text-white/20 tracking-[0.35em] uppercase font-light select-none">24-70MM</span>
              <span className="absolute bottom-[3%] left-1/2 -translate-x-1/2 text-[7px] text-white/20 tracking-[0.25em] font-light select-none">f/2.8 L USM</span>
              <span className="absolute top-1/2 right-[2%] -translate-y-1/2 text-[6px] text-white/15 tracking-[0.12em] font-light select-none" style={{ writingMode: 'vertical-rl' }}>ZOOM LENS</span>
            </div>

            {/* Red dot */}
            <div className="absolute inset-[8%] rounded-full pointer-events-none">
              <div className="absolute top-[2.5%] left-1/2 -translate-x-1/2 w-[5px] h-[2px] rounded-full" style={{
                background: 'oklch(0.55 0.25 25)',
                boxShadow: '0 0 6px oklch(0.55 0.25 25)'
              }} />
            </div>

            {/* Top highlight */}
            <div className="absolute inset-0 rounded-full pointer-events-none">
              <div style={{
                position: 'absolute', top: '1%', left: '20%', right: '20%', height: '6%',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)',
                borderRadius: '50%', filter: 'blur(3px)'
              }} />
            </div>
          </div>

          {/* SURFACE LINE */}
          <div style={{
            width: '140%', height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 70%, transparent)',
            marginTop: '-1px'
          }} />

          {/* REFLECTION */}
          <motion.div
            style={{
              y: reflectY,
              width: "min(72vw, 480px)",
              aspectRatio: "1 / 0.35",
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 100%)",
              transform: "scaleY(-1)"
            } as any}
            className="relative overflow-hidden"
          >
            <div className="absolute inset-0 flex justify-center">
              <div style={{
                width: "min(72vw, 480px)", aspectRatio: "1/1", borderRadius: "50%",
                background: `radial-gradient(circle at 38% 72%, oklch(0.18 0.01 240), oklch(0.08 0.005 240) 50%, oklch(0.04 0 0) 100%)`,
                boxShadow: "0 -20px 60px rgba(0,0,0,0.8)"
              }} />
            </div>
            <div className="absolute inset-0 flex justify-center items-start">
              <div style={{
                marginTop: '8%', width: '28%', aspectRatio: '1/1', borderRadius: '50%',
                background: 'radial-gradient(circle, oklch(0.30 0.20 275 / 0.5), transparent 70%)',
                filter: 'blur(8px)'
              }} />
            </div>
          </motion.div>

          {/* Floor glow */}
          <div style={{
            position: 'absolute', bottom: '32%', left: '50%', transform: 'translateX(-50%)',
            width: '60%', height: '30px',
            background: 'radial-gradient(ellipse, oklch(0.25 0.18 275 / 0.30), transparent 70%)',
            filter: 'blur(8px)'
          }} />
        </motion.div>

        {/* Wide blue ambient */}
        <motion.div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ opacity: flareOp }}>
          <div style={{
            width: '50%', height: '50%',
            background: 'radial-gradient(circle, oklch(0.20 0.12 275 / 0.18), transparent 70%)',
            filter: 'blur(40px)'
          }} />
        </motion.div>

        {/* TEXT */}
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

        {/* SCROLL */}
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