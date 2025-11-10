"use client"

import { motion } from "framer-motion"
import { Reveal } from "./reveal"

export function ProductsHero() {
  return (
    <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container-custom">
        <Reveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 tracking-tight">
              Our <span className="italic font-light">Collection</span>
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Discover our meticulously curated furniture collection, where minimalist design meets timeless
              craftsmanship. Each piece is architected to create spaces that breathe.
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
