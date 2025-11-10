"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Search, X, Loader2 } from "lucide-react"
import { ProductCard } from "./product-card"
import { QuickLookModal } from "./quick-look-modal"
import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"

const categories = ["All", "Seating", "Tables", "Storage", "Lighting"]

export function ProductsGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [debouncedQuery, setDebouncedQuery] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const params = new URLSearchParams()
        if (debouncedQuery) {
          params.append("q", debouncedQuery)
        }

        const response = await fetch(`/api/search?${params}`)

        if (!response.ok) {
          throw new Error("Failed to fetch products")
        }

        const result = await response.json()

        if (result.success) {
          setProducts(result.data)
        } else {
          setError("Failed to load products")
        }
      } catch (err) {
        console.error("[v0] Search error:", err)
        setError("Failed to load products. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [debouncedQuery])

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products
    }
    return products.filter((product) => product.category === selectedCategory)
  }, [products, selectedCategory])

  const handleQuickLook = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  const clearSearch = useCallback(() => {
    setSearchQuery("")
    setSelectedCategory("All")
  }, [])

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        {/* Search Bar */}
        <Reveal>
          <motion.div className="mb-12 lg:mb-16">
            <div className="relative max-w-2xl mx-auto">
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-neutral-400" size={20} />
                <input
                  type="text"
                  placeholder="Search furniture by name, type, or material..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    "w-full px-12 py-4 bg-neutral-50 border border-neutral-200 rounded-lg",
                    "text-neutral-900 placeholder-neutral-400",
                    "focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent",
                    "transition-all duration-200",
                  )}
                  aria-label="Search products"
                  disabled={isLoading}
                />
                {searchQuery && !isLoading && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 text-neutral-400 hover:text-neutral-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
                {isLoading && (
                  <div className="absolute right-4 text-neutral-400">
                    <Loader2 size={18} className="animate-spin" />
                  </div>
                )}
              </div>

              {/* Search Results Count or Error */}
              {error ? (
                <p className="text-xs text-red-600 mt-2 text-center">{error}</p>
              ) : (
                searchQuery && (
                  <p className="text-xs text-neutral-500 mt-2 text-center">
                    Found {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
                  </p>
                )
              )}
            </div>
          </motion.div>
        </Reveal>

        {/* Category Filter */}
        <Reveal>
          <motion.div className="mb-12 lg:mb-16 flex justify-center">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    selectedCategory === category
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200",
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isLoading}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </Reveal>

        {/* Products Grid */}
        {isLoading && products.length === 0 ? (
          <motion.div
            className="flex justify-center items-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Loader2 size={32} className="animate-spin text-neutral-400" />
          </motion.div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    },
                  },
                }}
              >
                <Reveal delay={index * 0.05}>
                  <ProductCard product={product} onQuickLook={handleQuickLook} />
                </Reveal>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-neutral-600 text-lg mb-4">No products found matching your search.</p>
            <button
              onClick={clearSearch}
              className="px-6 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
