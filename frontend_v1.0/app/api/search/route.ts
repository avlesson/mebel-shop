import { type NextRequest, NextResponse } from "next/server"

// Sample products data
const allProducts = [
  {
    id: "1",
    name: "Modern Oak Lounge Chair",
    price: "€3,450",
    image: "/modern-oak-lounge-chair.png",
    badge: "New" as const,
    materials: ["Oak Frame", "Linen Upholstery"],
    swatches: [
      { name: "Natural Oak", color: "#D4A574" },
      { name: "Walnut", color: "#6B4423" },
      { name: "Cream", color: "#F5F1E8" },
    ],
    quickLookImages: [
      "/modern-oak-lounge-chair.png",
      "/modern-oak-lounge-chair-side.png",
      "/modern-oak-lounge-chair-detail.png",
    ],
    dimensions: "W: 85cm × D: 90cm × H: 75cm",
    category: "Seating",
  },
  {
    id: "2",
    name: "Minimalist Wooden Dining Table",
    price: "€2,890",
    image: "/minimalist-wooden-dining-table.png",
    badge: null,
    materials: ["Solid Oak", "Steel Base"],
    swatches: [
      { name: "Natural Oak", color: "#D4A574" },
      { name: "Walnut", color: "#6B4423" },
    ],
    quickLookImages: [
      "/minimalist-wooden-dining-table.png",
      "/minimalist-walnut-dining-table.png",
      "/minimalist-walnut-dining-table-side-view.png",
    ],
    dimensions: "W: 180cm × D: 90cm × H: 75cm",
    category: "Tables",
  },
  {
    id: "3",
    name: "Steel & Glass Console",
    price: "€1,650",
    image: "/minimalist-steel-glass-console-table.jpg",
    badge: "Limited" as const,
    materials: ["Steel Frame", "Tempered Glass"],
    swatches: [
      { name: "Matte Black", color: "#1A1A1A" },
      { name: "Polished Chrome", color: "#D3D3D3" },
    ],
    quickLookImages: ["/minimalist-steel-glass-console-table.jpg", "/console-side-view.jpg", "/console-detail.jpg"],
    dimensions: "W: 120cm × D: 40cm × H: 80cm",
    category: "Tables",
  },
  {
    id: "4",
    name: "Verde Modular Chair",
    price: "€4,890",
    image: "/green-velvet-modular-chair.png",
    badge: "New" as const,
    materials: ["Copper Frame", "Premium Velvet"],
    swatches: [
      { name: "Forest Green", color: "#355E3B" },
      { name: "Sage Green", color: "#9CAF88" },
      { name: "Copper", color: "#B87333" },
    ],
    quickLookImages: [
      "/green-velvet-modular-chair.png",
      "/green-modular-chair-side.jpg",
      "/green-modular-chair-detail.jpg",
    ],
    dimensions: "W: 180cm × D: 90cm × H: 75cm",
    category: "Seating",
  },
  {
    id: "5",
    name: "Walnut Storage Cabinet",
    price: "€3,250",
    image: "/minimalist-walnut-storage-cabinet.jpg",
    badge: null,
    materials: ["Solid Walnut", "Brass Hardware"],
    swatches: [
      { name: "Walnut", color: "#6B4423" },
      { name: "Ebony", color: "#3E2723" },
    ],
    quickLookImages: [
      "/minimalist-walnut-storage-cabinet.jpg",
      "/cabinet-open-view.jpg",
      "/cabinet-hardware-detail.jpg",
    ],
    dimensions: "W: 100cm × D: 45cm × H: 160cm",
    category: "Storage",
  },
  {
    id: "6",
    name: "Pendant Brass Lighting",
    price: "€895",
    image: "/minimalist-brass-pendant-light.jpg",
    badge: "New" as const,
    materials: ["Brass", "Frosted Glass"],
    swatches: [
      { name: "Antique Brass", color: "#C5A572" },
      { name: "Polished Brass", color: "#FFD700" },
    ],
    quickLookImages: [
      "/minimalist-brass-pendant-light.jpg",
      "/pendant-light-detail.jpg",
      "/pendant-light-installed.jpg",
    ],
    dimensions: "Diameter: 30cm × Drop: 35cm",
    category: "Lighting",
  },
  {
    id: "7",
    name: "Terracotta Cloud Chair",
    price: "€5,250",
    image: "/terracotta-cloud-chair.png",
    badge: "New" as const,
    materials: ["Copper Frame", "Terracotta Velvet"],
    swatches: [
      { name: "Terracotta", color: "#E2725B" },
      { name: "Burnt Orange", color: "#CC5500" },
      { name: "Copper", color: "#B87333" },
    ],
    quickLookImages: [
      "/terracotta-cloud-chair.png",
      "/terracotta-cloud-chair-side.jpg",
      "/terracotta-cloud-chair-detail.jpg",
    ],
    dimensions: "W: 95cm × D: 85cm × H: 80cm",
    category: "Seating",
  },
  {
    id: "8",
    name: "Sage Copper Lounge",
    price: "€4,675",
    image: "/sage-copper-lounge-chair.png",
    badge: "Limited" as const,
    materials: ["Copper Frame", "Sage Velvet"],
    swatches: [
      { name: "Sage Green", color: "#9CAF88" },
      { name: "Forest Green", color: "#355E3B" },
      { name: "Copper", color: "#B87333" },
    ],
    quickLookImages: ["/sage-copper-lounge-chair.png", "/sage-lounge-chair-side.jpg", "/sage-lounge-chair-detail.jpg"],
    dimensions: "W: 85cm × D: 90cm × H: 75cm",
    category: "Seating",
  },
  {
    id: "9",
    name: "Marble & Steel Side Table",
    price: "€1,890",
    image: "/placeholder.svg?height=600&width=600",
    badge: null,
    materials: ["White Marble", "Steel Base"],
    swatches: [
      { name: "White Marble", color: "#F8F6F1" },
      { name: "Black Marble", color: "#2A2A2A" },
    ],
    quickLookImages: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    dimensions: "W: 60cm × D: 60cm × H: 45cm",
    category: "Tables",
  },
]

export async function GET(request: NextRequest) {
  try {
    // Get search query from URL params
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")

    // If no query provided, return all products
    if (!query || query.trim() === "") {
      return NextResponse.json({
        success: true,
        data: allProducts,
        count: allProducts.length,
      })
    }

    // Filter products based on search query
    const lowerQuery = query.toLowerCase().trim()

    const filteredProducts = allProducts.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(lowerQuery)
      const matchesCategory = product.category.toLowerCase().includes(lowerQuery)
      const matchesMaterial = product.materials.some((m) => m.toLowerCase().includes(lowerQuery))

      return matchesName || matchesCategory || matchesMaterial
    })

    // Add cache headers for performance
    const response = NextResponse.json({
      success: true,
      data: filteredProducts,
      count: filteredProducts.length,
      query: query,
    })

    // Cache for 5 minutes
    response.headers.set("Cache-Control", "public, max-age=300, stale-while-revalidate=600")

    return response
  } catch (error) {
    console.error("[v0] Search API error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Search failed",
      },
      { status: 500 },
    )
  }
}
