"use client"

import { useEffect, useState } from "react"
import { ArrowDown, Sparkles } from "lucide-react"

interface HeroSectionProps {
  isConnected: boolean
}

export function HeroSection({ isConnected }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "-3s" }}
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div
          className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Decentralized Crowdfunding</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="text-balance">
              Fund the Future,
              <br />
              <span className="bg-clip-text text-transparent bg-linear-to-r from-primary via-secondary to-accent animate-gradient">
                Together
              </span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            Join the decentralized revolution. Contribute ETH to support groundbreaking projects with complete
            transparency on the blockchain.
          </p>

          <div
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-500 ${
              isConnected
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-muted border-border text-muted-foreground"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${isConnected ? "bg-primary animate-pulse" : "bg-muted-foreground"}`}
            />
            <span className="font-medium">{isConnected ? "Wallet Connected" : "Connect to Participate"}</span>
          </div>

          <div className="mt-16 animate-bounce">
            <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto" />
          </div>
        </div>
      </div>
    </section>
  )
}
