"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RegisterForm } from "@/components/register-form"

export default function RegisterPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-16 lg:py-24 bg-neutral-50">
        <div className="container-custom">
          <RegisterForm />
        </div>
      </section>
      <Footer />
    </main>
  )
}
