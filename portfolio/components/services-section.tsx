"use client"

import { motion } from "framer-motion"
import { Aperture, Camera, Mountain, Video } from "lucide-react"

const services = [
  {
    icon: Aperture,
    title: "FPV Drone Content",
    description: "High-speed, immersive footage that puts viewers in the pilot seat. Perfect for action sports, events, and creative projects."
  },
  {
    icon: Mountain,
    title: "Aerial Visuals",
    description: "Cinematic drone footage that captures landscapes and locations from breathtaking perspectives."
  },
  {
    icon: Camera,
    title: "Photography",
    description: "From portraits to landscapes, capturing moments with precision and artistic vision."
  },
  {
    icon: Video,
    title: "Content Creation",
    description: "End-to-end video production including editing, color grading, and storytelling."
  },
]

export function ServicesSection() {
  return (
    <section className="relative min-h-screen bg-background py-32">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(oklch(0.2_0_0)_1px,transparent_1px),linear-gradient(90deg,oklch(0.2_0_0)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

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
            Services
          </h2>
          <p className="text-3xl md:text-4xl font-light text-foreground max-w-2xl mx-auto">
            Bringing visions to life through visual storytelling
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative p-8 md:p-10 bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg transition-all duration-500 hover:bg-card hover:border-border">
                {/* Icon */}
                <div className="w-12 h-12 mb-6 flex items-center justify-center rounded-full bg-secondary/50 group-hover:bg-secondary transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-light text-foreground mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
