"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductsHero } from "@/components/products-hero"
import { ProductsGrid } from "@/components/products-grid"

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ProductsHero />
      <ProductsGrid />
      <Footer />
    </main>
  )
}
