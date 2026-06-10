"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { X, Play, ChevronLeft, ChevronRight } from "lucide-react"

// ─────────────────────────────────────────────
// CONFIGURATION — remplace les données ici
// Pour les photos : type "photo", champ src
// Pour les vidéos : type "video", champ youtubeId (l'ID après watch?v= sur YouTube)
// ─────────────────────────────────────────────
const categories = [
  { id: "all",         label: "All" },
  { id: "fpv",         label: "FPV" },
  { id: "photo",       label: "Photo" },
  { id: "drone",       label: "Drone" },
]

type PortfolioItem = {
  id: number
  type: "photo" | "video"
  category: string
  title: string
  location?: string
  aspect: "portrait" | "landscape" | "square"
  // Photo
  src?: string
  // Vidéo YouTube
  youtubeId?: string
  // Thumbnail personnalisée pour la vidéo (optionnel, sinon auto YouTube)
  thumbnail?: string
}

const portfolioItems: PortfolioItem[] = [
  // ── VIDÉOS FPV ──
  {
    id: 1,
    type: "video",
    category: "fpv",
    title: "Juicy Freestyle",
    location: "Ahetze",
    aspect: "landscape",
    youtubeId: "hVSnrbUxPWo",   // ← remplace par ton ID YouTube
  },
  {
    id: 2,
    type: "video",
    category: "fpv",
    title: "First Race",
    location: "Ensma",
    aspect: "landscape",
    youtubeId: "NtMu0kKp0wQ",   // ← remplace par ton ID YouTube
  },

  // ── PHOTOS ──
  {
    id: 4,
    type: "photo",
    category: "photo",
    title: "Volcán de Fuego",
    location: "Guatemala",
    aspect: "landscape",
    src: "/photo/photo 1.jpg",
  },
  {
    id: 5,
    type: "photo",
    category: "photo",
    title: "City of Love",
    location: "Paris",
    aspect: "street",
    src: "/photo/metro.jpeg",
  },
  {
    id: 6,
    type: "photo",
    category: "photo",
    title: "Cruising",
    location: "Paris",
    aspect: "square",
    src: "/photo/velo.jpeg",
  },
  {
    id: 7,
    type: "photo",
    category: "photo",
    title: "Sunny day",
    location: "Landes",
    aspect: "portrait",
    src: "/photo/wei.jpeg",
  },
  {
    id: 8,
    type: "photo",
    category: "photo",
    title: "Snowy Shoot",
    location: "Toussuire",
    aspect: "portrait",
    src: "/photo/Oriane.jpeg",
  },
  {
    id: 9,
    type: "photo",
    category: "photo",
    title: "Rich Day",
    location: "Biarritz",
    aspect: "portrait",
    src: "/photo/mathieu.jpeg",
  },

  // ── DRONE ──
  {
    id: 9,
    type: "video",
    category: "drone",
    title: "Night Explosion",
    location: "Guatemala",
    aspect: "landscape",
    youtubeId: "Sy64yOlx5Xo",   // ← remplace par ton ID YouTube
  },
  {
    id: 10,
    type: "video",
    category: "drone",
    title: "Above the Clouds",
    location: "Guatemala",
    aspect: "landscape",
    src: "7dydEKOU5aQ",
  },
  {
    id: 11,
    type: "video",
    category: "drone",
    title: "Explosive",
    location: "Guatemala",
    aspect: "landscape",
    src: "7dydEKOU5aQ",
  },
]

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
function getYoutubeThumbnail(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
}

function getThumbnail(item: PortfolioItem): string {
  if (item.type === "photo" && item.src) return item.src
  if (item.type === "video") {
    return item.thumbnail ?? getYoutubeThumbnail(item.youtubeId!)
  }
  return ""
}

