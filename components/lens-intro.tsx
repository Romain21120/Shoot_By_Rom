"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useEffect, useState } from "react"

// Place your camera image at: /public/camera-bg.png

export function LensIntro() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [irisOpen, setIrisOpen] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const scale       = useTransform(scrollYProgress, [0, 1],          [1, 3.7])
  const opacity     = useTransform(scrollYProgress, [0, 0.72, 1],    [1, 1, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.42],  [0, 1, 1])
  const textY       = useTransform(scrollYProgress, [0, 0.3],        [50, 0])
  const flareOp     = useTransform(scrollYProgress, [0, 0.35, 0.75], [0.35, 0.85, 0.25])
  const focusRot    = useTransform(scrollYProgress, [0, 1],          [0, 60])
  const smoothRot   = useSpring(focusRot, { stiffness: 40, damping: 20 })

  useEffect(() => {
    const t = setTimeout(() => setIrisOpen(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* ── BACKGROUND PHOTO ── */}
        <div className="absolute inset-0">
          <img
            src="/camera-bg.png"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.92 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse 75% 75% at 50% 50%, transparent 35%, rgba(0,0,0,0.50) 100%),
                linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 18%, transparent 72%, rgba(0,0,0,0.55) 100%)
              `,
            }}
          />
        </div>

        {/* ── LENS OVERLAY (zoom + fade on scroll) ── */}
        <motion.div
          style={{
            scale,
            opacity,
            transformOrigin: "51% 50%",
          } as any}
          className="absolute inset-0"
        >
          {/* Objectif complet centré sur la photo */}
          <div
            className="absolute"
            style={{
              left: "51%",
              top: "50%",
              width: "42vw",
              maxWidth: "560px",
              aspectRatio: "1 / 1",
              transform: "translate(-50%, -50%)",
            }}
          >

            {/* ── Bague extérieure (barrel) ── */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 38% 30%,
                  rgba(18,22,30,0.95) 0%,
                  rgba(10,12,18,0.97) 42%,
                  rgba(3,3,6,0.99) 100%
                )`,
                boxShadow: `
                  inset 0 2px 0 rgba(255,255,255,0.07),
                  inset 0 -2px 6px rgba(0,0,0,0.85),
                  inset 0 0 0 1px rgba(255,255,255,0.04)
                `,
              }}
            />

            {/* Reflet haut */}
            <div className="absolute pointer-events-none" style={{
              top: "1%", left: "12%", right: "12%", height: "7%",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)",
              borderRadius: "50%", filter: "blur(2px)",
            }} />

            {/* ── Bague de mise au point (knurled, tourne au scroll) ── */}
            <motion.div
              className="absolute inset-[4%] rounded-full overflow-hidden"
              style={{ rotate: smoothRot }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `conic-gradient(from 0deg,
                    rgba(10,14,20,0.97), rgba(22,28,38,0.97) 3.2%,
                    rgba(10,13,18,0.97) 6.4%, rgba(20,26,36,0.97) 9.6%,
                    rgba(10,13,18,0.97) 12.8%, rgba(20,26,36,0.97) 16%,
                    rgba(10,13,18,0.97) 19.2%, rgba(20,26,36,0.97) 22.4%,
                    rgba(10,13,18,0.97) 25.6%, rgba(20,26,36,0.97) 28.8%,
                    rgba(10,13,18,0.97) 32%, rgba(20,26,36,0.97) 35.2%,
                    rgba(10,13,18,0.97) 38.4%, rgba(20,26,36,0.97) 41.6%,
                    rgba(10,13,18,0.97) 44.8%, rgba(20,26,36,0.97) 48%,
                    rgba(10,13,18,0.97) 51.2%, rgba(20,26,36,0.97) 54.4%,
                    rgba(10,13,18,0.97) 57.6%, rgba(20,26,36,0.97) 60.8%,
                    rgba(10,13,18,0.97) 64%, rgba(20,26,36,0.97) 67.2%,
                    rgba(10,13,18,0.97) 70.4%, rgba(20,26,36,0.97) 73.6%,
                    rgba(10,13,18,0.97) 76.8%, rgba(20,26,36,0.97) 80%,
                    rgba(10,13,18,0.97) 83.2%, rgba(20,26,36,0.97) 86.4%,
                    rgba(10,13,18,0.97) 89.6%, rgba(20,26,36,0.97) 92.8%,
                    rgba(10,13,18,0.97) 96%, rgba(10,14,20,0.97) 100%
                  )`,
                  boxShadow: "inset 0 4px 16px rgba(0,0,0,0.80)",
                }}
              />
              {[...Array(30)].map((_, i) => (
                <div key={i} className="absolute inset-0 flex justify-center"
                  style={{ transform: `rotate(${(i * 360) / 30}deg)` }}>
                  <div style={{
                    position: "absolute", top: "2%",
                    width: i % 5 === 0 ? "2px" : "1px",
                    height: i % 5 === 0 ? "9%" : "5.5%",
                    background: i % 5 === 0 ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)",
                    borderRadius: "1px",
                  }} />
                </div>
              ))}
            </motion.div>

            {/* ── Bague intérieure ── */}
            <div className="absolute inset-[12%] rounded-full" style={{
              background: `radial-gradient(circle at 44% 36%,
                rgba(10,12,18,0.98) 0%,
                rgba(6,7,12,0.99) 55%,
                rgba(2,2,5,1) 100%
              )`,
              boxShadow: "inset 0 6px 20px rgba(0,0,0,0.90), inset 0 0 0 1px rgba(255,255,255,0.03)",
            }} />

            {/* Séparations entre éléments optiques */}
            {[16, 20, 25, 29].map((inset, i) => (
              <div key={i} className="absolute rounded-full pointer-events-none" style={{
                inset: `${inset}%`,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
              }} />
            ))}

            {/* ── Élément verre 1 ── */}
            <div className="absolute inset-[16%] rounded-full overflow-hidden" style={{
              background: `radial-gradient(circle at 46% 40%,
                rgba(8,10,28,1) 0%,
                rgba(5,6,18,1) 50%,
                rgba(2,2,8,1) 80%,
                rgba(1,1,4,1) 100%
              )`,
            }}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(130deg, rgba(70,90,180,0.10) 0%, transparent 45%)" }} />
            </div>

            {/* ── Élément verre 2 ── */}
            <div className="absolute inset-[20%] rounded-full overflow-hidden" style={{
              background: `radial-gradient(circle at 47% 42%,
                rgba(10,12,40,1) 0%,
                rgba(7,8,28,1) 42%,
                rgba(3,3,14,1) 68%,
                rgba(1,1,5,1) 100%
              )`,
            }}>
              <div className="absolute inset-0" style={{ background: "linear-gradient(140deg, rgba(90,100,210,0.09) 0%, transparent 50%)" }} />
            </div>

            {/* ── Élément verre 3 (indigo profond) ── */}
            <div className="absolute inset-[25%] rounded-full overflow-hidden" style={{
              background: `radial-gradient(circle at 48% 43%,
                rgba(34,34,95,1) 0%,
                rgba(20,18,68,1) 38%,
                rgba(9,8,32,1) 62%,
                rgba(3,2,12,1) 100%
              )`,
              boxShadow: "inset 0 0 35px rgba(0,0,0,0.85)",
            }} />

            {/* ── IRIS ── */}
            <div className="absolute inset-[29%] rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-black" />

              {[...Array(9)].map((_, i) => (
                <div key={i} className="absolute inset-0"
                  style={{ transform: `rotate(${(i * 360) / 9}deg)` }}>
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom"
                    animate={{ height: irisOpen ? "37%" : "54%", width: irisOpen ? "47%" : "60%", opacity: 1 }}
                    initial={{ height: "54%", width: "60%", opacity: 0 }}
                    transition={{
                      height:  { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + i * 0.04 },
                      width:   { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + i * 0.04 },
                      opacity: { duration: 0.2, delay: 0.1 },
                    }}
                    style={{
                      clipPath: "polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)",
                      background: "linear-gradient(to bottom, rgba(14,16,24,1), rgba(4,4,8,1))",
                    }}
                  />
                </div>
              ))}

              {/* ── Lueur intérieure bleue/violette ── */}
              <div className="absolute inset-[17%] rounded-full overflow-hidden">
                <div className="absolute inset-0" style={{
                  background: `radial-gradient(circle at 48% 46%,
                    rgba(100,70,255,0.98) 0%,
                    rgba(65,35,210,0.95) 18%,
                    rgba(38,16,155,0.92) 34%,
                    rgba(18,8,80,0.94) 52%,
                    rgba(6,2,28,1) 70%,
                    rgba(0,0,0,1) 100%
                  )`,
                }} />

                {/* Croix verticale */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div style={{
                    width: "9%", height: "64%",
                    background: "linear-gradient(to bottom, transparent, rgba(175,160,255,0.78) 38%, rgba(255,255,255,0.97) 50%, rgba(175,160,255,0.78) 62%, transparent)",
                    filter: "blur(1.2px)", borderRadius: "50%",
                  }} />
                </div>

                {/* Croix horizontale */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div style={{
                    width: "64%", height: "9%",
                    background: "linear-gradient(to right, transparent, rgba(160,148,255,0.68) 38%, rgba(255,255,255,0.90) 50%, rgba(160,148,255,0.68) 62%, transparent)",
                    filter: "blur(1.2px)", borderRadius: "50%",
                  }} />
                </div>

                {/* Point central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div style={{
                    width: "15%", height: "15%", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(215,205,255,0.90) 35%, transparent 75%)",
                    filter: "blur(0.5px)",
                  }} />
                </div>

                {/* Anneaux diffraction */}
                <div className="absolute inset-[5%] rounded-full" style={{
                  boxShadow: `
                    0 0 0 1px rgba(145,120,255,0.22),
                    0 0 0 4px rgba(115,88,225,0.13),
                    0 0 0 9px rgba(88,62,190,0.08),
                    0 0 0 16px rgba(66,42,155,0.05)
                  `,
                }} />
              </div>
            </div>

            {/* Halo ambiant */}
            <motion.div className="absolute pointer-events-none" style={{ inset: "-18%", opacity: flareOp }}>
              <div style={{
                position: "absolute", inset: "22%",
                background: "radial-gradient(circle, rgba(55,35,200,0.20), transparent 65%)",
                filter: "blur(22px)",
              }} />
            </motion.div>

            {/* ── Marquages texte ── */}
            <div className="absolute inset-[4%] rounded-full pointer-events-none">
              <span className="absolute top-[2.5%] left-1/2 text-white/45 tracking-[0.38em] uppercase font-light select-none"
                style={{ fontSize: "clamp(6px, 1.1vw, 10px)", transform: "translateX(-38%)" }}>
                24-70MM
              </span>
              <div style={{
                position: "absolute", top: "3.2%", left: "56%",
                width: "7px", height: "7px", borderRadius: "50%",
                background: "rgb(220,38,38)",
                boxShadow: "0 0 8px rgba(220,38,38,0.85), 0 0 3px rgba(255,70,70,0.95)",
              }} />
              <span className="absolute bottom-[2.5%] left-1/2 -translate-x-1/2 text-white/40 tracking-[0.28em] font-light select-none"
                style={{ fontSize: "clamp(5px, 0.95vw, 9px)" }}>
                f/2.8 L USM
              </span>
              <span className="absolute top-1/2 right-[2.5%] -translate-y-1/2 text-white/22 tracking-[0.15em] font-light select-none"
                style={{ fontSize: "clamp(4px, 0.8vw, 7px)", writingMode: "vertical-rl" }}>
                ZOOM LENS
              </span>
            </div>

          </div>
        </motion.div>

        {/* ── TEXTE ── */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 pointer-events-none"
        >
          <h1 className="font-light tracking-[0.22em] text-white mb-6"
            style={{ fontSize: "clamp(2rem, 6.5vw, 5.2rem)" }}>
            SHOOT BY ROM
          </h1>
          <p className="tracking-[0.42em] text-white/55 mb-8 uppercase"
            style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.95rem)" }}>
            FPV • Drone • Photography
          </p>
          <p className="text-white/40 max-w-md px-6 leading-relaxed"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1rem)" }}>
            Capturing stories from the ground and the sky.
          </p>
        </motion.div>

        {/* ── SCROLL ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
        >
          <span className="text-xs tracking-[0.3em] text-white/40 uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>

      </div>
    </section>
  )
}