"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="container-custom">
          <LoginForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