// ─────────────────────────────────────────────
// Lightbox
// ─────────────────────────────────────────────
function Lightbox({
  item,
  items,
  onClose,
  onPrev,
  onNext,
}: {
  item: PortfolioItem
  items: PortfolioItem[]
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const idx = items.findIndex(i => i.id === item.id)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.96)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-white/30 uppercase">
        {idx + 1} / {items.length}
      </div>

      {/* Prev */}
      {idx > 0 && (
        <button
          onClick={e => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 md:left-8 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Next */}
      {idx < items.length - 1 && (
        <button
          onClick={e => { e.stopPropagation(); onNext() }}
          className="absolute right-4 md:right-8 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Content */}
      <motion.div
        key={item.id}
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -12 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-5xl mx-8 flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Media */}
        <div className="relative w-full rounded-xl overflow-hidden"
          style={{
            aspectRatio: item.aspect === "portrait" ? "3/4" : item.aspect === "square" ? "1/1" : "16/9",
            maxHeight: "72vh",
            boxShadow: "0 40px 120px rgba(0,0,0,0.8)"
          }}
        >
          {item.type === "video" && item.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          ) : (
            <Image
              src={item.src!}
              alt={item.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          )}
        </div>

        {/* Caption */}
        <div className="flex items-end justify-between mt-5 px-1">
          <div>
            <h3 className="text-lg font-light text-white tracking-wide">{item.title}</h3>
            {item.location && (
              <p className="text-xs tracking-[0.25em] text-white/40 uppercase mt-1">{item.location}</p>
            )}
          </div>
          <span className="text-xs tracking-[0.3em] text-white/25 uppercase">
            {categories.find(c => c.id === item.category)?.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Card
// ─────────────────────────────────────────────
function PortfolioCard({
  item,
  index,
  onClick,
}: {
  item: PortfolioItem
  index: number
  onClick: () => void
}) {
  const thumb = getThumbnail(item)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-4 md:mb-5 break-inside-avoid"
    >
      <div
        onClick={onClick}
        className={`group relative overflow-hidden rounded-xl cursor-pointer ${
          item.aspect === "portrait" ? "aspect-[3/4]" :
          item.aspect === "square"   ? "aspect-square"  : "aspect-[4/3]"
        }`}
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
      >
        {/* Thumbnail */}
        <Image
          src={thumb}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Play badge for videos */}
        {item.type === "video" && (
          <>
            {/* Always-visible subtle badge */}
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-white/15">
              <Play className="w-3 h-3 text-white/70 fill-white/70 ml-0.5" />
            </div>
            {/* Center play on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm bg-black/20">
                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
              </div>
            </div>
          </>
        )}

        {/* Caption on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <p className="text-[10px] tracking-[0.3em] text-white/50 uppercase mb-1">
            {item.location ?? categories.find(c => c.id === item.category)?.label}
          </p>
          <h3 className="text-base font-light text-white">{item.title}</h3>
        </div>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────
export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)

  const filtered = activeCategory === "all"
    ? portfolioItems
    : portfolioItems.filter(i => i.category === activeCategory)

  const selectedIndex = selectedItem ? filtered.findIndex(i => i.id === selectedItem.id) : -1

  const goTo = (idx: number) => {
    if (idx >= 0 && idx < filtered.length) setSelectedItem(filtered[idx])
  }

  return (
    <section className="relative min-h-screen bg-background py-32">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-xs tracking-[0.5em] text-muted-foreground uppercase mb-4">
            Portfolio
          </h2>
          <p className="text-3xl md:text-4xl font-light text-foreground">
            Mes réalisations
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-16"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 text-xs tracking-[0.25em] uppercase transition-all duration-300 rounded-full border ${
                activeCategory === cat.id
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-muted-foreground border-border hover:border-foreground/50 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={i}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <Lightbox
            item={selectedItem}
            items={filtered}
            onClose={() => setSelectedItem(null)}
            onPrev={() => goTo(selectedIndex - 1)}
            onNext={() => goTo(selectedIndex + 1)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
