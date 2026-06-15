"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Instagram, Mail, ExternalLink } from "lucide-react"

const contactLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://instagram.com/shootbyrom",
    handle: "@shootbyrom"
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:contact@shootbyrom.com",
    handle: "contact@shootbyrom.com"
  },
  {
    icon: ExternalLink,
    label: "Portfolio",
    href: "#",
    handle: "shootbyrom.com"
  },
]

export function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const lensScale = useTransform(scrollYProgress, [0.5, 1], [0.3, 1])
  const lensOpacity = useTransform(scrollYProgress, [0.5, 0.8, 1], [0, 0.3, 0.6])

  return (
    <section 
      ref={containerRef}
      id="contact"
      className="relative min-h-screen bg-background py-32 overflow-hidden"
    >
      {/* Closing lens animation */}
      <motion.div
        style={{ scale: lensScale, opacity: lensOpacity }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div className="w-[200vmax] aspect-square rounded-full border-[100px] md:border-[150px] border-background/80" />
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-xs tracking-[0.5em] text-muted-foreground uppercase mb-4">
            Contact
          </h2>
          <p className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
            Créons ensemble quelque chose d'unique
          </p>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Un projet en tête ? Parlons-en. Ensemble, donnons vie à votre vision.
          </p>
        </motion.div>

        {/* Contact links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {contactLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              viewport={{ once: true }}
              className="group flex items-center justify-between p-6 bg-card/30 border border-border/50 rounded-lg transition-all duration-300 hover:bg-card hover:border-border"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors duration-300">
                  <link.icon className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase mb-1">
                    {link.label}
                  </p>
                  <p className="text-lg text-foreground">{link.handle}</p>
                </div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center rounded-full border border-border/50 group-hover:border-foreground group-hover:bg-foreground transition-all duration-300">
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-background transition-colors duration-300" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-32 pt-8 border-t border-border/30 text-center"
        >
          <p className="text-sm text-muted-foreground">
            © 2026 Shoot_by_Rom. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2 tracking-wider">
            Crafted with passion • FPV • Drone • Photography
          </p>
        </motion.div>
      </div>
    </section>
  )
}
