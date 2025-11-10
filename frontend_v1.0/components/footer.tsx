"use client"

import { motion } from "framer-motion"
import Link from "next/link"

/**
 * Minimalistic Footer Component
 * Displays essential navigation links: Products, About, Contact, and Sign In
 * Optimized for performance with no external icon libraries
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: "Products", href: "/products" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Sign In", href: "/login" },
  ]

  return (
    <footer className="bg-background border-t border-neutral-200/30">
      <div className="container-custom py-12">
        {/* Links Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8"
        >
          {/* Logo */}
          <h3 className="text-lg font-semibold tracking-tight text-neutral-900">KATACHI</h3>

          {/* Navigation Links */}
          <nav className="flex items-center gap-8">
            {footerLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  href={link.href}
                  className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors duration-200 font-medium"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-neutral-200/30 my-8" />

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500"
        >
          <p>&copy; {currentYear} KATACHI Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-700 transition-colors duration-200">
              Privacy
            </a>
            <a href="#" className="hover:text-neutral-700 transition-colors duration-200">
              Terms
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
