"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const featuredImages = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    alt: "Mountain landscape at sunrise",
    title: "Alpine Dawn"
  },
  {
    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80",
    alt: "Forest aerial view",
    title: "Forest Canopy"
  },
  {
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&q=80",
    alt: "Ocean coastline from drone",
    title: "Coastal Flight"
  },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
    alt: "Lake reflection mountains",
    title: "Mirror Lake"
  },
]

export function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-background py-32"
    >
      {/* Glass layers transition effect */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.15_0.02_220_/_0.3)_0%,_transparent_70%)]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-xs tracking-[0.5em] text-muted-foreground uppercase mb-4">
            Là où naissent les images
          </h2>
          <p className="text-3xl md:text-4xl font-light text-foreground max-w-2xl mx-auto leading-relaxed">
            À travers l'objectif, chaque instant devient une histoire à raconter.
          </p>
        </motion.div>

        {/* Featured images with parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {featuredImages.map((image, index) => (
            <ParallaxImage key={index} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ParallaxImage({ image, index }: { image: typeof featuredImages[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-lg ${
        index === 0 || index === 3 ? "md:mt-16" : ""
      }`}
    >
      <motion.div 
        style={{ y, scale }}
        className="relative aspect-[4/3] overflow-hidden"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-xl font-light text-foreground">{image.title}</h3>
        </div>
      </motion.div>

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-lg border border-border/0 group-hover:border-border/50 transition-colors duration-500" />
    </motion.div>
  )
}
