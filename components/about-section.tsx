"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function AboutSection() {
  return (
    <section className="relative min-h-screen bg-background py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_oklch(0.15_0.02_220_/_0.4)_0%,_transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Portrait image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Portrait of Rom"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-border/30 rounded-lg -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-border/20 rounded-lg -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-xs tracking-[0.5em] text-muted-foreground uppercase mb-4">
                About
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight">
                Shoot by Rom
              </h3>
            </div>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                French engineering student with a passion that extends far beyond the classroom. 
                Where technical precision meets creative vision, that&apos;s where I thrive.
              </p>
              <p>
                My journey began with FPV drones — the raw thrill of first-person flight combined 
                with the engineering challenge of building and optimizing machines. This evolved 
                into a deeper love for aerial cinematography and photography.
              </p>
              <p>
                Every frame I capture tells a story. Whether it&apos;s racing through tight gaps at 
                high speed or composing a serene landscape from above, I bring the same dedication 
                to quality and detail that defines my engineering mindset.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/30">
              {[
                { value: "3+", label: "Years Flying" },
                { value: "12+", label: "Countries" },
                { value: "∞", label: "Stories to Tell" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-light text-foreground mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
