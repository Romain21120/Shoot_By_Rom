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
        {/* L'image est affichée en plein écran, centrée */}
        <div className="absolute inset-0">
          <img
            src="/camera-bg.png"
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ opacity: 0.92 }}
          />
          {/* Vignette légère sur les bords */}
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

        {/* ── LENS ANIMÉ ──
            L'objectif dans la photo occupe environ :
            - Centré horizontalement (~52% depuis la gauche)
            - Centré verticalement (~47% depuis le haut)
            - Diamètre ~42% de la largeur de l'image

            On utilise position absolute avec left/top en % pour coller
            exactement sur l'objectif quelle que soit la taille d'écran.
        ── */}
        <motion.div
          style={{
            scale,
            opacity,
            // Point de zoom = centre de l'objectif dans la photo
            transformOrigin: "52% 47%",
          } as any}
          className="absolute inset-0"
        >
          {/* Conteneur de l'iris, positionné sur le centre de l'objectif */}
          <div
            className="absolute"
            style={{
              // Centre de l'objectif dans la photo : ~52% left, ~47% top
              left: "52%",
              top: "47%",
              // Diamètre = ~42vw (ajuste si besoin)
              width: "42vw",
              maxWidth: "560px",
              aspectRatio: "1 / 1",
              transform: "translate(-50%, -50%)",
            }}
          >

            {/* Bague de mise au point qui tourne */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ rotate: smoothRot }}
            >
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 flex justify-center"
                  style={{ transform: `rotate(${(i * 360) / 30}deg)` }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "1.5%",
                      width: i % 5 === 0 ? "2px" : "1px",
                      height: i % 5 === 0 ? "7%" : "4%",
                      background: i % 5 === 0
                        ? "rgba(255,255,255,0.22)"
                        : "rgba(255,255,255,0.10)",
                      borderRadius: "1px",
                    }}
                  />
                </div>
              ))}
            </motion.div>

            {/* IRIS — à ~30% d'inset, soit ~40% du diamètre de l'objectif */}
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
                      height: irisOpen ? "37%" : "54%",
                      width:  irisOpen ? "47%" : "60%",
                      opacity: 1,
                    }}
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

              {/* Lueur intérieure bleue/violette */}
              <div className="absolute inset-[17%] rounded-full overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(circle at 48% 46%,
                      rgba(100,70,255,0.98) 0%,
                      rgba(65,35,210,0.95) 18%,
                      rgba(38,16,155,0.92) 34%,
                      rgba(18,8,80,0.94) 52%,
                      rgba(6,2,28,1) 70%,
                      rgba(0,0,0,1) 100%
                    )`,
                  }}
                />

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

                {/* Point central lumineux */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div style={{
                    width: "15%", height: "15%", borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(215,205,255,0.90) 35%, transparent 75%)",
                    filter: "blur(0.5px)",
                  }} />
                </div>

                {/* Anneaux de diffraction */}
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
            <motion.div
              className="absolute pointer-events-none"
              style={{ inset: "-20%", opacity: flareOp }}
            >
              <div style={{
                position: "absolute", inset: "22%",
                background: "radial-gradient(circle, rgba(55,35,200,0.22), transparent 65%)",
                filter: "blur(24px)",
              }} />
            </motion.div>

          </div>
        </motion.div>

        {/* ── TEXTE ── */}
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
            className="tracking-[0.42em] text-white/55 mb-8 uppercase"
            style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.95rem)" }}
          >
            FPV • Drone • Photography
          </p>
          <p
            className="text-white/40 max-w-md px-6 leading-relaxed"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1rem)" }}
          >
            Capturing stories from the ground and the sky.
          </p>
        </motion.div>

        {/* ── SCROLL ── */}
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