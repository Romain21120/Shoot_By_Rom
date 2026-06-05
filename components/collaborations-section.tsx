"use client"

import { motion } from "framer-motion"

const partnerLogos = [
  { name: "Partner 1", placeholder: true },
  { name: "Partner 2", placeholder: true },
  { name: "Partner 3", placeholder: true },
  { name: "Partner 4", placeholder: true },
]

export function CollaborationsSection() {
  return (
    <section className="relative bg-background py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_oklch(0.15_0.02_220_/_0.3)_0%,_transparent_50%)]" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-xs tracking-[0.5em] text-muted-foreground uppercase mb-4">
            Collaborations
          </h2>
          <p className="text-3xl md:text-4xl font-light text-foreground mb-6">
            Collaborations & Partenariats
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ouvert aux collaborations avec des marques partageant une passion pour l'innovation, 
            l'aventure et l'image. Créons ensemble quelque chose d'unique.
          </p>
        </motion.div>

        {/* Partner logos placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {partnerLogos.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[3/2] flex items-center justify-center bg-card/30 border border-dashed border-border/50 rounded-lg transition-all duration-300 hover:bg-card/50 hover:border-border">
                <span className="text-sm text-muted-foreground/50 tracking-wider uppercase">
                  Your Logo
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Interested in working together?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-3 text-sm tracking-wider uppercase bg-foreground text-background rounded-full transition-all duration-300 hover:bg-foreground/90 hover:scale-105"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </section>
  )
}
